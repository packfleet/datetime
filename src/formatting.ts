import type { Temporal } from "@js-temporal/polyfill";
import ordinal from "ordinal";
import {
	instantToPlainDate,
	plainDateToJSDate,
	toJSDateUTC,
	toPlainDate,
} from "./conversion";
import { now, nowLocal, todayLocal } from "./now";
import { parseInstant } from "./parsing";
import { TZ_UTC } from "./timezone";

/**
 * Formats a plain date time as a string in the format "YYYY-MM-DDTHH:MM",
 * e.g. "2021-12-31T23:59".
 *
 * @param date - The plain date time to format.
 * @returns The formatted date time as a string.
 */
export function formatPlainDateTime(date: Temporal.PlainDateTime): string {
	return date.toString({
		smallestUnit: "minute",
	});
}

/**
 * Formats a plain date as a string in the format "YYYY-MM-DD",
 * e.g. "2021-12-31".
 *
 * @param date - The plain date to format.
 * @returns The formatted date as a string.
 */
export function formatPlainDate(date: Temporal.PlainDate): string {
	return date.toString();
}

const monthLongFormatter =
	typeof Intl === "object" && typeof Intl.DateTimeFormat === "function"
		? new Intl.DateTimeFormat(undefined, {
				month: "long",
			})
		: null;

/**
 * Gets the long month from a plain date.
 *
 * @param date - The plain date to get the long month from.
 * @returns The long month as a string.
 */
export function formatPlainDateMonth(date: Temporal.PlainDate): string {
	if (!monthLongFormatter) {
		throw new Error("Intl.DateTimeFormat is not supported in this environment");
	}
	return monthLongFormatter.format(plainDateToJSDate(date, TZ_UTC));
}

const monthShortFormatter =
	typeof Intl === "object" && typeof Intl.DateTimeFormat === "function"
		? new Intl.DateTimeFormat(undefined, {
				month: "short",
			})
		: null;
/**
 * Gets the short month from a plain date.
 *
 * @param date - The plain date to get the short month from.
 * @returns The short month as a string.
 */
export function formatPlainDateShortMonth(date: Temporal.PlainDate): string {
	if (!monthShortFormatter) {
		throw new Error("Intl.DateTimeFormat is not supported in this environment");
	}
	return monthShortFormatter.format(plainDateToJSDate(date, TZ_UTC));
}

/**
 * Formats a JS Date as a string in the format "YYYY-MM-DD".
 *
 * @param date - The JS Date to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted date as a string.
 */
export function formatJSDate(date: Date, timezone: string): string {
	return toPlainDate(date, timezone).toString();
}

/**
 * Formats a plain time value as a string in the format "HH:MM",
 * e.g. "23:59".
 *
 * @param date - The plain time value to format.
 * @returns The formatted time string.
 */
export function formatPlainTime(date: Temporal.PlainTime): string {
	return date.toString({
		smallestUnit: "minute",
	});
}

/**
 * Formats an instant as a string in the format "YYYY-MM-DDTHH:MM:SS.MSZ",
 * e.g. "2021-12-31T23:59:59.123Z".
 *
 * @param instant - The instant to format.
 * @returns The formatted instant as a string.
 */
export function formatInstant(instant: Temporal.Instant): string {
	return instant.toString();
}

/**
 * Formats a plain date time as a string
 *
 * @param date - The plain date time to format.
 * @returns The formatted plain date time as a string.
 */
export function formatOptionalPlainDateTime(
	date: Temporal.PlainDateTime | null | undefined,
): string | undefined {
	if (!date) return undefined;
	return formatPlainDateTime(date);
}

/**
 * Formats a plain date as a string
 *
 * @param date - The plain date to format.
 * @returns The formatted plain date as a string.
 */
export function formatOptionalPlainDate(
	date: Temporal.PlainDate | null | undefined,
): string | undefined {
	if (!date) return undefined;
	return formatPlainDate(date);
}

