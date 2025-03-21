import { describe, expect, it } from "vitest";
import { TZ, isTimeZoneSupported } from "./index";

describe("TZ", () => {
	it.each(Object.entries(TZ))(
		"%s should be a supported timezone",
		(key, value) => {
			if (typeof value !== "string") return;
			expect(isTimeZoneSupported(value)).toEqual(true);
		},
	);
});
