import { Temporal } from "@js-temporal/polyfill";

/**
 * Adds a number of business days to a date, assuming Monday to Fri.
 * @param date - The date to add the business days to.
 * @param n - The number of business days to add.
 * @returns The date with the business days added.
 */
export function addBusinessDays(
	date: Temporal.PlainDate,
	n: number,
	isBusinessDay: (date: Temporal.PlainDate) => boolean = (d) =>
		d.dayOfWeek >= 1 && d.dayOfWeek <= 5,
) {
	let next = date;

	for (let i = 1; i <= n; i += 1) {
		next = next.add({ days: 1 });
		while (!isBusinessDay(next)) {
			next = next.add({ days: 1 });
		}
	}

	return next;
}

/**
 * Returns the start of a day in a given time zone as a ZonedDateTime.
 * @param date - The date to get the start of the day for.
 * @param timezone - The time zone to get the start of the day for.
 * @returns The start of the day in the given time zone.
 */
export function startOfDay(
	date: Temporal.PlainDate,
	timezone: string,
): Temporal.ZonedDateTime {
	return date.toZonedDateTime({
		timeZone: timezone,
		plainTime: new Temporal.PlainTime(),
	});
}

/**
 * Returns the end of a day in a given time zone as a ZonedDateTime.
 * @param date - The date to get the end of the day for.
 * @param timezone - The time zone to get the end of the day for.
 * @returns The end of the day in the given time zone.
 */
export function endOfDay(
	date: Temporal.PlainDate,
	timezone: string,
): Temporal.ZonedDateTime {
	return date.toZonedDateTime({
		timeZone: timezone,
		plainTime: new Temporal.PlainTime().subtract({ nanoseconds: 1 }),
	});
}

/**
 * Returns the start of a week as a PlainDate.
 * @param date - The date to get the start of the week for.
 * @returns The start of the week as a PlainDate.
 */
export function startOfWeek(date: Temporal.PlainDate): Temporal.PlainDate {
	return date.subtract({ days: date.dayOfWeek - 1 });
}

/**
 * Returns the end of a week as a PlainDate.
 * @param date - The date to get the end of the week for.
 * @returns The end of the week as a PlainDate.
 */
export function endOfWeek(date: Temporal.PlainDate): Temporal.PlainDate {
	return date.add({ days: 7 - date.dayOfWeek });
}

/**
 * Returns the start of a month as a PlainDate.
 * @param date - The date to get the start of the month for.
 * @returns The start of the month as a PlainDate.
 */
export function startOfMonth(date: Temporal.PlainDate): Temporal.PlainDate {
	return date.subtract({ days: date.day - 1 });
}

/**
 * Returns the end of a month as a PlainDate.
 * @param date - The date to get the end of the month for.
 * @returns The end of the month as a PlainDate.
 */
export function endOfMonth(date: Temporal.PlainDate): Temporal.PlainDate {
	return date.add({ days: date.daysInMonth - date.day });
}
