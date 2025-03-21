import { Temporal } from "@js-temporal/polyfill";
import { describe, expect, it } from "vitest";
import {
	areIntervalsOverlapping,
	isDateAfter,
	isDateBefore,
	isDateEqual,
	isDurationEqual,
	isDurationGreater,
	isDurationLess,
	isInstantAfter,
	isInstantBefore,
	isInstantEqual,
	isOptionalDateEqual,
	isOptionalInstantEqual,
	isTimeAfter,
	isTimeBefore,
	isTimeEqual,
	isToday,
	isTomorrow,
	isYesterday,
} from "./comparison";
import { parseInstant, parsePlainDate, parsePlainTime } from "./parsing";
import { mockNow } from "./test-utilities";

describe("isToday", () => {
	it("Should return true if the date is today in local time", () => {
		// 8pm UTC
		mockNow(parseInstant("2022-07-09T20:00:00.000Z"));

		// UTC
		expect(isToday(parsePlainDate("2022-07-09"), "UTC")).toBe(true);
		// UTC + 1
		expect(isToday(parsePlainDate("2022-07-09"), "Europe/London")).toBe(true);
		// UTC - 4
		expect(isToday(parsePlainDate("2022-07-09"), "America/Halifax")).toBe(true);
		// UTC + 9
		expect(isToday(parsePlainDate("2022-07-09"), "Japan")).toBe(false);
	});
});

describe("isTomorrow", () => {
	it("Should return true if the date is tomorrow in local time", () => {
		// Current time is 2am UTC
		mockNow(parseInstant("2022-07-09T02:00:00.000Z"));

		// UTC
		expect(isTomorrow(parsePlainDate("2022-07-10"), "UTC")).toBe(true);
		// UTC + 1
		expect(isTomorrow(parsePlainDate("2022-07-10"), "Europe/London")).toBe(
			true,
		);
		// UTC - 3
		expect(isTomorrow(parsePlainDate("2022-07-09"), "America/Halifax")).toBe(
			true,
		);
		// UTC 9th Sept
		expect(isTomorrow(parsePlainDate("2022-07-09"), "UTC")).toBe(false);
		// UTC + 1
		expect(isTomorrow(parsePlainDate("2022-07-09"), "Europe/London")).toBe(
			false,
		);
		// UTC + 9
		expect(isTomorrow(parsePlainDate("2022-07-09"), "Japan")).toBe(false);
	});
});

describe("isYesterday", () => {
	it("Should return true if the date is yesterday in local time", () => {
		// Current time is 8pm UTC
		mockNow(parseInstant("2022-07-09T20:00:00.000Z"));

		// UTC
		expect(isYesterday(parsePlainDate("2022-07-08"), "UTC")).toBe(true);
		// UTC + 1
		expect(isYesterday(parsePlainDate("2022-07-08"), "Europe/London")).toBe(
			true,
		);
		// UTC - 3
		expect(isYesterday(parsePlainDate("2022-07-09"), "America/Halifax")).toBe(
			false,
		);
		// UTC + 9
		expect(isYesterday(parsePlainDate("2022-07-09"), "Japan")).toBe(true);
	});
});

describe("isDurationGreater", () => {
	it.each([
		[
			Temporal.Duration.from({ hours: 1 }),
			Temporal.Duration.from({ hours: 2 }),
			false,
		],
		[
			Temporal.Duration.from({ hours: 2 }),
			Temporal.Duration.from({ hours: 1 }),
			true,
		],
		[
			Temporal.Duration.from({ hours: 1 }),
			Temporal.Duration.from({ hours: 1 }),
			false,
		],
		[
			Temporal.Duration.from({ hours: 1 }),
			Temporal.Duration.from({ minutes: 59 }),
			true,
		],
		[
			Temporal.Duration.from({ hours: 1 }),
			Temporal.Duration.from({ minutes: 61 }),
			false,
		],
	])("should return the expected result", (a, b, expected) => {
		expect(isDurationGreater(a, b)).toEqual(expected);
	});
});

