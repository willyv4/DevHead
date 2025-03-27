import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "../models/_testCommon";
import { loader } from "../routes/posts";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe("Path loader /posts", () => {
	test("should load comments according to user id", async () => {
		const request = new Request(`http://localhost:3000/posts`, {
			method: "GET",
		});

		const response = await loader({
			request,
			context: {},
			params: {},
		});

		const res = await response;

		expect(Array.isArray(res)).toBe(true);
		expect(res.length).toBe(5);
	});
});
