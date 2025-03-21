import { Temporal } from "@js-temporal/polyfill";
import { beforeEach, describe, expect, it } from "vitest";
import {
	formatFriendlyDateTime,
	formatFriendlyInstant,
	formatFriendlyIso8601DateTimeStr,
	formatFriendlyPlainDate,
	formatFriendlyPlainDateShort,
	formatFriendlyTimezone,
	formatInstant,
	formatInstantFriendlyDate,
	formatInstantTime,
	formatInstantTime24h,
	formatInstantTimeRange,
	formatInstantTimeWithSeconds,
	formatIso8601ToFriendlyDate,
	formatIso8601ToFriendlyDateShort,
	formatIso8601ToTime,
	formatJSDate,
	formatOptionalInstantTimeWithSeconds,
	formatOptionalIso8601ToTime,
	formatOptionalIso8601ToTimeWithSeconds,
	formatOptionalJSDate,
	formatOptionalPlainDate,
	formatOptionalPlainDateTime,
	formatOptionalPlainTime,
	formatOptionalRelativeIso8601DateTimeStr,
	formatPlainDate,
	formatPlainDateMonth,
	formatPlainDateRange,
	formatPlainDateShortMonth,
	formatPlainDateTime,
	formatPlainTime,
	formatRelativeIso8601DateTimeStr,
	formatZonedDateTimeTime,
} from "./formatting";
import { nowLocal } from "./now";
import { parseInstant } from "./parsing";
import { mockNow } from "./test-utilities";
import { TZ_EUROPE_LONDON, TZ_UTC } from "./timezone";

describe("formatRelativeIso8601DateTimeStr", () => {
	beforeEach(() => {
		mockNow(parseInstant("2022-05-05T10:12:13Z"));
	});
	it.each([
		["2022-05-03T10:12:13Z", "2 days ago"],
		["2022-05-03T00:12:13Z", "2 days ago"],
		["2022-05-07T14:12:13Z", "in 2 days"],
		["2022-05-05T06:12:13Z", "4 hours ago"],
		["2022-05-05T16:34:17Z", "in 6 hours"],
		["2022-05-05T10:24:13Z", "in 12 minutes"],
		["2022-05-05T09:44:22Z", "27 minutes ago"],
		["2022-05-05T09:18:22Z", "53 minutes ago"],
		["2022-05-05T09:02:16Z", "1 hour ago"],
		["2022-05-05T10:12:22Z", "in 9 seconds"],
		["2022-05-05T10:12:05Z", "8 seconds ago"],
		["2022-05-05T10:12:13Z", "now"],
		["2021-05-05T10:12:13Z", "1 year ago"],
		["2016-05-05T10:12:13Z", "6 years ago"],
		["2022-01-05T10:12:13Z", "4 months ago"],
		["2021-08-15T10:12:13Z", "8 months ago"],
	])("Correctly formats %p -> %p", (input, expectedOutput) => {
		expect(formatRelativeIso8601DateTimeStr(input)).toEqual(expectedOutput);
	});
});

describe("formatPlainDateRange", () => {
	it("formats a range of dates", () => {
		const start = new Temporal.PlainDate(2024, 6, 12);
		const end = new Temporal.PlainDate(2024, 6, 15);
		expect(
			formatPlainDateRange(start, end, { locale: "en-GB", includeYear: true }),
		).toEqual("12th - 15th June 2024");
	});

	it("formats a range of dates than span months", () => {
		const start = new Temporal.PlainDate(2024, 6, 12);
		const end = new Temporal.PlainDate(2024, 7, 15);
		expect(
			formatPlainDateRange(start, end, { locale: "en-GB", includeYear: true }),
		).toEqual("12th June - 15th July 2024");
	});

	it("formats a range of dates than span years", () => {
		const start = new Temporal.PlainDate(2024, 6, 12);
		const end = new Temporal.PlainDate(2025, 7, 15);
		expect(
			formatPlainDateRange(start, end, { locale: "en-GB", includeYear: true }),
		).toEqual("12th June 2024 - 15th July 2025");
	});
});

