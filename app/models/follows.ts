import { json } from "react-router";
import { db } from "~/db.server";

export class Follows {
	static async addFollow(userId: string, followedUser: string) {
		try {
			await db.query(
				`INSERT INTO follows (user_being_followed_id, user_following_id) VALUES ($1, $2)`,
				[userId, followedUser]
			);

			return json({ success: true });
		} catch (error) {
			return json({
				message: `Error adding follow with userid (the user that is being followed): ${userId} followeduser (user follwing userid): ${followedUser} error: ${error}`,
			});
		}
	}

	static async removeFollow(userId: string, followedUser: string) {
		try {
			await db.query(
				`DELETE FROM follows WHERE user_being_followed_id = $2 AND user_following_id = $1`,
				[followedUser, userId]
			);

			return json({ success: true });
		} catch (error) {
			return json({
				message: `Error removing follow with userid (the user that is being followed): ${userId} followeduser (user follwing userid): ${followedUser} error: ${error}`,
			});
		}
	}
}
