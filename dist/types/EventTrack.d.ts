import { type EventData } from './schemas.js';
export interface EventTrackConfig {
    /**
     * Optional API URL override. If not provided, defaults to production URL
     * @example 'http://localhost:3000' for development
     */
    apiUrl?: string;
}
export interface LogResponse {
    success: boolean;
    message?: string;
}
export declare class EventTrack {
    private readonly apiKey;
    private readonly apiUrl;
    private static readonly DEFAULT_API_URL;
    /**
     * Creates a new instance of EventTrack
     * @param apiKey A 32-character string containing only alphanumeric characters
     * @param config Optional configuration options
     * @throws Error if the API key is invalid
     */
    constructor(apiKey: string, config?: EventTrackConfig);
    /**
     * Logs an event with the provided data
     * @param data The event data to log
     * @returns Promise that resolves when the logging is complete
     * @throws {Error} If the event data is invalid or the request fails
     */
    log(data: EventData): Promise<any>;
}
//# sourceMappingURL=EventTrack.d.ts.map