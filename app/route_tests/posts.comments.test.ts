import { loader } from "../routes/posts.comments.$id";
import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "../models/_testCommon";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe("Path loader /posts/comments", () => {
	test("should load comments according to user id", async () => {
		const request = new Request(`http://localhost:3000/posts/${"1"}`, {
			method: "GET",
		});

		const response = await loader({
			request,
			context: {},
			params: { id: "1" },
		});

		const res = await response.json();
		expect(Array.isArray(res["comments"])).toBe(true);
	});
});
