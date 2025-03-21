import { Temporal } from "@js-temporal/polyfill";
import { describe, expect, it } from "vitest";
import {
	parseInstant,
	parseInstantFromEpochMilliseconds,
	parseOptionalInstant,
	parseOptionalPlainDate,
	parseOptionalPlainDateTime,
	parseOptionalPlainTime,
	parseOptionalZonedDateTime,
	parsePlainDate,
	parsePlainDateTime,
	parsePlainTime,
	parseZonedDateTime,
} from "./parsing";

describe("parsePlainDate", () => {
	it("parses a valid ISO 8601 date string", () => {
		const result = parsePlainDate("2024-03-20");
		expect(result).toEqual(Temporal.PlainDate.from("2024-03-20"));
	});

	it("throws on invalid date string", () => {
		expect(() => parsePlainDate("invalid-date")).toThrow();
	});
});

describe("parseOptionalPlainDate", () => {
	it("parses a valid ISO 8601 date string", () => {
		const result = parseOptionalPlainDate("2024-03-20");
		expect(result).toEqual(Temporal.PlainDate.from("2024-03-20"));
	});

	it("returns undefined for null", () => {
		expect(parseOptionalPlainDate(null)).toBeUndefined();
	});

	it("returns undefined for undefined", () => {
		expect(parseOptionalPlainDate(undefined)).toBeUndefined();
	});

	it("returns undefined for empty string", () => {
		expect(parseOptionalPlainDate("")).toBeUndefined();
	});
});

describe("parsePlainDateTime", () => {
	it("parses a valid ISO 8601 date time string", () => {
		const result = parsePlainDateTime("2024-03-20T15:30:00");
		expect(result).toEqual(Temporal.PlainDateTime.from("2024-03-20T15:30:00"));
	});

	it("throws on invalid date time string", () => {
		expect(() => parsePlainDateTime("invalid-datetime")).toThrow();
	});
});

describe("parseOptionalPlainDateTime", () => {
	it("parses a valid ISO 8601 date time string", () => {
		const result = parseOptionalPlainDateTime("2024-03-20T15:30:00");
		expect(result).toEqual(Temporal.PlainDateTime.from("2024-03-20T15:30:00"));
	});

	it("returns undefined for null", () => {
		expect(parseOptionalPlainDateTime(null)).toBeUndefined();
	});

	it("returns undefined for undefined", () => {
		expect(parseOptionalPlainDateTime(undefined)).toBeUndefined();
	});

	it("returns undefined for empty string", () => {
		expect(parseOptionalPlainDateTime("")).toBeUndefined();
	});
});

describe("parseZonedDateTime", () => {
	it("parses a valid ISO 8601 zoned date time string", () => {
		const result = parseZonedDateTime("2024-08-20T11:30:00[Europe/London]");
		expect(result.toInstant().toString()).toEqual("2024-08-20T10:30:00Z");
	});

	it("throws on invalid zoned date time string", () => {
		expect(() => parseZonedDateTime("invalid-zoned-datetime")).toThrow();
	});
});

describe("parseOptionalZonedDateTime", () => {
	it("parses a valid ISO 8601 zoned date time string", () => {
		const result = parseOptionalZonedDateTime(
			"2024-06-20T15:30:00[Europe/London]",
		);
		expect(result?.toInstant().toString()).toEqual("2024-06-20T14:30:00Z");
	});

	it("returns undefined for null", () => {
		expect(parseOptionalZonedDateTime(null)).toBeUndefined();
	});

	it("returns undefined for undefined", () => {
		expect(parseOptionalZonedDateTime(undefined)).toBeUndefined();
	});

	it("returns undefined for empty string", () => {
		expect(parseOptionalZonedDateTime("")).toBeUndefined();
	});
});

describe("parseInstant", () => {
	it("parses a valid ISO 8601 instant string", () => {
		const result = parseInstant("2024-03-20T15:30:00Z");
		expect(result).toEqual(Temporal.Instant.from("2024-03-20T15:30:00Z"));
	});

	it("throws on invalid instant string", () => {
		expect(() => parseInstant("invalid-instant")).toThrow();
	});
});

describe("parseOptionalInstant", () => {
	it("parses a valid ISO 8601 instant string", () => {
		const result = parseOptionalInstant("2024-03-20T15:30:00Z");
		expect(result).toEqual(Temporal.Instant.from("2024-03-20T15:30:00Z"));
	});

	it("returns undefined for null", () => {
		expect(parseOptionalInstant(null)).toBeUndefined();
	});

	it("returns undefined for undefined", () => {
		expect(parseOptionalInstant(undefined)).toBeUndefined();
	});

	it("returns undefined for empty string", () => {
		expect(parseOptionalInstant("")).toBeUndefined();
	});
});

describe("parseInstantFromEpochMilliseconds", () => {
	it("parses epoch milliseconds into an Instant", () => {
		const epochMs = 1710937800000; // 2024-03-20T15:30:00Z
		const result = parseInstantFromEpochMilliseconds(epochMs);
		expect(result).toEqual(Temporal.Instant.fromEpochMilliseconds(epochMs));
	});

	it("handles zero milliseconds", () => {
		const result = parseInstantFromEpochMilliseconds(0);
		expect(result).toEqual(Temporal.Instant.fromEpochMilliseconds(0));
	});
});

describe("parsePlainTime", () => {
	it("parses a valid ISO 8601 time string", () => {
		const result = parsePlainTime("15:30:00");
		expect(result).toEqual(Temporal.PlainTime.from("15:30:00"));
	});

	it("throws on invalid time string", () => {
		expect(() => parsePlainTime("invalid-time")).toThrow();
	});
});

describe("parseOptionalPlainTime", () => {
	it("parses a valid ISO 8601 time string", () => {
		const result = parseOptionalPlainTime("15:30:00");
		expect(result).toEqual(Temporal.PlainTime.from("15:30:00"));
	});

	it("returns undefined for null", () => {
		expect(parseOptionalPlainTime(null)).toBeUndefined();
	});

	it("returns undefined for undefined", () => {
		expect(parseOptionalPlainTime(undefined)).toBeUndefined();
	});

	it("returns undefined for empty string", () => {
		expect(parseOptionalPlainTime("")).toBeUndefined();
	});
});
