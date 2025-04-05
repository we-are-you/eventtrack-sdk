import { eventSchema } from './schemas';
export class EventTrack {
    /**
     * Creates a new instance of EventTrack
     * @param apiKey A 32-character string containing only alphanumeric characters
     * @param config Optional configuration options
     * @throws Error if the API key is invalid
     */
    constructor(apiKey, config) {
        if (!apiKey || apiKey.length !== 32) {
            throw new Error('API key must be exactly 32 characters long');
        }
        if (!/^[A-Za-z0-9]+$/.test(apiKey)) {
            throw new Error('API key can only contain alphanumeric characters');
        }
        this.apiKey = apiKey;
        this.apiUrl = config?.apiUrl || EventTrack.DEFAULT_API_URL;
        // Validate API URL
        try {
            new URL(this.apiUrl);
        }
        catch (e) {
            throw new Error('Invalid API URL provided');
        }
    }
    /**
     * Logs an event with the provided data
     * @param data The event data to log
     * @returns Promise that resolves when the logging is complete
     * @throws {Error} If the event data is invalid or the request fails
     */
    async log(data) {
        // Validate event data
        const validatedData = eventSchema.parse(data);
        const url = new URL('/events', this.apiUrl);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify(validatedData),
        });
        if (!response.ok) {
            throw new Error(`Failed to log event: ${response.statusText}`);
        }
    }
    /**
     * Sends a ping event
     * @returns Promise that resolves when the ping is complete
     */
    async ping() {
        const url = new URL('/ping', this.apiUrl);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to ping: ${response.statusText}`);
        }
    }
}
EventTrack.DEFAULT_API_URL = 'https://eventtrack.dev/openapi';
