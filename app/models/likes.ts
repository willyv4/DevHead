import { json } from "react-router";
import { db } from "~/db.server";

export class Likes {
	static async addLike(userId: string, postId: number) {
		try {
			await db.query(
				`
      			INSERT INTO likes (post_id, user_id)
      			VALUES ($1, $2)`,
				[postId, userId]
			);

			return json({ success: true });
		} catch (error) {
			return json({
				message: `Error adding like with userid: ${userId} and postId: ${postId} ERROR: ${error}`,
			});
		}
	}

	static async removeLike(userId: string, projectId: number) {
		try {
			await db.query(`DELETE FROM likes WHERE user_id = $1 AND post_id = $2`, [
				userId,
				projectId,
			]);

			return { success: true };
		} catch (error) {
			return json({
				message: `Error removing like with userid: ${userId} and postId: ${projectId} ERROR: ${error}`,
			});
		}
	}

	static async getLikesById(userId: string) {
		try {
			const res = await db.query(
				`SELECT post_id FROM likes WHERE user_id = $1`,
				[userId]
			);

			const arr = res.rows.map((row: any) => row.post_id);

			return arr;
		} catch (error) {
			return json({
				message: `Error getting likes with userid: ${userId} ERROR: ${error}`,
			});
		}
	}
}
