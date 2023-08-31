import db from "~/db.server";

export class Comments {
	static async addComment(userId: string, postId: number, comment: string) {
		await db.query(
			`
      	INSERT INTO portfolio_comments (post_id, user_id, comment)
      	VALUES ($1, $2, $3)
      	`,
			[postId, userId, comment]
		);

		return { success: true };
	}

	static async getCommentByPost(postId: number) {
		await db.query(
			`
      		SELECT * FROM portfolio_comments WHERE post_id = $1
			`,
			[postId]
		);

		return { success: true };
	}

	static async deleteComment(commentId: number) {
		await db.query(
			`
        DELETE FROM portfolio_comments WHERE id = $1
        `,
			[commentId]
		);

		return { success: true };
	}
}
