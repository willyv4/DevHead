import { action } from "../routes/api.likes";
import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "../models/_testCommon";
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe("Path Action /api/follows", () => {
	test("should add a follow relationship", async () => {
		const formData = new FormData();
		formData.append("userId", "1");
		formData.append("userBeingFollowed", "2");

		const request = new Request("http://localhost:3000/api/follows", {
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

	test("should remove a follow relationship", async () => {
		const formData = new FormData();
		formData.append("userId", "1");
		formData.append("userBeingFollowed", "2");

		const request = new Request("http://localhost:3000/api/follows", {
			method: "DELETE",
			body: formData,
		});

		const response = await action({
			request,
			context: {},
			params: {},
		});

		const res = await response.json();
		expect(res.status).toEqual(200);
		expect(res.success).toEqual(true);
	});

	// test("should handle an invalid method", async () => {
	// 	const formData = new FormData();
	// 	formData.append("userId", "1");
	// 	formData.append("userBeingFollowed", "2");

	// 	const request = new Request("http://localhost:3000/api/follows", {
	// 		method: "PUT",
	// 		body: formData,
	// 	});

	// 	const response = await action({
	// 		request,
	// 		context: {},
	// 		params: {},
	// 	});

	// 	expect(await response.json()).toEqual({ success: false, status: 500 });
	// });
});
