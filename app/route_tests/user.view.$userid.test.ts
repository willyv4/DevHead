import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "../models/_testCommon";
import { loader } from "../routes/user.view.$userid";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe("Path loader /user.view.$userid", () => {
	test("should load comments according to user id", async () => {
		const request = new Request(`http://localhost:3000/user/view/1`, {
			method: "GET",
		});

		const response = await loader({
			request,
			context: {},
			params: { userid: "1" },
		});

		const res = await response;

		expect(res.userProjects.length).toEqual(1);
		expect(res.userSkills.length).toEqual(2);
		expect(res.userProfile.id).toEqual("1");
		expect(res.userProfile.first_name).toEqual("John");
		expect(res.userProfile.last_name).toEqual("Doe");
		expect(res.userProfile.place).toEqual("UT");
		expect(typeof res.userProfile.image_url).toBe("string");
		expect(typeof res.userProfile.title).toBe("string");
		expect(typeof res.userProfile.about).toBe("string");
		expect(typeof res.userProfile.email).toBe("string");
		expect(res.userProfile.followers.length).toEqual(1);
		expect(res.userProfile.following.length).toEqual(3);
	});
});
