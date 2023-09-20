import { loader } from "../routes/api.leetcode-users.$username";

jest.mock("../routes/api.leetcode-users.$username", () => {
	return {
		loader: jest.fn().mockResolvedValue({
			json: () => ({
				prefferedLanguage: {
					languageName: "JavaScript",
					problemsSolved: 28,
				},
				rank: 1610613,
				tags: {
					advancedTags: [],
					intermediateTags: [],
					fundamentalTags: [],
				},
				leetCodeSummary: [
					{ name: "All", solved: 28, total: 2862, successRate: 41.68 },
					{ name: "Easy", solved: 22, total: 718, successRate: 54.87 },
					{ name: "Medium", solved: 6, total: 1515, successRate: 28.49 },
					{ name: "Hard", solved: 0, total: 629, successRate: null },
				],
			}),
		}),
	};
});

describe("Loader Function get leetcode user data", () => {
	it("should fetch and return user data", async () => {
		const request = new Request(
			`http://localhost:3000/api/leetcodedata/willyv4`
		);

		const response = await loader({
			request,
			context: {},
			params: {
				username: "willyv4",
			},
		});

		const responseData = await response.json();

		expect(responseData).toBeDefined();
		expect(responseData).toHaveProperty("prefferedLanguage");
		expect(responseData.prefferedLanguage).toBeDefined();
		expect(typeof responseData.prefferedLanguage.languageName).toBe("string");
		expect(typeof responseData.prefferedLanguage.problemsSolved).toBe("number");
		expect(typeof responseData.rank).toBe("number");
		expect(responseData).toHaveProperty("tags");
		expect(responseData.tags).toBeDefined();
		expect(responseData.tags).toHaveProperty("advancedTags");
		expect(responseData.tags).toHaveProperty("intermediateTags");
		expect(responseData.tags).toHaveProperty("fundamentalTags");
		expect(responseData).toHaveProperty("leetCodeSummary");
		expect(responseData.leetCodeSummary).toBeDefined();
		expect(responseData.leetCodeSummary).toHaveLength(4);
		expect(responseData.leetCodeSummary[0]).toBeDefined();
		expect(responseData.leetCodeSummary[0]).toHaveProperty("name", "All");
		expect(responseData.leetCodeSummary[0]).toBeDefined();
		expect(typeof responseData.leetCodeSummary[0].solved).toBe("number");
		expect(responseData.leetCodeSummary[0]).toBeDefined();
		expect(typeof responseData.leetCodeSummary[0].total).toBe("number");
		expect(responseData.leetCodeSummary[0]).toBeDefined();
		expect(responseData.leetCodeSummary[0]).toHaveProperty(
			"successRate",
			41.68
		);
	});
});
