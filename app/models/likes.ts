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

		return { success: true };
	}

	static async removeLike(userId: string, projectId: number) {
		await db.query(`DELETE FROM likes WHERE user_id = $1 AND post_id = $2`, [
			userId,
			projectId,
		]);

		return { success: true };
	}

	static async getLikesById(userId: string) {
		const res = await db.query(`SELECT post_id FROM likes WHERE user_id = $1`, [
			userId,
		]);

		console.log(res.rows);
		const arr = res.rows.map((row: any) => row.post_id);
		console.log(arr);

		return arr;
	}
}
