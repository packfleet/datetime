import { Temporal } from "@js-temporal/polyfill";
import { type MockInstance, vi } from "vitest";

let spy: MockInstance;

export function mockNow(instant: Temporal.Instant) {
	spy = vi.spyOn(Temporal.Now, "instant").mockImplementation(() => instant);
}

export function unmockNow() {
	spy.mockClear();
}