/**
 * Formats a JS Date as a string in the format "YYYY-MM-DD".
 *
 * @param date - The JS Date to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted date as a string.
 */
export function formatOptionalJSDate(
	date: Date | null | undefined,
	timezone: string,
): string | undefined {
	if (!date) return undefined;
	return formatJSDate(date, timezone);
}

/**
 * Formats a plain time as a string in the format "HH:MM".
 *
 * @param time - The plain time to format.
 * @returns The formatted plain time as a string.
 */
export function formatOptionalPlainTime(
	time: Temporal.PlainTime | null | undefined,
): string | undefined {
	if (!time) return undefined;
	return formatPlainTime(time);
}

/**
 * Formats a timezone as a friendly name.
 *
 * @param timezone - The timezone to format.
 * @returns The friendly name of the timezone.
 */
export function formatFriendlyTimezone(timezone: string): string {
	// This is kind of a hack, but it's the only no-dependency way to
	// get the friendly name of a timezone.
	// Example: "America/New_York" -> "Eastern Standard Time"
	// Example: "Europe/London" -> "British Summer Time"
	return nowLocal(timezone)
		.toLocaleString("default", {
			day: "2-digit",
			timeZoneName: "long",
		})
		.substring(4);
}

/**
 * Formats a relative ISO 8601 date time string.
 *
 * @param datetime - The relative ISO 8601 date time string to format.
 * @returns The formatted relative ISO 8601 date time string.
 *
 * @example
 * ```ts
 * formatRelativeIso8601DateTimeStr('2024-03-12T23:59:59.123Z');
 * // "1 year ago"
 * ```
 */
export function formatRelativeIso8601DateTimeStr(datetime: string): string {
	const instant = parseInstant(datetime);
	return formatRelativeInstant(instant);
}

/**
 * Formats an optional relative ISO 8601 date time string.
 *
 * @param datetime - The relative ISO 8601 date time string to format.
 * @returns The formatted relative ISO 8601 date time string.
 */
export function formatOptionalRelativeIso8601DateTimeStr(
	datetime: string | null | undefined,
): string | undefined {
	if (!datetime) return undefined;
	return formatRelativeIso8601DateTimeStr(datetime);
}

// Hermes doesn't support Intl.RelativeTimeFormat yet, so we need to
// check if it's supported before using it.
const rtf =
	typeof Intl === "object" && typeof Intl.RelativeTimeFormat === "function"
		? new Intl.RelativeTimeFormat(undefined, { numeric: "always" })
		: null;
const rtfNumeric =
	typeof Intl === "object" && typeof Intl.RelativeTimeFormat === "function"
		? new Intl.RelativeTimeFormat(undefined, {
				numeric: "auto",
			})
		: null;

/**
 * Formats an instant as a relative ISO 8601 date time string.
 *
 * @param instant - The instant to format.
 * @returns The formatted relative ISO 8601 date time string.
 *
 * @example
 * ```ts
 * formatRelativeInstant(parseInstant('2024-03-12T23:59:59.123Z'));
 * // "1 year ago"
 * ```
 */
export function formatRelativeInstant(instant: Temporal.Instant): string {
	if (!rtf || !rtfNumeric) {
		throw new Error(
			"Intl.RelativeTimeFormat is not supported in this environment",
		);
	}

	const duration = instant.since(now());

	const units = [
		"years",
		"months",
		"weeks",
		"days",
		"hours",
		"minutes",
		"seconds",
	] as const;
	for (const unit of units) {
		const num = duration.total({ unit, relativeTo: nowLocal("UTC") });
		// Round towards zero to the nearest integer
		// Different to Math.floor, which rounds towards negative infinity
		// e.g. Math.floor(-0.3) == -1 but Math.trunc(-0.3) == 0
		const d = Math.trunc(num);
		if (d !== 0) {
			return rtf.format(d, unit);
		}
	}
	return rtfNumeric.format(0, "seconds");
}

