import { db } from "../db.server";
import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "../models/_testCommon";
import { action } from "../routes/api.likes";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe("Path Action /api/likes", () => {
	test("should add a like to the database", async () => {
		const { rows: projectIds } = await db.query(`
        SELECT id FROM portfolio_posts;`);

		const formData = new FormData();
		formData.append("userId", "1");
		formData.append("projectId", projectIds[0].id);

		const request = new Request("http://localhost:3000/api/likes", {
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

	test("should remove a like from the database", async () => {
		const { rows: projectIds } = await db.query(`
        SELECT id FROM portfolio_posts;`);

		const formData = new FormData();
		formData.append("userId", "1");
		formData.append("projectId", projectIds[0].id);

		const request = new Request("http://localhost:3000/api/likes", {
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

	test("should handle an invalid method", async () => {
		const formData = new FormData();
		formData.append("likeId", "12");

		const request = new Request("http://localhost:3000/api/likes", {
			method: "PUT",
			body: formData,
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
