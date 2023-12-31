import { db } from "../db.server";
import type { Comment } from "../types";

interface CommentsRespose {
	comments: Comment[];
}

function isCommentsResponse(data: any): data is CommentsRespose {
	return "comments" in data &&
		Array.isArray(data.comments) &&
		"comment_id" in data.comments[0]
		? true
		: false;
}

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

	static async getCommentsByPostId(postId: number) {
		const res = await db.query(
			`SELECT json_agg(
    			json_build_object(
        			'comment_id', pc.id,
        			'author_first_name', u.first_name,
        			'author_last_name', u.last_name,
        			'author_image_url', u.image_url,
        			'comment', pc.comment,
        			'user_id', pc.user_id
    						)
						) AS comments
					FROM portfolio_comments pc
					JOIN users u ON pc.user_id = u.id
					WHERE pc.post_id = $1;`,
			[postId]
		);
		let data = res.rows[0];
		if (isCommentsResponse(data)) {
			return data;
		}
		return { comments: [] };
	}

	static async deleteComment(commentId: number) {
		await db.query(`DELETE FROM portfolio_comments WHERE id = $1`, [commentId]);

		return { success: true };
	}
}
