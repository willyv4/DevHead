import db from "~/db.server";

export class Likes {
	static async addLike(userId: string, postId: number) {
		await db.query(
			`
      	INSERT INTO likes (post_id, user_id)
      	VALUES ($1, $2)
      	`,
			[postId, userId]
		);

		await db.query(
			`
      	UPDATE portfolio_posts
      	SET like_count = like_count + 1
      	WHERE id = $1
      	`,
			[postId]
		);

		return { success: true };
	}

	static async removeLike(userId: string, projectId: number) {
		await db.query(`DELETE FROM likes WHERE user_id = $1 AND post_id = $2`, [
			userId,
			projectId,
		]);

		await db.query(
			`
    		UPDATE portfolio_posts
    		SET like_count = like_count - 1
    		WHERE id = $1
    		`,
			[projectId]
		);

		return { success: true };
	}

	static async getLikesById(userId: string) {
		const res = await db.query(`SELECT post_id FROM likes WHERE user_id = $1`, [
			userId,
		]);

		const arr = res.rows.map((row: any) => row.post_id);

		return arr;
	}
}
