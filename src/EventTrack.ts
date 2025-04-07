import { type EventData, eventSchema } from './schemas.js'

export interface EventTrackConfig {
    /**
     * Optional API URL override. If not provided, defaults to production URL
     * @example 'http://localhost:3000' for development
     */
    apiUrl?: string
}

export interface LogResponse {
    success: boolean
    message?: string
}

export class EventTrack {
    private readonly apiKey: string
    private readonly apiUrl: string

    private static readonly DEFAULT_API_URL = 'https://eventtrack.dev'

    /**
     * Creates a new instance of EventTrack
     * @param apiKey A 32-character string containing only alphanumeric characters
     * @param config Optional configuration options
     * @throws Error if the API key is invalid
     */
    constructor(apiKey: string, config?: EventTrackConfig) {
        if (!apiKey || apiKey.length !== 32) {
            throw new Error('API key must be exactly 32 characters long')
        }

        if (!/^[A-Za-z0-9]+$/.test(apiKey)) {
            throw new Error('API key can only contain alphanumeric characters')
        }

        this.apiKey = apiKey
        this.apiUrl = config?.apiUrl || EventTrack.DEFAULT_API_URL

        // Validate API URL
        try {
            new URL(this.apiUrl)
        } catch (e) {
            throw new Error('Invalid API URL provided')
        }
    }

    /**
     * Logs an event with the provided data
     * @param data The event data to log
     * @returns Promise that resolves when the logging is complete
     * @throws {Error} If the event data is invalid or the request fails
     */
    async log(data: EventData): Promise<any> {
        // Validate event data
        const validatedData = eventSchema.safeParse(data)

        if (!validatedData.success) {
            return {
                status: 'error',
                message: validatedData.error.message,
            }
        }

        const eventData: EventData & { date?: string } = { ...validatedData.data }
        eventData.date = new Date().toISOString()

        const url = new URL('/openapi/events', this.apiUrl)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify(eventData),
        })

        if (!response.ok) {
            return {
                status: 'error',
                message: response.statusText,
            }
        }

        return await response.json()
    }

    /**
     * Sends a ping event
     * @returns Promise that resolves when the ping is complete
     */
    async ping(): Promise<void> {
        const url = new URL('/openapi/ping', this.apiUrl)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Failed to ping: ${response.statusText}`)
        }
    }
}
