import { db } from "../db.server";
import { action } from "../routes/api.skills";
import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "../models/_testCommon";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe("Path Action /api/skills", () => {
	test("should remove a like from the database", async () => {
		const formData = new FormData();
		formData.append("userId", "1");
		formData.append("skill", "sk8ting");

		const request = new Request("http://localhost:3000/api/skills", {
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
		const { rows: skillId } = await db.query(`
        SELECT id FROM skills where skill = 'sk8ting';`);

		const formData = new FormData();
		formData.append("skillId", skillId[0].id);
		const request = new Request("http://localhost:3000/api/skills", {
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
