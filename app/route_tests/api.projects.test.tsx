import { db } from "../db.server";
import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "../models/_testCommon";
import { action } from "../routes/api.projects";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe("Path Action /api/projects", () => {
	test("should update a project with PUT method", async () => {
		const { rows: projectIds } = await db.query(`
        SELECT id FROM portfolio_posts;`);

		const formData = new FormData();
		formData.append("userId", "1");
		formData.append("projectImage", "image-url");
		formData.append("projectTitle", "New Project Title");
		formData.append("projectLiveLink", "live-link-url");
		formData.append("projectCodeLink", "code-link-url");
		formData.append("projectId", projectIds[0].id);

		const request = new Request("http://localhost:3000/api/projects", {
			method: "PUT",
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

	test("should remove a like from the database", async () => {
		const formData = new FormData();
		formData.append("userId", "1");
		formData.append("projectImage", "image-url");
		formData.append("projectTitle", "New Project Title");
		formData.append("projectLiveLink", "live-link-url");
		formData.append("projectCodeLink", "code-link-url");

		const request = new Request("http://localhost:3000/api/projects", {
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

	test("should handle an invalid method", async () => {
		const { rows: projectIds } = await db.query(`
        SELECT id FROM portfolio_posts;`);

		const formData = new FormData();
		formData.append("projectId", projectIds[0].id);
		const request = new Request("http://localhost:3000/api/projects", {
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
});
