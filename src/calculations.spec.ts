import { describe, expect, it } from "vitest";
import {
	addBusinessDays,
	endOfDay,
	endOfMonth,
	endOfWeek,
	startOfDay,
	startOfMonth,
	startOfWeek,
} from "./calculations";
import { parsePlainDate } from "./parsing";

describe("addBusinessDays", () => {
	it("should add a single business day over weekend", () => {
		const result = addBusinessDays(parsePlainDate("2022-08-05"), 1);
		expect(result.toString()).toEqual("2022-08-08");
	});
	it("should add multiple business days over weekend", () => {
		const result = addBusinessDays(parsePlainDate("2022-08-05"), 3);
		expect(result.toString()).toEqual("2022-08-10");
	});
	it("should add multiple business days over multiple weekends", () => {
		const result = addBusinessDays(parsePlainDate("2022-08-05"), 10);
		expect(result.toString()).toEqual("2022-08-19");
	});
	it("should add business days over weekdays", () => {
		const result = addBusinessDays(parsePlainDate("2022-08-03"), 2);
		expect(result.toString()).toEqual("2022-08-05");
	});
});

describe("startOfWeek", () => {
	it.each([
		["2022-08-05", "2022-08-01"],
		["2022-08-04", "2022-08-01"],
		["2022-08-03", "2022-08-01"],
		["2022-08-02", "2022-08-01"],
		["2022-08-01", "2022-08-01"],
		["2022-07-31", "2022-07-25"],
	])("should return the start of the week %p -> %p", (input, output) => {
		const result = startOfWeek(parsePlainDate(input));
		expect(result.toString()).toEqual(output);
	});
});

describe("endOfWeek", () => {
	it.each([
		["2022-08-08", "2022-08-14"],
		["2022-08-07", "2022-08-07"],
		["2022-08-06", "2022-08-07"],
		["2022-08-05", "2022-08-07"],
		["2022-08-04", "2022-08-07"],
		["2022-08-03", "2022-08-07"],
		["2022-08-02", "2022-08-07"],
		["2022-08-01", "2022-08-07"],
		["2022-07-31", "2022-07-31"],
	])("should return the end of the week %p -> %p", (input, output) => {
		const result = endOfWeek(parsePlainDate(input));
		expect(result.toString()).toEqual(output);
	});
});

describe("startOfDay", () => {
	it("should return the start of the day in UTC", () => {
		const result = startOfDay(parsePlainDate("2022-08-05"), "UTC");
		expect(result.toString()).toEqual("2022-08-05T00:00:00+00:00[UTC]");
	});

	it("should return the start of the day in a different timezone", () => {
		const result = startOfDay(parsePlainDate("2022-08-05"), "America/New_York");
		expect(result.toString()).toEqual(
			"2022-08-05T00:00:00-04:00[America/New_York]",
		);
	});
});

describe("endOfDay", () => {
	it("should return the end of the day in UTC", () => {
		const result = endOfDay(parsePlainDate("2022-08-05"), "UTC");
		expect(result.toString()).toEqual(
			"2022-08-05T23:59:59.999999999+00:00[UTC]",
		);
	});

	it("should return the end of the day in a different timezone", () => {
		const result = endOfDay(parsePlainDate("2022-08-05"), "America/New_York");
		expect(result.toString()).toEqual(
			"2022-08-05T23:59:59.999999999-04:00[America/New_York]",
		);
	});
});

describe("startOfMonth", () => {
	it.each([
		["2022-08-05", "2022-08-01"],
		["2022-08-01", "2022-08-01"],
		["2022-07-31", "2022-07-01"],
		["2022-12-15", "2022-12-01"],
		["2022-01-01", "2022-01-01"],
	])("should return the start of the month %p -> %p", (input, output) => {
		const result = startOfMonth(parsePlainDate(input));
		expect(result.toString()).toEqual(output);
	});
});

describe("endOfMonth", () => {
	it.each([
		["2022-08-05", "2022-08-31"],
		["2022-08-31", "2022-08-31"],
		["2022-07-01", "2022-07-31"],
		["2022-12-15", "2022-12-31"],
		["2022-01-01", "2022-01-31"],
		["2022-02-15", "2022-02-28"], // Non-leap year
		["2024-02-15", "2024-02-29"], // Leap year
	])("should return the end of the month %p -> %p", (input, output) => {
		const result = endOfMonth(parsePlainDate(input));
		expect(result.toString()).toEqual(output);
	});
});