describe("isDurationEqual", () => {
	it.each([
		[
			Temporal.Duration.from({ hours: 1 }),
			Temporal.Duration.from({ hours: 2 }),
			false,
		],
		[
			Temporal.Duration.from({ hours: 2 }),
			Temporal.Duration.from({ hours: 1 }),
			false,
		],
		[
			Temporal.Duration.from({ hours: 1 }),
			Temporal.Duration.from({ hours: 1 }),
			true,
		],
		[
			Temporal.Duration.from({ hours: 1 }),
			Temporal.Duration.from({ minutes: 59 }),
			false,
		],
		[
			Temporal.Duration.from({ hours: 1 }),
			Temporal.Duration.from({ minutes: 60 }),
			true,
		],
		[
			Temporal.Duration.from({ hours: 1 }),
			Temporal.Duration.from({ minutes: 61 }),
			false,
		],
	])("should return the expected result", (a, b, expected) => {
		expect(isDurationEqual(a, b)).toEqual(expected);
	});
});

describe("isDurationLess", () => {
	it.each([
		[
			Temporal.Duration.from({ hours: 2 }),
			Temporal.Duration.from({ hours: 1 }),
			false,
		],
		[
			Temporal.Duration.from({ hours: 1 }),
			Temporal.Duration.from({ hours: 2 }),
			true,
		],
		[
			Temporal.Duration.from({ hours: 1 }),
			Temporal.Duration.from({ hours: 1 }),
			false,
		],
		[
			Temporal.Duration.from({ minutes: 59 }),
			Temporal.Duration.from({ hours: 1 }),
			true,
		],
		[
			Temporal.Duration.from({ minutes: 61 }),
			Temporal.Duration.from({ hours: 1 }),
			false,
		],
	])("should return the expected result", (a, b, expected) => {
		expect(isDurationLess(a, b)).toEqual(expected);
	});
});

describe("areIntervalsOverlapping", () => {
	it.each([
		[
			true,
			{
				start: "2022-07-09T20:00:00.000Z",
				end: "2022-07-09T22:00:00.000Z",
			},
			{
				start: "2022-07-09T19:00:00.000Z",
				end: "2022-07-09T20:10:00.000Z",
			},
		],
		[
			false,
			{
				start: "2022-07-09T20:00:00.000Z",
				end: "2022-07-09T22:00:00.000Z",
			},
			{
				start: "2022-07-09T22:00:00.000Z",
				end: "2022-07-10T01:00:00.000Z",
			},
		],
		[
			false,
			{
				start: "2022-07-09T20:00:00.000Z",
				end: "2022-07-09T22:00:00.000Z",
			},
			{
				start: "2022-07-09T19:00:00.000Z",
				end: "2022-07-09T20:00:00.000Z",
			},
		],
		[
			true,
			{
				start: "2022-07-09T19:00:00.000Z",
				end: "2022-07-09T22:00:00.000Z",
			},
			{
				start: "2022-07-09T20:00:00.000Z",
				end: "2022-07-09T21:00:00.000Z",
			},
		],
		[
			true,
			{
				start: "2022-07-09T20:00:00.000Z",
				end: "2022-07-09T22:00:00.000Z",
			},
			{
				start: "2022-07-09T21:00:00.000Z",
				end: "2022-07-09T21:30:00.000Z",
			},
		],
	])("should return %p result for %p %p", (expected, a, b) => {
		expect(
			areIntervalsOverlapping(
				{
					start: parseInstant(a.start),
					end: parseInstant(a.end),
				},
				{
					start: parseInstant(b.start),
					end: parseInstant(b.end),
				},
			),
		).toEqual(expected);
	});
});

