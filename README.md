# @packfleet/datetime

A comprehensive datetime library that wraps `@js-temporal/polyfill`, providing a rich set of utilities for date and time manipulation, formatting, and parsing.

## Installation

```bash
npm install @packfleet/datetime
# or
yarn add @packfleet/datetime
# or
pnpm add @packfleet/datetime
# or
bun install @packfleet/datetime
```

## Features

- 🕒 **Temporal API Support**: Built on top of `@js-temporal/polyfill` for modern date/time handling
- 🌍 **Timezone Support**: Full timezone handling with IANA timezone identifiers
- 📝 **Rich Formatting**: Multiple formatting options for dates and times
- 🔄 **Conversion Utilities**: Easy conversion between different date/time types
- 🎯 **Type Safety**: Written in TypeScript with full type definitions

## Usage

### Formatting

```typescript
import { formatFriendlyIso8601DateTimeStr, formatIso8601ToFriendlyDate } from '@packfleet/datetime';

// Format a datetime string in a friendly way
formatFriendlyIso8601DateTimeStr('2024-03-12T23:59:59.123Z', 'Europe/London');
// "Wednesday 12th March 2024 at 23:59"

// Format just the date
formatIso8601ToFriendlyDate('2024-03-12T23:59:59.123Z', 'Europe/London');
// "12 March 2024"
```

### Parsing

```typescript
import { parseInstant, parsePlainDateTime } from '@packfleet/datetime';

// Parse an ISO 8601 string to an Instant
const instant = parseInstant('2024-03-12T23:59:59.123Z');

// Parse to a PlainDateTime
const dateTime = parsePlainDateTime('2024-03-12T23:59:59.123');
```

### Current Time

```typescript
import { nowLocal, todayLocal } from '@packfleet/datetime';

// Get current time in a specific timezone
const now = nowLocal('Europe/London');

// Get today's date in a specific timezone
const today = todayLocal('Europe/London');
```

### Conversion

```typescript
import { toJSDateUTC, toPlainDate } from '@packfleet/datetime';

// Convert Temporal types to JavaScript Date
const jsDate = toJSDateUTC(instant);

// Convert JavaScript Date to Temporal PlainDate
const plainDate = toPlainDate(new Date(), 'Europe/London');
```

## Production Readiness

This library has been in use by Packfleet in production for multiple years. However, please note that the Temporal API spec may still change, as it's a relatively new addition to JavaScript.

## License

MIT
