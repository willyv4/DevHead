import { json } from "react-router";
import { db } from "~/db.server";

export class Comments {
	static async addComment(userId: string, postId: number, comment: string) {
		try {
			await db.query(
				`
      			INSERT INTO portfolio_comments (post_id, user_id, comment)
      			VALUES ($1, $2, $3)
      			`,
				[postId, userId, comment]
			);

			return json({ success: true });
		} catch (error) {
			return json({
				message: `Unable to add comment with userId: ${userId} postId: ${postId} Error: ${error}`,
			});
		}
	}

	static async getCommentsByPostId(postId: number) {
		try {
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
			return res.rows[0];
		} catch (error) {
			return [];
		}
	}

	static async deleteComment(commentId: number) {
		try {
			await db.query(`DELETE FROM portfolio_comments WHERE id = $1`, [
				commentId,
			]);

			return { success: true };
		} catch (error) {
			return json({
				message: `Error deleting comment with commentId: ${commentId} Error: ${error}`,
			});
		}
	}
}