describe("formatPlainDateTime", () => {
	it("formats a plain date time", () => {
		const date = new Temporal.PlainDateTime(2024, 6, 12, 14, 22);
		expect(formatPlainDateTime(date)).toEqual("2024-06-12T14:22");
	});
});

describe("formatPlainDate", () => {
	it("formats a plain date", () => {
		const date = new Temporal.PlainDate(2024, 6, 12);
		expect(formatPlainDate(date)).toEqual("2024-06-12");
	});
});

describe("formatJSDate", () => {
	it("formats a JS date", () => {
		const date = new Date("2024-06-12T14:22:00Z");
		expect(formatJSDate(date, TZ_UTC)).toEqual("2024-06-12");
	});
});

describe("formatPlainTime", () => {
	it("formats a plain time", () => {
		const time = new Temporal.PlainTime(14, 22);
		expect(formatPlainTime(time)).toEqual("14:22");
	});
});

describe("formatInstant", () => {
	it("formats an instant", () => {
		const instant = parseInstant("2024-06-12T14:22:59.123Z");
		expect(formatInstant(instant)).toEqual("2024-06-12T14:22:59.123Z");
	});
});

describe("formatOptionalPlainDateTime", () => {
	it("formats a plain date time when provided", () => {
		const date = new Temporal.PlainDateTime(2024, 6, 12, 14, 22);
		expect(formatOptionalPlainDateTime(date)).toEqual("2024-06-12T14:22");
	});

	it("returns undefined when date is null", () => {
		expect(formatOptionalPlainDateTime(null)).toBeUndefined();
	});

	it("returns undefined when date is undefined", () => {
		expect(formatOptionalPlainDateTime(undefined)).toBeUndefined();
	});
});

describe("formatOptionalPlainDate", () => {
	it("formats a plain date when provided", () => {
		const date = new Temporal.PlainDate(2024, 6, 12);
		expect(formatOptionalPlainDate(date)).toEqual("2024-06-12");
	});

	it("returns undefined when date is null", () => {
		expect(formatOptionalPlainDate(null)).toBeUndefined();
	});

	it("returns undefined when date is undefined", () => {
		expect(formatOptionalPlainDate(undefined)).toBeUndefined();
	});
});

describe("formatOptionalJSDate", () => {
	it("formats a JS date when provided", () => {
		const date = new Date("2024-06-12T14:22:00Z");
		expect(formatOptionalJSDate(date, TZ_UTC)).toEqual("2024-06-12");
	});

	it("returns undefined when date is null", () => {
		expect(formatOptionalJSDate(null, TZ_UTC)).toBeUndefined();
	});

	it("returns undefined when date is undefined", () => {
		expect(formatOptionalJSDate(undefined, TZ_UTC)).toBeUndefined();
	});
});

describe("formatOptionalPlainTime", () => {
	it("formats a plain time when provided", () => {
		const time = new Temporal.PlainTime(14, 22);
		expect(formatOptionalPlainTime(time)).toEqual("14:22");
	});

	it("returns undefined when time is null", () => {
		expect(formatOptionalPlainTime(null)).toBeUndefined();
	});

	it("returns undefined when time is undefined", () => {
		expect(formatOptionalPlainTime(undefined)).toBeUndefined();
	});
});

describe("formatOptionalRelativeIso8601DateTimeStr", () => {
	beforeEach(() => {
		mockNow(parseInstant("2022-05-05T10:12:13Z"));
	});

	it("formats a datetime string when provided", () => {
		expect(
			formatOptionalRelativeIso8601DateTimeStr("2022-05-03T10:12:13Z"),
		).toEqual("2 days ago");
	});

	it("returns undefined when datetime is null", () => {
		expect(formatOptionalRelativeIso8601DateTimeStr(null)).toBeUndefined();
	});

	it("returns undefined when datetime is undefined", () => {
		expect(formatOptionalRelativeIso8601DateTimeStr(undefined)).toBeUndefined();
	});
});

