import { Likes } from "./likes";
import Posts from "./posts";
import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "./_testCommon";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe("Likes class", () => {
	let postId: number;

	beforeAll(async () => {
		const userProjects = await Posts.getUserProjectsById("1");

		postId = userProjects[0].id || userProjects[1].id;
	});
	test("should return { success: true } when adding a like", async () => {
		const userId = "1";
		const result = await Likes.addLike(userId, postId);

		expect(result).toBeDefined();
		expect(result.success).toBe(true);
	});

	test("should return an error message when adding a like fails", async () => {
		const userId = "1";
		const result = await Likes.addLike(userId, 1);

		expect(result).toBeDefined();
		expect(result.message).toContain(
			`Error adding like with userid: ${userId}`
		);
	});

	test("should return { success: true } when removing a like", async () => {
		const userId = "1";
		const result = await Likes.removeLike(userId, postId);

		expect(result).toBeDefined();
		expect(result.success).toBe(true);
	});

	test("should return an array of liked post IDs for a user", async () => {
		const userId = "1";
		const likedPostIds = await Likes.getLikesById(userId);

		expect(Array.isArray(likedPostIds)).toBe(true);
	});
});
