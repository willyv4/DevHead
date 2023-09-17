import { db } from "../db.server";

export class Follows {
	static async addFollow(userId: string, followedUser: string) {
		await db.query(
			`INSERT INTO follows (user_being_followed_id, user_following_id) VALUES ($1, $2)`,
			[userId, followedUser]
		);

		return { success: true };
	}

	static async removeFollow(userId: string, followedUser: string) {
		await db.query(
			`DELETE FROM follows WHERE user_being_followed_id = $2 AND user_following_id = $1`,
			[followedUser, userId]
		);

		return { success: true };
	}
}
