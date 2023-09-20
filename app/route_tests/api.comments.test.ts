import { db } from "../db.server";
import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "../models/_testCommon";
import { action } from "../routes/api.comments";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe("Path Action /api/comments", () => {
	test("should add comment to db", async () => {
		const { rows: postIds } = await db.query(`
        SELECT id FROM portfolio_posts;`);

		const formData = new FormData();
		formData.append("userId", "1");
		formData.append("projectId", postIds[0].id);
		formData.append("comment", "hello world");

		const request = new Request("http://localhost:3000/api/comments", {
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

	test("should delete a comment from the database", async () => {
		const { rows: commentId } = await db.query(`
        SELECT id FROM portfolio_comments;`);

		const formData = new FormData();
		formData.append("commentId", commentId[0].id);

		const request = new Request("http://localhost:3000/api/comments", {
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
	test("should handle a invalid method", async () => {
		const formData = new FormData();
		formData.append("commentId", "123");

		const request = new Request("http://localhost:3000/api/comments", {
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
