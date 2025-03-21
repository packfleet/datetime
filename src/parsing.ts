import { Temporal } from "@js-temporal/polyfill";

/**
 * Parses an ISO 8601 date string as a Temporal.PlainDate.
 *
 * @param iso8601DateStr - The ISO 8601 date string to parse.
 * @returns The parsed Temporal.PlainDate.
 */
export function parsePlainDate(iso8601DateStr: string): Temporal.PlainDate {
	return Temporal.PlainDate.from(iso8601DateStr);
}

/**
 * Parses an optional ISO 8601 date string as a Temporal.PlainDate.
 *
 * @param iso8601DateStr - The ISO 8601 date string to parse.
 * @returns The parsed Temporal.PlainDate or undefined if the string is null or undefined.
 */
export function parseOptionalPlainDate(
	iso8601DateStr: string | null | undefined,
): Temporal.PlainDate | undefined {
	if (!iso8601DateStr) return undefined;
	return parsePlainDate(iso8601DateStr);
}

/**
 * Parses an ISO 8601 date time string as a Temporal.PlainDateTime.
 *
 * @param iso8601DateTimeStr - The ISO 8601 date time string to parse.
 * @returns The parsed Temporal.PlainDateTime.
 */
export function parsePlainDateTime(
	iso8601DateTimeStr: string,
): Temporal.PlainDateTime {
	return Temporal.PlainDateTime.from(iso8601DateTimeStr);
}

/**
 * Parses an optional ISO 8601 date time string as a Temporal.PlainDateTime.
 *
 * @param iso8601DateTimeStr - The ISO 8601 date time string to parse.
 * @returns The parsed Temporal.PlainDateTime or undefined if the string is null or undefined.
 */
export function parseOptionalPlainDateTime(
	iso8601DateTimeStr: string | null | undefined,
): Temporal.PlainDateTime | undefined {
	if (!iso8601DateTimeStr) return undefined;
	return parsePlainDateTime(iso8601DateTimeStr);
}

/**
 * Parses an ISO 8601 date time string as a Temporal.ZonedDateTime.
 *
 * @param iso8601DateTimeStr - The ISO 8601 date time string to parse.
 * @returns The parsed Temporal.ZonedDateTime.
 */
export function parseZonedDateTime(
	iso8601DateTimeStr: string,
): Temporal.ZonedDateTime {
	return Temporal.ZonedDateTime.from(iso8601DateTimeStr);
}

/**
 * Parses an optional ISO 8601 date time string as a Temporal.ZonedDateTime.
 *
 * @param iso8601DateStr - The ISO 8601 date time string to parse.
 * @returns The parsed Temporal.ZonedDateTime or undefined if the string is null or undefined.
 */
export function parseOptionalZonedDateTime(
	iso8601DateStr: string | null | undefined,
): Temporal.ZonedDateTime | undefined {
	if (!iso8601DateStr) return undefined;
	return parseZonedDateTime(iso8601DateStr);
}

/**
 * Parses an ISO 8601 date time string as a Temporal.Instant.
 *
 * @param iso8601DateTimeStr - The ISO 8601 date time string to parse.
 * @returns The parsed Temporal.Instant.
 */
export function parseInstant(iso8601DateTimeStr: string): Temporal.Instant {
	return Temporal.Instant.from(iso8601DateTimeStr);
}

/**
 * Parses an optional ISO 8601 date time string as a Temporal.Instant.
 *
 * @param iso8601DateStr - The ISO 8601 date time string to parse.
 * @returns The parsed Temporal.Instant or undefined if the string is null or undefined.
 */
export function parseOptionalInstant(
	iso8601DateStr: string | null | undefined,
): Temporal.Instant | undefined {
	if (!iso8601DateStr) return undefined;
	return parseInstant(iso8601DateStr);
}

/**
 * Parses an epoch milliseconds as a Temporal.Instant.
 *
 * @param epochMilliseconds - The epoch milliseconds to parse.
 * @returns The parsed Temporal.Instant.
 */
export function parseInstantFromEpochMilliseconds(
	epochMilliseconds: number,
): Temporal.Instant {
	return Temporal.Instant.fromEpochMilliseconds(epochMilliseconds);
}

/**
 * Parses an ISO 8601 time string as a Temporal.PlainTime.
 *
 * @param timeStr - The ISO 8601 time string to parse.
 * @returns The parsed Temporal.PlainTime.
 */
export function parsePlainTime(timeStr: string): Temporal.PlainTime {
	return Temporal.PlainTime.from(timeStr);
}

/**
 * Parses an optional ISO 8601 time string as a Temporal.PlainTime.
 *
 * @param timeStr - The ISO 8601 time string to parse.
 * @returns The parsed Temporal.PlainTime or undefined if the string is null-ish.
 */
export function parseOptionalPlainTime(
	timeStr: string | null | undefined,
): Temporal.PlainTime | undefined {
	if (!timeStr) return undefined;
	return parsePlainTime(timeStr);
}
