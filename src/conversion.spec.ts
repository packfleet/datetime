import { describe, expect, it } from "vitest";
import {
	instantToOptionalPlainDate,
	instantToPlainDate,
	instantToPlainDateTime,
	instantToPlainTime,
	plainDateTimeToJSDate,
	plainDateTimeToOptionalJSDate,
	plainDateToOptionalJSDate,
	toInstant,
	toJSDateUTC,
	toOptionalInstant,
	toOptionalJSDateUTC,
	toOptionalPlainDate,
	toOptionalZonedDateTimeUTC,
	toPlainDate,
	toZonedDateTimeUTC,
} from "./conversion";
import { now, nowLocal } from "./now";
import { parseInstant, parsePlainDate, parsePlainDateTime } from "./parsing";
import { mockNow } from "./test-utilities";
import { TZ_EUROPE_LONDON, TZ_UTC } from "./timezone";

describe("toJSDateUTC", () => {
	it("should have the correct UTC time when converted", () => {
		mockNow(parseInstant("2022-05-05T10:12:13Z"));
		const _now = now();
		const dateNow = toJSDateUTC(_now);
		expect(dateNow.toISOString()).toEqual("2022-05-05T10:12:13.000Z");
	});

	it("should have the correct UTC time when converted from local time", () => {
		mockNow(parseInstant("2022-05-05T10:12:13Z"));
		const now = nowLocal("Europe/London");
		const dateNow = toJSDateUTC(now);
		expect(dateNow.toISOString()).toEqual("2022-05-05T10:12:13.000Z");
	});
});

describe("instantToPlainDate", () => {
	it("should convert to the correct date the correct date", () => {
		const dateNow = instantToPlainDate(
			parseInstant("2022-05-05T22:12:13Z"),
			TZ_EUROPE_LONDON,
		);
		expect(dateNow.toString()).toEqual("2022-05-05");
	});

	it("should account for timezones", () => {
		const dateNow = instantToPlainDate(
			parseInstant("2022-05-05T22:12:13Z"),
			"Europe/Paris",
		);
		expect(dateNow.toString()).toEqual("2022-05-06");
	});
});

describe("toOptionalJSDateUTC", () => {
	it("should convert a valid Temporal.ZonedDateTime to Date", () => {
		const zdt = nowLocal("Europe/London");
		const result = toOptionalJSDateUTC(zdt);
		expect(result).toBeInstanceOf(Date);
		expect(result?.getTime()).toBe(zdt.epochMilliseconds);
	});

	it("should return undefined for null input", () => {
		expect(toOptionalJSDateUTC(null)).toBeUndefined();
	});

	it("should return undefined for undefined input", () => {
		expect(toOptionalJSDateUTC(undefined)).toBeUndefined();
	});
});

describe("toPlainDate", () => {
	it("should convert Date to PlainDate in specified timezone", () => {
		const date = new Date("2024-03-17T15:00:00Z");
		const result = toPlainDate(date, "Europe/London");
		expect(result.toString()).toBe("2024-03-17");
	});

	it("should handle date near midnight correctly", () => {
		const date = new Date("2024-03-17T23:30:00Z");
		const result = toPlainDate(date, "Asia/Tokyo");
		expect(result.toString()).toBe("2024-03-18");
	});
});

describe("toOptionalPlainDate", () => {
	it("should convert valid Date to PlainDate", () => {
		const date = new Date("2024-03-17T15:00:00Z");
		const result = toOptionalPlainDate(date, "Europe/London");
		expect(result?.toString()).toBe("2024-03-17");
	});

	it("should return undefined for null input", () => {
		expect(toOptionalPlainDate(null, "Europe/London")).toBeUndefined();
	});

	it("should return undefined for undefined input", () => {
		expect(toOptionalPlainDate(undefined, "Europe/London")).toBeUndefined();
	});
});

describe("toInstant", () => {
	it("should convert Date to Temporal.Instant", () => {
		const date = new Date("2024-03-17T15:00:00Z");
		const result = toInstant(date);
		expect(result.toString()).toBe("2024-03-17T15:00:00Z");
	});
});

describe("toOptionalInstant", () => {
	it("should convert valid Date to Temporal.Instant", () => {
		const date = new Date("2024-03-17T15:00:00Z");
		const result = toOptionalInstant(date);
		expect(result?.toString()).toBe("2024-03-17T15:00:00Z");
	});

	it("should return undefined for null input", () => {
		expect(toOptionalInstant(null)).toBeUndefined();
	});

	it("should return undefined for undefined input", () => {
		expect(toOptionalInstant(undefined)).toBeUndefined();
	});
});

