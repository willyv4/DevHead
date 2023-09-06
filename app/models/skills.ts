import { json } from "react-router";
import { db } from "~/db.server";

export class Skills {
	static async addSkill(userId: string, skill: string) {
		try {
			await db.query(
				`
        		INSERT INTO skills (user_id, skill)
       		 	VALUES ($1, $2)`,
				[userId, skill]
			);

			return { success: true };
		} catch (error) {
			return json({
				message: `Error adding skill for user with id ${userId} Error: ${error}`,
			});
		}
	}

	static async getSkillsById(userId: string) {
		try {
			const result = await db.query(
				`
        		SELECT * FROM skills
        		WHERE user_id = $1`,
				[userId]
			);

			return result.rows;
		} catch (error) {
			return json({
				message: `Error gettings skills for user with id ${userId} Error: ${error}`,
			});
		}
	}

	static async removeSkill(id: number) {
		try {
			await db.query(
				`
        		DELETE FROM skills
        		WHERE id = $1`,
				[id]
			);

			return { success: true };
		} catch (error) {
			return json({
				message: `Error removing skills for user with id ${id} Error: ${error}`,
			});
		}
	}
}
