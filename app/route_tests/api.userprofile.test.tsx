import { action } from "../routes/api.userprofile"; // Update the import path

describe("Path Action /api/userprofile", () => {
	test("should update user information without bio using PUT method", async () => {
		const formData = new FormData();
		formData.append("userId", "1");
		formData.append("firstName", "test");
		formData.append("lastName", "test");
		formData.append("userEmail", "test@test.com");
		formData.append("userImage", "https://image.com");
		formData.append("profileTitle", "tester");

		const request = new Request("http://localhost:3000/api/userprofile", {
			method: "PUT",
			body: formData,
		});

		const response = await action({
			request,
			context: {},
			params: {},
		});

		const res = await response.json();

		expect(response.status).toEqual(200);
		expect(res.success).toEqual(true);
	});

	test("should update user bio using PUT method", async () => {
		const formData = new FormData();
		formData.append("userBio", "User bio text");
		formData.append("userId", "1");

		const request = new Request("http://localhost:3000/api/userprofile", {
			method: "PUT",
			body: formData,
		});

		const response = await action({
			request,
			context: {},
			params: {},
		});

		const res = await response.json();
		expect(response.status).toEqual(200);
		expect(res.success).toEqual(true);
	});

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

	test("should handle errors gracefully", async () => {
		const request = new Request("http://localhost:3000/api/userprofile", {
			method: "PATCH",
			body: new FormData(),
		});

		const response = await action({
			request,
			context: {},
			params: {},
		});

		const res = await response.json();
		expect(res.status).toEqual(500);
		expect(res.success).toEqual(false);
	});
});
