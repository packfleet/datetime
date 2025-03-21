import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		include: ["./src/**/*.spec.ts*", "./src/**/*.test.ts*"],
		isolate: false,
		pool: "threads",
		poolOptions: {
			threads: { singleThread: true, isolate: false },
		},
		clearMocks: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
		},
	},
});