describe("isDateEqual", () => {
	it("should return true if the dates are equal", () => {
		expect(
			isDateEqual(parsePlainDate("2022-07-09"), parsePlainDate("2022-07-09")),
		).toBe(true);
	});

	it("should return false if the dates are not equal", () => {
		expect(
			isDateEqual(parsePlainDate("2022-07-09"), parsePlainDate("2022-07-10")),
		).toBe(false);
	});

	it("should return false if the dates are not equal", () => {
		expect(
			isDateEqual(parsePlainDate("2022-07-09"), parsePlainDate("2022-07-10")),
		).toBe(false);
	});
});

describe("isOptionalDateEqual", () => {
	it("should return true if the dates are equal", () => {
		expect(
			isOptionalDateEqual(
				parsePlainDate("2022-07-09"),
				parsePlainDate("2022-07-09"),
			),
		).toBe(true);
	});

	it("should return false if the dates are not equal", () => {
		expect(
			isOptionalDateEqual(
				parsePlainDate("2022-07-09"),
				parsePlainDate("2022-07-10"),
			),
		).toBe(false);
	});

	it("should return false if one date is undefined", () => {
		expect(isOptionalDateEqual(undefined, parsePlainDate("2022-07-09"))).toBe(
			false,
		);
	});

	it("should return true if both dates are undefined", () => {
		expect(isOptionalDateEqual(undefined, undefined)).toBe(true);
	});

	it("should return false if the other date is undefined", () => {
		expect(isOptionalDateEqual(parsePlainDate("2022-07-09"), undefined)).toBe(
			false,
		);
	});
});

describe("isDateAfter", () => {
	it("should return true if the date is after the other date", () => {
		expect(
			isDateAfter(parsePlainDate("2022-07-10"), parsePlainDate("2022-07-09")),
		).toBe(true);
	});

	it("should return false if the date is not after the other date", () => {
		expect(
			isDateAfter(parsePlainDate("2022-07-09"), parsePlainDate("2022-07-10")),
		).toBe(false);
	});

	it("should return false if the dates are equal", () => {
		expect(
			isDateAfter(parsePlainDate("2022-07-09"), parsePlainDate("2022-07-09")),
		).toBe(false);
	});
});

describe("isDateBefore", () => {
	it("should return false if the date is not before the other date", () => {
		expect(
			isDateBefore(parsePlainDate("2022-07-10"), parsePlainDate("2022-07-09")),
		).toBe(false);
	});

	it("should return true if the date is before the other date", () => {
		expect(
			isDateBefore(parsePlainDate("2022-07-09"), parsePlainDate("2022-07-10")),
		).toBe(true);
	});

	it("should return false if the dates are equal", () => {
		expect(
			isDateBefore(parsePlainDate("2022-07-09"), parsePlainDate("2022-07-09")),
		).toBe(false);
	});
});

describe("isTimeAfter", () => {
	it("should return true if the time is after the other time", () => {
		expect(
			isTimeAfter(parsePlainTime("14:00:00"), parsePlainTime("13:00:00")),
		).toBe(true);
	});

	it("should return false if the time is not after the other time", () => {
		expect(
			isTimeAfter(parsePlainTime("13:00:00"), parsePlainTime("14:00:00")),
		).toBe(false);
	});

	it("should return false if the times are equal", () => {
		expect(
			isTimeAfter(parsePlainTime("14:00:00"), parsePlainTime("14:00:00")),
		).toBe(false);
	});
});

describe("isTimeEqual", () => {
	it("should return true if the times are equal", () => {
		expect(
			isTimeEqual(parsePlainTime("14:00:00"), parsePlainTime("14:00:00")),
		).toBe(true);
	});

	it("should return false if the times are not equal", () => {
		expect(
			isTimeEqual(parsePlainTime("14:00:00"), parsePlainTime("13:00:00")),
		).toBe(false);
	});
});

