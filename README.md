# EventTrack SDK

A proprietary event tracking SDK for logging and monitoring events.

Website: [https://eventtrack.dev](https://eventtrack.dev)

## Installation

```bash
npm install @wru/eventtrack
```

## Usage

```javascript
import { EventTrack } from '@wru/eventtrack'

// Initialize with your API key
const tracker = new EventTrack('your-api-key')

// Log a basic event
await tracker.log({
    title: 'User Login',
    category: 'auth',
})

// Log an event with fields and grouping
await tracker.log({
    title: 'Purchase Completed',
    category: 'transactions',
    fields: {
        orderId: '12345',
        amount: 99.99,
        currency: 'USD',
    },
    groupBy: 'currency', // Group by a field key or 'category'
})

// Log an event with actions
await tracker.log({
    title: 'Document Created',
    category: 'documents',
    actions: [
        { url: 'https://example.com/view', label: 'View Document' },
        { url: 'https://example.com/edit', label: 'Edit Document' },
    ],
})

// Check server connectivity
await tracker.ping()
```

## Event Schema

Events in EventTrack SDK follow a strict schema for consistency and reliability:

### Required Fields

- `title` (string): Event title, minimum 3 characters

### Optional Fields

- `category` (string): Event category, minimum 3 characters
- `notify` (boolean): Whether the event should trigger notifications
- `fields` (object): Custom key-value pairs for additional data
- `groupBy` (string): Group events by a field key or 'category'
- `actions` (array): List of action buttons, each with:
    - `url` (string): Valid URL for the action
    - `label` (string): Display text for the action

### Validation Rules

- Title and category must be at least 3 characters long
- Action URLs must be valid URLs
- `groupBy` must reference either:
    - An existing key in the `fields` object
    - The string 'category' when category is set

## Support

For support inquiries, please contact support@eventtrack.dev

## License

This is proprietary software. See the LICENSE file for details.

Copyright 2025 WRU Design Agentur UG (haftungsbeschränkt)