describe("formatFriendlyIso8601DateTimeStr", () => {
	it("formats a datetime string", () => {
		const result = formatFriendlyIso8601DateTimeStr(
			"2024-06-12T14:22:59.123Z",
			TZ_EUROPE_LONDON,
		);

		expect(result).toMatch(/Wednesday,? 12th June 2024 at 15:22/);
	});
});

describe("formatFriendlyInstant", () => {
	it("formats an instant", () => {
		const instant = parseInstant("2024-06-12T14:22:59.123Z");
		const result = formatFriendlyInstant(instant, TZ_EUROPE_LONDON);

		expect(result).toMatch(/Wednesday,? 12th June 2024 at 15:22/);
	});
});

describe("formatIso8601ToTime", () => {
	it("formats a datetime string to time", () => {
		expect(
			formatIso8601ToTime("2024-06-12T14:22:59.123Z", TZ_EUROPE_LONDON),
		).toEqual("15:22");
	});
});

describe("formatFriendlyPlainDate", () => {
	it("formats a plain date", () => {
		const date = new Temporal.PlainDate(2024, 6, 12);
		const result = formatFriendlyPlainDate(date, TZ_EUROPE_LONDON);

		expect(result).toMatch(/Wednesday,? 12th June 2024/);
	});
});

describe("formatFriendlyPlainDateShort", () => {
	it("formats a plain date with default options", () => {
		const date = new Temporal.PlainDate(2024, 6, 12);
		const result = formatFriendlyPlainDateShort(date, { includeYear: true });

		expect(result).toMatch(/Wed,? 12th June 2024/);
	});

	it("formats a plain date with custom options", () => {
		const date = new Temporal.PlainDate(2024, 6, 12);
		const result = formatFriendlyPlainDateShort(date, {
			includeYear: false,
			excludeWeekday: true,
			shortMonth: true,
		});

		expect(result).toEqual("12th Jun");
	});
});

describe("formatFriendlyDateTime", () => {
	it("formats a zoned date time", () => {
		const date = parseInstant("2024-06-12T14:22:59.123Z").toZonedDateTimeISO(
			TZ_EUROPE_LONDON,
		);
		const result = formatFriendlyDateTime(date);

		expect(result).toMatch(/Wednesday,? 12th June 2024 at 15:22/);
	});
});

describe("formatInstantFriendlyDate", () => {
	it("formats an instant as a friendly date", () => {
		const instant = parseInstant("2024-06-12T14:22:59.123Z");
		const result = formatInstantFriendlyDate(instant, TZ_EUROPE_LONDON);

		expect(result).toMatch(/Wednesday,? 12th June 2024 at 15:22/);
	});
});

describe("formatInstantTime", () => {
	it("formats an instant as time", () => {
		const instant = parseInstant("2024-06-12T14:22:59.123Z");
		expect(formatInstantTime(instant, TZ_EUROPE_LONDON)).toEqual("15:22");
	});
});

describe("formatInstantTimeRange", () => {
	it("formats a range of instants as time", () => {
		const start = parseInstant("2024-06-12T14:22:59.123Z");
		const end = parseInstant("2024-06-12T15:22:59.123Z");
		expect(formatInstantTimeRange(start, end, TZ_EUROPE_LONDON)).toEqual(
			"15:22 - 16:22",
		);
	});
});

describe("formatInstantTimeWithSeconds", () => {
	it("formats an instant as time with seconds", () => {
		const instant = parseInstant("2024-06-12T14:22:59.123Z");
		expect(formatInstantTimeWithSeconds(instant, TZ_EUROPE_LONDON)).toEqual(
			"15:22:59",
		);
	});
});

describe("formatOptionalInstantTimeWithSeconds", () => {
	it("formats an instant as time with seconds when provided", () => {
		const instant = parseInstant("2024-06-12T14:22:59.123Z");
		expect(
			formatOptionalInstantTimeWithSeconds(instant, TZ_EUROPE_LONDON),
		).toEqual("15:22:59");
	});

	it("returns undefined when instant is null", () => {
		expect(
			formatOptionalInstantTimeWithSeconds(null, TZ_EUROPE_LONDON),
		).toBeUndefined();
	});

	it("returns undefined when instant is undefined", () => {
		expect(
			formatOptionalInstantTimeWithSeconds(undefined, TZ_EUROPE_LONDON),
		).toBeUndefined();
	});
});

