import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "../models/_testCommon";
import { loader } from "../routes/users";
import { action } from "../routes/api.userprofile";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe("Path loader /user", () => {
	test("should connect GitHub username using POST method", async () => {
		// Create a mock request with GitHub username and userId
		const formData = new FormData();
		formData.append("githubUsername", "githubuser");
		formData.append("userId", "1");

		const request = new Request("http://localhost:3000/api/userprofile", {
			method: "POST",
			body: formData,
		});

		const response = await action({
			request,
			context: {},
			params: {},
		});

		const res = await response.json();
		expect(res.status).toEqual(201);
		expect(res.success).toEqual(true);
	});

	test("should connect LeetCode username using POST method", async () => {
		const formData = new FormData();
		formData.append("leetcodeUsername", "leetcodeuser");
		formData.append("userId", "1");

		const request = new Request("http://localhost:3000/api/userprofile", {
			method: "POST",
			body: formData,
		});

		const response = await action({
			request,
			context: {},
			params: {},
		});

		const res = await response.json();
		expect(res.status).toEqual(201);
		expect(res.success).toEqual(true);
	});

	//only one users profile is complete aftr the tests above
	test("should load users", async () => {
		const request = new Request(`http://localhost:3000/users`, {
			method: "GET",
		});

		const response = await loader({
			request,
			context: {},
			params: {},
		});

		const res = await response.json();

		expect(res.users.length).toEqual(1);
		expect(typeof res.users[0].id).toBe("string");
		expect(typeof res.users[0].first_name).toBe("string");
		expect(typeof res.users[0].last_name).toBe("string");
		expect(typeof res.users[0].place).toBe("string");
		expect(typeof res.users[0].image_url).toBe("string");
		expect(typeof res.users[0].email).toBe("string");
		expect(typeof res.users[0].title).toBe("string");
		expect(typeof res.users[0].about).toBe("string");
		expect(Array.isArray(res.users[0].followers)).toBe(true);
		expect(Array.isArray(res.users[0].following)).toBe(true);
	});
});
