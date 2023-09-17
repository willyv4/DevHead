import { Comments } from "./comments";
import Posts from "./posts";

let postId: number;

beforeAll(async () => {
	const userProjects = await Posts.getUserProjectsById("1");

	console.log(userProjects);
	postId = userProjects[0].id || userProjects[1].id;
});

describe("Comments.addComment", () => {
	test("should return { success: true } when adding a comment", async () => {
		const userId = "1";
		const comment = "This is a test comment";

		const result = await Comments.addComment(userId, postId, comment);

		expect(result).toBeDefined();
		expect(result.success).toBe(true);
	});
});

describe("Comments.getCommentsByPostId", () => {
	test("should return an array of comments when getting comments by post id", async () => {
		if (!postId) {
			return;
		}

		const result = await Comments.getCommentsByPostId(postId);

		expect(result).toBeDefined();
		expect(result.comments).toBeInstanceOf(Array);
	});
});

describe("Comments.deleteComment", () => {
	test("should return { success: true } when deleting a comment", async () => {
		if (!postId) {
			return;
		}

		const userId = "1";
		const comment = "This is a test comment";
		await Comments.addComment(userId, postId, comment);

		const commentsByPostId = await Comments.getCommentsByPostId(postId);
		if (commentsByPostId.comments.length === 0) {
			return;
		}
		const commentId = commentsByPostId.comments[0].comment_id;

		const deleteResult = await Comments.deleteComment(commentId);

		expect(deleteResult).toBeDefined();
		expect(deleteResult.success).toBe(true);
	});
});
