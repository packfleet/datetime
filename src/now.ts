import { Temporal } from "@js-temporal/polyfill";

/**
 * Returns the current local date and time in the specified time zone as a ZonedDateTime.
 *
 * @param timezone - The time zone to use for the local date and time using a TZ identifier, e.g. "Europe/London".
 * @returns The current local date and time as a `Temporal.ZonedDateTime` object.
 */
export function nowLocal(timezone: string): Temporal.ZonedDateTime {
	return now().toZonedDateTimeISO(timezone);
}

/**
 * Returns the current time as an Instant.
 * @returns The current instant.
 */
export function now(): Temporal.Instant {
	return Temporal.Now.instant();
}

/**
 * Returns the current local date in the specified time zone as a PlainDate.
 *
 * @param timezone - The time zone to use for the local date and time using a TZ identifier, e.g. "Europe/London".
 * @returns The current local date as a `Temporal.PlainDate` object.
 */
export function todayLocal(timezone: string): Temporal.PlainDate {
	return nowLocal(timezone).toPlainDate();
}

/**
 * Returns the current local time in the specified time zone as a PlainTime.
 *
 * @param timezone - The time zone to use for the local date and time using a TZ identifier, e.g. "Europe/London".
 * @returns The current local time as a `Temporal.PlainTime` object.
 */
export const currentTime = (timezone: string) =>
	Temporal.Now.plainTimeISO(timezone);