describe("toZonedDateTimeUTC", () => {
	it("should convert Date to ZonedDateTime in UTC", () => {
		const date = new Date("2024-03-17T15:00:00Z");
		const result = toZonedDateTimeUTC(date);
		expect(result.timeZoneId).toBe(TZ_UTC);
		expect(result.toInstant().toString()).toBe("2024-03-17T15:00:00Z");
	});
});

describe("toOptionalZonedDateTimeUTC", () => {
	it("should convert valid Date to ZonedDateTime in UTC", () => {
		const date = new Date("2024-03-17T15:00:00Z");
		const result = toOptionalZonedDateTimeUTC(date);
		expect(result?.timeZoneId).toBe(TZ_UTC);
		expect(result?.toInstant().toString()).toBe("2024-03-17T15:00:00Z");
	});

	it("should return undefined for null input", () => {
		expect(toOptionalZonedDateTimeUTC(null)).toBeUndefined();
	});

	it("should return undefined for undefined input", () => {
		expect(toOptionalZonedDateTimeUTC(undefined)).toBeUndefined();
	});
});

describe("plainDateTimeToJSDate", () => {
	it("should convert PlainDateTime to Date", () => {
		const pdt = parsePlainDateTime("2024-03-17T15:00:00");
		const result = plainDateTimeToJSDate(pdt, "UTC");
		expect(result.toISOString()).toBe("2024-03-17T15:00:00.000Z");
	});
});

describe("plainDateToOptionalJSDate", () => {
	it("should convert valid PlainDate to Date", () => {
		const pd = parsePlainDate("2024-03-17");
		const result = plainDateToOptionalJSDate(pd, "UTC");
		expect(result?.toISOString().split("T")[0]).toBe("2024-03-17");
	});

	it("should return undefined for null input", () => {
		expect(plainDateToOptionalJSDate(null, "UTC")).toBeUndefined();
	});

	it("should return undefined for undefined input", () => {
		expect(plainDateToOptionalJSDate(undefined, "UTC")).toBeUndefined();
	});
});

describe("plainDateTimeToOptionalJSDate", () => {
	it("should convert valid PlainDateTime to Date", () => {
		const pdt = parsePlainDateTime("2024-03-17T15:00:00");
		const result = plainDateTimeToOptionalJSDate(pdt, "UTC");
		expect(result?.toISOString()).toBe("2024-03-17T15:00:00.000Z");
	});

	it("should return undefined for null input", () => {
		expect(plainDateTimeToOptionalJSDate(null, "UTC")).toBeUndefined();
	});

	it("should return undefined for undefined input", () => {
		expect(plainDateTimeToOptionalJSDate(undefined, "UTC")).toBeUndefined();
	});
});

describe("instantToOptionalPlainDate", () => {
	it("should convert valid Instant to PlainDate", () => {
		const instant = parseInstant("2024-03-17T15:00:00Z");
		const result = instantToOptionalPlainDate(instant, "UTC");
		expect(result?.toString()).toBe("2024-03-17");
	});

	it("should return undefined for null input", () => {
		expect(instantToOptionalPlainDate(null, "UTC")).toBeUndefined();
	});

	it("should return undefined for undefined input", () => {
		expect(instantToOptionalPlainDate(undefined, "UTC")).toBeUndefined();
	});
});

describe("instantToPlainDateTime", () => {
	it("should convert Instant to PlainDateTime", () => {
		const instant = parseInstant("2024-03-17T15:00:00Z");
		const result = instantToPlainDateTime(instant, "UTC");
		expect(result.toString()).toBe("2024-03-17T15:00:00");
	});

	it("should handle timezone conversion correctly", () => {
		const instant = parseInstant("2024-03-17T15:00:00Z");
		const result = instantToPlainDateTime(instant, "Asia/Tokyo");
		expect(result.toString()).toBe("2024-03-18T00:00:00");
	});
});

describe("instantToPlainTime", () => {
	it("should convert Instant to PlainTime", () => {
		const instant = parseInstant("2024-03-17T15:00:00Z");
		const result = instantToPlainTime(instant, "UTC");
		expect(result.toString()).toBe("15:00:00");
	});

	it("should handle timezone conversion correctly", () => {
		const instant = parseInstant("2024-03-17T15:00:00Z");
		const result = instantToPlainTime(instant, "Asia/Tokyo");
		expect(result.toString()).toBe("00:00:00");
	});
});