describe("isTimeBefore", () => {
	it("should return true if the time is before the other time", () => {
		expect(
			isTimeBefore(parsePlainTime("13:00:00"), parsePlainTime("14:00:00")),
		).toBe(true);
	});

	it("should return false if the time is not before the other time", () => {
		expect(
			isTimeBefore(parsePlainTime("14:00:00"), parsePlainTime("13:00:00")),
		).toBe(false);
	});

	it("should return false if the times are equal", () => {
		expect(
			isTimeBefore(parsePlainTime("14:00:00"), parsePlainTime("14:00:00")),
		).toBe(false);
	});
});

describe("isInstantAfter", () => {
	it("should return true if the instant is after the other instant", () => {
		expect(
			isInstantAfter(
				parseInstant("2024-03-12T14:00:00Z"),
				parseInstant("2024-03-12T13:00:00Z"),
			),
		).toBe(true);
	});

	it("should return false if the instant is not after the other instant", () => {
		expect(
			isInstantAfter(
				parseInstant("2024-03-12T13:00:00Z"),
				parseInstant("2024-03-12T14:00:00Z"),
			),
		).toBe(false);
	});

	it("should return false if the instants are equal", () => {
		expect(
			isInstantAfter(
				parseInstant("2024-03-12T14:00:00Z"),
				parseInstant("2024-03-12T14:00:00Z"),
			),
		).toBe(false);
	});
});

describe("isInstantEqual", () => {
	it("should return true if the instants are equal", () => {
		expect(
			isInstantEqual(
				parseInstant("2024-03-12T14:00:00Z"),
				parseInstant("2024-03-12T14:00:00Z"),
			),
		).toBe(true);
	});

	it("should return false if the instants are not equal", () => {
		expect(
			isInstantEqual(
				parseInstant("2024-03-12T14:00:00Z"),
				parseInstant("2024-03-12T13:00:00Z"),
			),
		).toBe(false);
	});
});

describe("isOptionalInstantEqual", () => {
	it("should return true if the instants are equal", () => {
		expect(
			isOptionalInstantEqual(
				parseInstant("2024-03-12T14:00:00Z"),
				parseInstant("2024-03-12T14:00:00Z"),
			),
		).toBe(true);
	});

	it("should return false if the instants are not equal", () => {
		expect(
			isOptionalInstantEqual(
				parseInstant("2024-03-12T14:00:00Z"),
				parseInstant("2024-03-12T13:00:00Z"),
			),
		).toBe(false);
	});

	it("should return true if both instants are undefined", () => {
		expect(isOptionalInstantEqual(undefined, undefined)).toBe(true);
	});

	it("should return false if one instant is undefined", () => {
		expect(
			isOptionalInstantEqual(undefined, parseInstant("2024-03-12T14:00:00Z")),
		).toBe(false);
		expect(
			isOptionalInstantEqual(parseInstant("2024-03-12T14:00:00Z"), undefined),
		).toBe(false);
	});

	it("should return false if one instant is null", () => {
		expect(
			isOptionalInstantEqual(null, parseInstant("2024-03-12T14:00:00Z")),
		).toBe(false);
		expect(
			isOptionalInstantEqual(parseInstant("2024-03-12T14:00:00Z"), null),
		).toBe(false);
	});
});

describe("isInstantBefore", () => {
	it("should return true if the instant is before the other instant", () => {
		expect(
			isInstantBefore(
				parseInstant("2024-03-12T13:00:00Z"),
				parseInstant("2024-03-12T14:00:00Z"),
			),
		).toBe(true);
	});

	it("should return false if the instant is not before the other instant", () => {
		expect(
			isInstantBefore(
				parseInstant("2024-03-12T14:00:00Z"),
				parseInstant("2024-03-12T13:00:00Z"),
			),
		).toBe(false);
	});

	it("should return false if the instants are equal", () => {
		expect(
			isInstantBefore(
				parseInstant("2024-03-12T14:00:00Z"),
				parseInstant("2024-03-12T14:00:00Z"),
			),
		).toBe(false);
	});
});