/**
 * Formats an ISO 8601 date time string as a friendly date time string.
 *
 * @param datetime - The ISO 8601 date time string to format.
 * @returns The formatted friendly date time string.
 */
export function formatFriendlyIso8601DateTimeStr(
	datetime: string,
	timezone: string,
): string {
	const instant = parseInstant(datetime);
	return formatFriendlyInstant(instant, timezone);
}

/**
 * Formats an instant as a friendly date time string.
 *
 * @param instant - The instant to format.
 * @returns The formatted friendly date time string.
 *
 * @example
 * ```ts
 * formatFriendlyInstant(parseInstant('2024-03-12T23:59:59.123Z'));
 * // "Wednesday 12th March 2025 at 19:11"
 * ```
 */
export function formatFriendlyInstant(
	instant: Temporal.Instant,
	timezone: string,
): string {
	const formatter = new Intl.DateTimeFormat(undefined, {
		hour: "numeric",
		minute: "numeric",
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: timezone,
	});

	return ordinalFormatForDay(formatter.formatToParts(toJSDateUTC(instant)));
}

/**
 * Formats an ISO 8601 date time string as a time string.
 *
 * @param time - The ISO 8601 date time string to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted time string.
 *
 * @example
 * ```ts
 * formatIso8601ToTime('2024-06-12T14:22:59.123Z', 'Europe/London');
 * // "15:22"
 * ```
 */
export function formatIso8601ToTime(time: string, timezone: string) {
	return formatInstantTime(parseInstant(time), timezone);
}

/**
 * Formats an ISO 8601 date time string as a friendly date string.
 *
 * @param time - The ISO 8601 date time string to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted friendly date string.
 *
 * @example
 * ```ts
 * formatIso8601ToFriendlyDate('2024-06-12T14:22:59.123Z', 'Europe/London');
 * // "12 June 2024"
 */
export function formatIso8601ToFriendlyDate(time: string, timezone: string) {
	return formatFriendlyPlainDate(
		instantToPlainDate(parseInstant(time), timezone),
		timezone,
	);
}

/**
 * Formats an ISO 8601 date time string as a short friendly date string.
 *
 * @param time - The ISO 8601 date time string to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted friendly date string.
 *
 * @example
 * ```ts
 * formatIso8601ToFriendlyDateShort('2024-06-12T14:22:59.123Z', 'Europe/London');
 * // "12 Jun 2024"
 * ```
 */
export function formatIso8601ToFriendlyDateShort(
	time: string,
	timezone: string,
) {
	return formatFriendlyPlainDateShort(
		instantToPlainDate(parseInstant(time), timezone),
	);
}

/**
 * Formats ISO 8601 date time string as a time string if it's defined.
 *
 * @param time - The ISO 8601 date time string to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted time string.
 */
export function formatOptionalIso8601ToTime(
	time: string | null | undefined,
	timezone: string,
) {
	if (!time) {
		return null;
	}

	return formatInstantTime(parseInstant(time), timezone);
}

/**
 * Formats ISO 8601 date time string as a time string with seconds if it's defined.
 *
 * @param time - The ISO 8601 date time string to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted time string.
 */
export function formatOptionalIso8601ToTimeWithSeconds(
	time: string | null | undefined,
	timezone: string,
) {
	if (!time) {
		return null;
	}

	return formatInstantTimeWithSeconds(parseInstant(time), timezone);
}

/**
 * Formats a plain date as a friendly date string.
 *
 * @param date - The plain date to format.
 * @returns The formatted friendly date string.
 *
 * @example
 * ```ts
 * formatFriendlyPlainDate(new Temporal.PlainDate(2024, 6, 12));
 * // "Wednesday 12th June 2024"
 */
