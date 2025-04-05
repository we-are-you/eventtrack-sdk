# EventTrack SDK

A proprietary event tracking SDK that supports both ESM and CommonJS.

## License

This is proprietary software. Usage is only permitted with a valid API key obtained through authorized We Are You SaaS projects. See the [LICENSE](LICENSE) file for details.

## Installation

```bash
npm install eventtrack-sdk
```

## Usage

The SDK requires a valid API key that can be obtained through our services. The API key must be exactly 32 characters and can only contain alphanumeric characters (A-Z, a-z, 0-9).

### Basic Usage

#### ESM
```javascript
import { EventTrack } from 'eventtrack-sdk';

const tracker = new EventTrack('YOUR32CHARACTERAPIKEYGOESHERE12345');

// Log an event
await tracker.log({
  title: 'Page View',
  category: 'analytics',
  fields: {
    page: '/home',
    referrer: document.referrer
  },
  actions: [
    { url: 'https://example.com/action', label: 'Take Action' }
  ]
});

// Send a ping
await tracker.ping();
```

#### CommonJS
```javascript
const { EventTrack } = require('eventtrack-sdk');

const tracker = new EventTrack('YOUR32CHARACTERAPIKEYGOESHERE12345');

// Log an event
tracker.log({
  title: 'Button Click',
  category: 'interaction',
  notify: true
}).then(() => console.log('Event logged'));

// Send a ping
tracker.ping()
  .then(() => console.log('Ping sent'));
```

### Development Configuration

For development purposes, you can override the API URL:

```javascript
const tracker = new EventTrack('YOUR32CHARACTERAPIKEYGOESHERE12345', {
  apiUrl: 'http://localhost:3000'
});
```

## Event Schema

The `log` method accepts an event object with the following schema:

```typescript
{
  title: string;           // Required - The title of the event (min 3 chars)
  category?: string;       // Optional - Category for grouping events (min 3 chars)
  date?: Date;            // Optional - Event date (defaults to current time)
  notify?: boolean;       // Optional - Whether to trigger notifications
  fields?: {              // Optional - Additional custom fields
    [key: string]: any;
  };
  groupBy?: string;       // Optional - Field to group events by
  actions?: {             // Optional - Array of action buttons
    url: string;          // Valid URL for the action
    label: string;        // Display label for the action
  }[];
}
```

All fields are validated using Zod schema validation. Invalid data will throw an error.

## API Methods

### log(data)
Sends event data to the tracking API.
- `data`: An object matching the event schema above
- Returns: Promise that resolves when logging is complete
- Throws: Error if the event data is invalid or the request fails

### ping()
Sends a ping request to verify connectivity.
- Returns: Promise that resolves when ping is complete
- Throws: Error if the request fails

## Support

For support or licensing inquiries, please contact:
Christian Linke (info@we-are-you.de)