describe("formatInstantTime24h", () => {
	it("formats an instant as 24h time", () => {
		const instant = parseInstant("2024-06-12T14:22:59.123Z");
		expect(formatInstantTime24h(instant, TZ_EUROPE_LONDON)).toEqual("15:22");
	});
});

describe("formatZonedDateTimeTime", () => {
	it("formats a zoned date time as hour and minute", () => {
		const date = parseInstant("2024-06-12T14:22:59.123Z").toZonedDateTimeISO(
			TZ_EUROPE_LONDON,
		);
		expect(formatZonedDateTimeTime(date)).toEqual("15:22");
	});
});

describe("formatFriendlyTimezone", () => {
	it("formats a timezone name", () => {
		const result = formatFriendlyTimezone(TZ_EUROPE_LONDON);
		// The exact output will depend on the system locale and timezone, but it should contain "British" or "GMT"
		expect(result).toMatch(/British|GMT/);
	});
});

describe("formatPlainDateMonth", () => {
	it("gets the long month name from a plain date", () => {
		const date = new Temporal.PlainDate(2024, 6, 12);
		expect(formatPlainDateMonth(date)).toEqual("June");
	});

	it("handles different months", () => {
		const date = new Temporal.PlainDate(2024, 1, 1);
		expect(formatPlainDateMonth(date)).toEqual("January");
	});
});

describe("formatPlainDateShortMonth", () => {
	it("gets the short month name from a plain date", () => {
		const date = new Temporal.PlainDate(2024, 6, 12);
		expect(formatPlainDateShortMonth(date)).toEqual("Jun");
	});

	it("handles different months", () => {
		const date = new Temporal.PlainDate(2024, 1, 1);
		expect(formatPlainDateShortMonth(date)).toEqual("Jan");
	});
});

describe("formatIso8601ToFriendlyDate", () => {
	it("formats a datetime string as a friendly date", () => {
		const result = formatIso8601ToFriendlyDate(
			"2024-06-12T14:22:59.123Z",
			TZ_EUROPE_LONDON,
		);
		expect(result).toMatch(/Wednesday,? 12th June 2024/);
	});
});

describe("formatIso8601ToFriendlyDateShort", () => {
	it("formats a datetime string as a short friendly date", () => {
		const result = formatIso8601ToFriendlyDateShort(
			"2024-06-12T14:22:59.123Z",
			TZ_EUROPE_LONDON,
		);
		expect(result).toMatch(/Wed,? 12th June/);
	});
});

describe("formatOptionalIso8601ToTime", () => {
	it("formats a datetime string to time when provided", () => {
		expect(
			formatOptionalIso8601ToTime("2024-06-12T14:22:59.123Z", TZ_EUROPE_LONDON),
		).toEqual("15:22");
	});

	it("returns null when time is null", () => {
		expect(formatOptionalIso8601ToTime(null, TZ_EUROPE_LONDON)).toBeNull();
	});

	it("returns null when time is undefined", () => {
		expect(formatOptionalIso8601ToTime(undefined, TZ_EUROPE_LONDON)).toBeNull();
	});
});

describe("formatOptionalIso8601ToTimeWithSeconds", () => {
	it("formats a datetime string to time with seconds when provided", () => {
		expect(
			formatOptionalIso8601ToTimeWithSeconds(
				"2024-06-12T14:22:59.123Z",
				TZ_EUROPE_LONDON,
			),
		).toEqual("15:22:59");
	});

	it("returns null when time is null", () => {
		expect(
			formatOptionalIso8601ToTimeWithSeconds(null, TZ_EUROPE_LONDON),
		).toBeNull();
	});

	it("returns null when time is undefined", () => {
		expect(
			formatOptionalIso8601ToTimeWithSeconds(undefined, TZ_EUROPE_LONDON),
		).toBeNull();
	});
});
