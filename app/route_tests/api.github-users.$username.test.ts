import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "../models/_testCommon";
import { loader } from "../routes/api.github-users.$username";

jest.mock("../routes/api.github-users.$username", () => ({
	loader: jest.fn(async () => {
		const mockResponse = {
			stats: [
				{ name: "Contributions this year", value: 639 },
				{ name: "Average Weekly Contributions", value: "12.3" },
				{ name: "Public Repositories", value: 97 },
			],
			language: ["Python", "JavaScript", "HTML"],
		};

		return Promise.resolve(mockResponse);
	}),
}));

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe("Loader Function", () => {
	it("should fetch and return user data", async () => {
		const request = new Request(
			`http://localhost:3000/api/github-users/willyv4`
		);

		const response = await loader({
			request,
			context: {},
			params: {
				username: "willyv4",
			},
		});

		expect(response).toHaveProperty("stats");
		expect(response).toHaveProperty("language");
	});
});
