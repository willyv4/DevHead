const path = require("path");
const fromRoot = (d) => path.join(__dirname, d);

module.exports = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	setupFilesAfterEnv: ["./tests/jest-setup.ts"],
	moduleDirectories: ["node_modules", fromRoot("tests")],
	moduleNameMapper: {
		"~/(.*)": fromRoot("app/$1"),
		"tests/(.*)": fromRoot("tests/$1"),
	},
	transform: {
		"^.+\\.[tj]sx?$": "ts-jest",
	},
	globals: {
		"ts-jest": {
			isolatedModules: true,
		},
	},
	testEnvironment: "node",
};
