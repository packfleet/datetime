import { Temporal } from "@js-temporal/polyfill";
import { todayLocal } from "./now";

/**
 * Checks if a date is today in a given time zone.
 * @param date - The date to check.
 * @param timezone - The time zone to check the date in.
 * @returns True if the date is today, false otherwise.
 */
export function isToday(date: Temporal.PlainDate, timezone: string): boolean {
	return Temporal.PlainDate.compare(date, todayLocal(timezone)) === 0;
}

/**
 * Checks if a date is tomorrow in a given time zone.
 * @param date - The date to check.
 * @param timezone - The time zone to check the date in.
 * @returns True if the date is tomorrow, false otherwise.
 */
export function isTomorrow(
	date: Temporal.PlainDate,
	timezone: string,
): boolean {
	return isToday(date.subtract({ days: 1 }), timezone);
}

/**
 * Checks if a date is yesterday in a given time zone.
 * @param date - The date to check.
 * @param timezone - The time zone to check the date in.
 * @returns True if the date is yesterday, false otherwise.
 */
export function isYesterday(
	date: Temporal.PlainDate,
	timezone: string,
): boolean {
	return isToday(date.add({ days: 1 }), timezone);
}

/**
 * Checks if two dates are equal.
 * @param date - The date to check.
 * @param comparedWith - The date to compare to.
 * @returns True if the dates are equal, false otherwise.
 */
export function isDateEqual(
	date: Temporal.PlainDate,
	comparedWith: Temporal.PlainDate,
) {
	return date.equals(comparedWith);
}

/**
 * Checks if two dates are equal.
 * @param date - The date to check.
 * @param comparedWith - The date to compare to.
 * @returns True if the dates are equal, false otherwise.
 */
export function isOptionalDateEqual(
	date: Temporal.PlainDate | null | undefined,
	comparedWith: Temporal.PlainDate | null | undefined,
) {
	if (date == null && comparedWith == null) {
		return true;
	}
	if (date == null) {
		return false;
	}
	if (comparedWith == null) {
		return false;
	}
	return isDateEqual(date, comparedWith);
}

/**
 * Checks if a date is after another date.
 * @param date - The date to check.
 * @param comparedWith - The date to compare to.
 * @returns True if the date is after the other date, false otherwise.
 */
export function isDateAfter(
	date: Temporal.PlainDate,
	comparedWith: Temporal.PlainDate,
) {
	return Temporal.PlainDate.compare(date, comparedWith) === 1;
}

/**
 * Checks if a date is before another date.
 * @param date - The date to check.
 * @param comparedWith - The date to compare to.
 * @returns True if the date is before the other date, false otherwise.
 */
export function isDateBefore(
	date: Temporal.PlainDate,
	comparedWith: Temporal.PlainDate,
) {
	return Temporal.PlainDate.compare(date, comparedWith) === -1;
}

/**
 * Checks if a time is after another time.
 * @param time - The time to check.
 * @param comparedWith - The time to compare to.
 * @returns True if the time is after the other time, false otherwise.
 */
export function isTimeAfter(
	time: Temporal.PlainTime,
	comparedWith: Temporal.PlainTime,
) {
	return Temporal.PlainTime.compare(time, comparedWith) === 1;
}

/**
 * Checks if a time is equal to another time.
 * @param time - The time to check.
 * @param comparedWith - The time to compare to.
 * @returns True if the time is equal to the other time, false otherwise.
 */
export function isTimeEqual(
	time: Temporal.PlainTime,
	comparedWith: Temporal.PlainTime,
) {
	return time.equals(comparedWith);
}

/**
 * Checks if a time is before another time.
 * @param time - The time to check.
 * @param comparedWith - The time to compare to.
 * @returns True if the time is before the other time, false otherwise.
 */
export function isTimeBefore(
	time: Temporal.PlainTime,
	comparedWith: Temporal.PlainTime,
) {
	return Temporal.PlainTime.compare(time, comparedWith) === -1;
}

/**
 * Checks if an instant is after another instant.
 * @param instant - The instant to check.
 * @param comparedWith - The instant to compare to.
 * @returns True if the instant is after the other instant, false otherwise.
 */
export function isInstantAfter(
	instant: Temporal.Instant,
	comparedWith: Temporal.Instant,
) {
	return Temporal.Instant.compare(instant, comparedWith) === 1;
}

/**
 * Checks if an instant is equal to another instant.
 * @param instant - The instant to check.
 * @param comparedWith - The instant to compare to.
 * @returns True if the instant is equal to the other instant, false otherwise.
 */
export function isInstantEqual(
	instant: Temporal.Instant,
	comparedWith: Temporal.Instant,
) {
	return instant.equals(comparedWith);
}

/**
 * Checks if an instant is equal to another instant.
 * @param instant - The instant to check.
 * @param comparedWith - The instant to compare to.
 * @returns True if the instant is equal to the other instant, false otherwise.
 */
export function isOptionalInstantEqual(
	instant: Temporal.Instant | null | undefined,
	comparedWith: Temporal.Instant | null | undefined,
) {
	if (instant == null && comparedWith == null) {
		return true;
	}
	if (instant == null) {
		return false;
	}
	if (comparedWith == null) {
		return false;
	}
	return instant.equals(comparedWith);
}

/**
 * Checks if an instant is before another instant.
 * @param instant - The instant to check.
 * @param comparedWith - The instant to compare to.
 * @returns True if the instant is before the other instant, false otherwise.
 */
export function isInstantBefore(
	instant: Temporal.Instant,
	comparedWith: Temporal.Instant,
) {
	return Temporal.Instant.compare(instant, comparedWith) === -1;
}

/**
 * Checks if a duration is greater than another duration.
 * @param duration - The duration to check.
 * @param comparedWith - The duration to compare to.
 * @returns True if the duration is greater than the other duration, false otherwise.
 */
export function isDurationGreater(
	duration: Temporal.Duration,
	comparedWith: Temporal.Duration,
) {
	return Temporal.Duration.compare(duration, comparedWith) === 1;
}

/**
 * Checks if a duration is equal to another duration.
 * @param duration - The duration to check.
 * @param comparedWith - The duration to compare to.
 * @returns True if the duration is equal to the other duration, false otherwise.
 */
export function isDurationEqual(
	duration: Temporal.Duration,
	comparedWith: Temporal.Duration,
) {
	return Temporal.Duration.compare(duration, comparedWith) === 0;
}

/**
 * Checks if a duration is less than another duration.
 * @param duration - The duration to check.
 * @param comparedWith - The duration to compare to.
 * @returns True if the duration is less than the other duration, false otherwise.
 */
export function isDurationLess(
	duration: Temporal.Duration,
	comparedWith: Temporal.Duration,
) {
	return Temporal.Duration.compare(duration, comparedWith) === -1;
}

/**
 * Checks if two intervals overlap.
 * @param interval1 - The first interval.
 * @param interval2 - The second interval.
 * @returns True if the intervals overlap, false otherwise.
 */
export function areIntervalsOverlapping(
	interval1: { start: Temporal.Instant; end: Temporal.Instant },
	interval2: { start: Temporal.Instant; end: Temporal.Instant },
) {
	return (
		isInstantBefore(interval1.start, interval2.end) &&
		isInstantBefore(interval2.start, interval1.end)
	);
}