export function formatFriendlyPlainDate(
	date: Temporal.PlainDate,
	timezone: string,
) {
	const formatter = new Intl.DateTimeFormat(undefined, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: timezone,
	});

	return ordinalFormatForDay(
		formatter.formatToParts(plainDateToJSDate(date, timezone)),
	);
}

/**
 * Formats a plain date as a friendly date string.
 *
 * @param date - The plain date to format.
 * @returns The formatted friendly date string.
 */
export function formatFriendlyPlainDateShort(
	date: Temporal.PlainDate,
	options: {
		includeYear?: boolean;
		excludeWeekday?: boolean;
		shortMonth?: boolean;
	} = {},
) {
	const formatter = new Intl.DateTimeFormat(undefined, {
		weekday: options.excludeWeekday ? undefined : "short",
		month: options.shortMonth ? "short" : "long",
		day: "numeric",
		year: options.includeYear ? "numeric" : undefined,
	});

	return ordinalFormatForDay(
		formatter.formatToParts(plainDateToJSDate(date, TZ_UTC)),
	);
}

/**
 * Formats a plain date range as a friendly date range string.
 * Omits extra details when they are the same for both dates
 *
 * @param date1 - The first date in the range.
 * @param date2 - The second date in the range.
 * @param options - The options for the formatting.
 * @returns The formatted friendly date range string.
 *
 * @example
 * ```ts
 * formatPlainDateRange(new Temporal.PlainDate(2024, 6, 12), new Temporal.PlainDate(2024, 6, 15));
 * // "12th - 15th June 2024"
 * formatPlainDateRange(new Temporal.PlainDate(2024, 6, 12), new Temporal.PlainDate(2024, 7, 15), {locale: "en-GB"});
 * // "12th June - 15th July 2024"
 */
export function formatPlainDateRange(
	date1: Temporal.PlainDate,
	date2: Temporal.PlainDate,
	options: {
		includeYear?: boolean;
		includeDay?: "short" | "long" | false;
		monthFormat?: "short" | "long";
		locale?: string;
	} = {},
) {
	const monthFormat = options.monthFormat ?? "long";
	const formatter1 = new Intl.DateTimeFormat(options.locale, {
		month: date1.month === date2.month ? undefined : monthFormat,
		day: "numeric",
		year:
			date1.year === date2.year
				? undefined
				: options.includeYear
					? "numeric"
					: undefined,
	});
	const start = ordinalFormatForDay(
		formatter1.formatToParts(plainDateToJSDate(date1, TZ_UTC)),
	);
	const formatter2 = new Intl.DateTimeFormat(options.locale, {
		month: monthFormat,
		day: "numeric",
		year: options.includeYear ? "numeric" : undefined,
	});
	const end = ordinalFormatForDay(
		formatter2.formatToParts(plainDateToJSDate(date2, TZ_UTC)),
	);

	return `${start} - ${end}`;
}

/**
 * Formats a date as a friendly date time string.
 *
 * @param date - The date to format.
 * @returns The formatted friendly date time string.
 */
