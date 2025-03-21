import { type Temporal, toTemporalInstant } from "@js-temporal/polyfill";
import { TZ_UTC } from "./timezone";

/**
 * Converts a Temporal.ZonedDateTime or Temporal.Instant to a Date.
 * @param dt - The Temporal.ZonedDateTime or Temporal.Instant to convert.
 * @returns The converted Date.
 */
export function toJSDateUTC(
	dt: Temporal.ZonedDateTime | Temporal.Instant,
): Date {
	return new Date(dt.epochMilliseconds);
}

/**
 * Converts a Temporal.ZonedDateTime or Temporal.Instant to a Date if defined.
 * @param dt - The Temporal.ZonedDateTime or Temporal.Instant to convert.
 * @returns The converted Date if the input is defined, otherwise undefined.
 */
export function toOptionalJSDateUTC(
	dt: Temporal.ZonedDateTime | Temporal.Instant | null | undefined,
): Date | undefined {
	if (!dt) return undefined;
	return toJSDateUTC(dt);
}

/**
 * Converts a Date to a Temporal.PlainDate.
 * @param date - The Date to convert.
 * @param timezone - The timezone to use for the conversion.
 * @returns The converted Temporal.PlainDate.
 */
export function toPlainDate(date: Date, timezone: string): Temporal.PlainDate {
	return toInstant(date).toZonedDateTimeISO(timezone).toPlainDate();
}

/**
 * Converts a Date to a Temporal.PlainDate if defined.
 * @param date - The Date to convert.
 * @returns The converted Temporal.PlainDate if the input is defined, otherwise undefined.
 */
export function toOptionalPlainDate(
	date: Date | null | undefined,
	timezone: string,
): Temporal.PlainDate | undefined {
	if (!date) return undefined;
	return toPlainDate(date, timezone);
}

/**
 * Converts a Date to a Temporal.Instant.
 * @param date - The Date to convert.
 * @returns The converted Temporal.Instant.
 */
export function toInstant(date: Date): Temporal.Instant {
	return toTemporalInstant.call(date);
}

/**
 * Converts a Date to a Temporal.Instant if defined.
 * @param date - The Date to convert.
 * @returns The converted Temporal.Instant if the input is defined, otherwise undefined.
 */
export function toOptionalInstant(
	date: Date | null | undefined,
): Temporal.Instant | undefined {
	if (!date) return undefined;
	return toInstant(date);
}

/**
 * Converts a Date to a Temporal.ZonedDateTime in UTC.
 * @param date - The Date to convert.
 * @returns The converted Temporal.ZonedDateTime in UTC.
 */
export function toZonedDateTimeUTC(date: Date): Temporal.ZonedDateTime {
	return toInstant(date).toZonedDateTimeISO(TZ_UTC);
}

/**
 * Converts a Date to a Temporal.ZonedDateTime in UTC if defined.
 * @param date - The Date to convert.
 * @returns The converted Temporal.ZonedDateTime in UTC if the input is defined, otherwise undefined.
 */
export function toOptionalZonedDateTimeUTC(
	date: Date | null | undefined,
): Temporal.ZonedDateTime | undefined {
	if (!date) return undefined;
	return toZonedDateTimeUTC(date);
}

/**
 * Converts a Temporal.PlainDate to a Date.
 * @param date - The Temporal.PlainDate to convert.
 * @param timezone - The timezone to use for the conversion.
 * @returns The converted Date.
 */
export function plainDateToJSDate(
	date: Temporal.PlainDate,
	timezone: string,
): Date {
	return toJSDateUTC(
		date.toZonedDateTime({
			timeZone: timezone,
		}),
	);
}

/**
 * Converts a Temporal.PlainDateTime to a Date.
 * @param date - The Temporal.PlainDateTime to convert.
 * @param timezone - The timezone to use for the conversion.
 * @returns The converted Date.
 */
export function plainDateTimeToJSDate(
	date: Temporal.PlainDateTime,
	timezone: string,
): Date {
	return toJSDateUTC(date.toZonedDateTime("UTC"));
}

/**
 * Converts a Temporal.PlainDate to a Date if defined.
 * @param date - The Temporal.PlainDate to convert.
 * @returns The converted Date if the input is defined, otherwise undefined.
 */
export function plainDateToOptionalJSDate(
	date: Temporal.PlainDate | null | undefined,
	timezone: string,
): Date | undefined {
	if (!date) return undefined;
	return plainDateToJSDate(date, timezone);
}

export function plainDateTimeToOptionalJSDate(
	date: Temporal.PlainDateTime | null | undefined,
	timezone: string,
): Date | undefined {
	if (!date) return undefined;
	return plainDateTimeToJSDate(date, timezone);
}

/**
 * Converts a Temporal.Instant to a Temporal.PlainDate.
 * @param date - The Temporal.Instant to convert.
 * @param timezone - The timezone to use for the conversion.
 * @returns The converted Temporal.PlainDate.
 */
export function instantToPlainDate(date: Temporal.Instant, timezone: string) {
	return date.toZonedDateTimeISO(timezone).toPlainDate();
}

/**
 * Converts a Temporal.Instant to a Temporal.PlainDate if defined.
 * @param date - The Temporal.Instant to convert.
 * @param timezone - The timezone to use for the conversion.
 * @returns The converted Temporal.PlainDate if the input is defined, otherwise undefined.
 */
export function instantToOptionalPlainDate(
	date: Temporal.Instant | null | undefined,
	timezone: string,
) {
	if (!date) return undefined;
	return instantToPlainDate(date, timezone);
}

/**
 * Converts a Temporal.Instant to a Temporal.PlainDateTime.
 * @param date - The Temporal.Instant to convert.
 * @param timezone - The timezone to use for the conversion.
 * @returns The converted Temporal.PlainDateTime.
 */
export function instantToPlainDateTime(
	date: Temporal.Instant,
	timezone: string,
) {
	return date.toZonedDateTimeISO(timezone).toPlainDateTime();
}

/**
 * Converts a Temporal.Instant to a Temporal.PlainDateTime if defined.
 * @param date - The Temporal.Instant to convert.
 * @param timezone - The timezone to use for the conversion.
 * @returns The converted Temporal.PlainDateTime if the input is defined, otherwise undefined.
 */
export function instantToPlainTime(date: Temporal.Instant, timezone: string) {
	return date.toZonedDateTimeISO(timezone).toPlainTime();
}
