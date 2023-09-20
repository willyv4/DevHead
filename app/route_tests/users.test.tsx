import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "../models/_testCommon";
import { loader } from "../routes/users";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe("Path loader /user", () => {
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

		expect(res.users.length).toEqual(5);
		expect(typeof res.users[0].id).toBe("string");
		expect(typeof res.users[0].first_name).toBe("string");
		expect(typeof res.users[0].last_name).toBe("string");
		expect(typeof res.users[0].place).toBe("string");
		expect(typeof res.users[0].image_url).toBe("string");
		expect(typeof res.users[0].email).toBe("string");
		expect(typeof res.users[0].title).toBe("string");
		expect(typeof res.users[0].about).toBe("string");
		expect(Array.isArray(res.users[0].followers)).toBe(true); // Check if it's an array
		expect(Array.isArray(res.users[0].following)).toBe(true);
	});
});