export function formatFriendlyDateTime(date: Temporal.ZonedDateTime) {
	const formatter = new Intl.DateTimeFormat(undefined, {
		hour: "numeric",
		minute: "numeric",
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return ordinalFormatForDay(formatter.formatToParts(toJSDateUTC(date)));
}

/**
 * Formats an instant as a friendly date time string.
 *
 * @param time - The instant to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted friendly date time string.
 */
export function formatInstantFriendlyDate(
	time: Temporal.Instant,
	timezone: string,
) {
	return formatFriendlyDateTime(time.toZonedDateTimeISO(timezone));
}

/**
 * Formats an instant as a time string.
 *
 * @param time - The instant to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted time string.
 *
 * @example
 * ```ts
 * formatInstantTime(parseInstant('2024-06-12T14:22:59.123Z'), 'Europe/London');
 * // "15:22"
 * ```
 */
export function formatInstantTime(time: Temporal.Instant, timezone: string) {
	return time
		.toZonedDateTimeISO(timezone)
		.toLocaleString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Formats an instant as a time string.
 *
 * @param startTime - The start time to format.
 * @param endTime - The end time to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted time string.
 *
 * @example
 * ```ts
 * formatInstantTimeRange(parseInstant('2024-06-12T14:22:59.123Z'), parseInstant('2024-06-12T15:22:59.123Z'), 'Europe/London');
 * // "15:22 - 16:22"
 * ```
 */
export function formatInstantTimeRange(
	startTime: Temporal.Instant,
	endTime: Temporal.Instant,
	timezone: string,
) {
	return `${formatInstantTime(startTime, timezone)} - ${formatInstantTime(endTime, timezone)}`;
}

/**
 * Formats an instant as a time string with seconds.
 *
 * @param time - The instant to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted time string.
 *
 * @example
 * ```ts
 * formatInstantTimeWithSeconds(parseInstant('2024-06-12T14:22:59.123Z'), 'Europe/London');
 * // "15:22:59"
 * ```
 */
export function formatInstantTimeWithSeconds(
	time: Temporal.Instant,
	timezone: string,
) {
	return time.toZonedDateTimeISO(timezone).toLocaleString([], {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}

/**
 * Formats an instant as a time string with seconds if it's defined.
 *
 * @param time - The instant to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted time string.
 */
export function formatOptionalInstantTimeWithSeconds(
	time: Temporal.Instant | null | undefined,
	timezone: string,
) {
	if (!time) {
		return undefined;
	}

	return formatInstantTimeWithSeconds(time, timezone);
}

/**
 * Formats an instant as a time string in 24 hour format.
 *
 * @param time - The instant to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted time string.
 */
export function formatInstantTime24h(time: Temporal.Instant, timezone: string) {
	return time.toZonedDateTimeISO(timezone).toLocaleString([], {
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
	});
}

export function formatOptionalInstantTime24h(
	time: Temporal.Instant | null | undefined,
	timezone: string,
) {
	if (!time) {
		return undefined;
	}

	return formatInstantTime24h(time, timezone);
}

/**
 * Formats a date as a time string in 24 hour format.
 *
 * @param date - The date to format.
 * @returns The formatted time string.
 */
export function formatZonedDateTimeTime(date: Temporal.ZonedDateTime) {
	return date.toLocaleString([], {
		hour: "numeric",
		minute: "numeric",
	});
}

function ordinalFormatForDay(parts: Intl.DateTimeFormatPart[]) {
	return parts
		.map((part) => {
			// Find the numeric day part and replace it with the ordinal version
			if (part.type === "day") {
				return ordinal(Number.parseInt(part.value));
			}
			return part.value;
		})
		.join("");
}

/**
 * Formats a zoned date time as a string if defined.
 *
 * @param date - The zoned date time to format.
 * @returns The formatted zoned date time as a string.
 */
export function formatOptionalZonedDateTime(
	date: Temporal.ZonedDateTime | null | undefined,
): string | undefined {
	if (!date) {
		return undefined;
	}

	return formatZonedDateTimeTime(date);
}

/**
 * Formats an instant as a time string if defined.
 *
 * @param instant - The instant to format.
 * @param timezone - The timezone to use for the formatting.
 * @returns The formatted time string.
 */
export function formatOptionalInstant(
	instant: Temporal.Instant | null | undefined,
	timezone: string,
): string | undefined {
	if (!instant) {
		return undefined;
	}

	return formatInstantTime(instant, timezone);
}

/**
 * Formats a zoned date time as a time string if defined.
 *
 * @param date - The zoned date time to format.
 * @returns The formatted time string.
 */
export function formatOptionalZonedDateTimeTime(
	date: Temporal.ZonedDateTime | null | undefined,
): string | undefined {
	if (!date) {
		return undefined;
	}

	return formatZonedDateTimeTime(date);
}
