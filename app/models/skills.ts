import { db } from "../db.server";

export class Skills {
	static async addSkill(userId: string, skill: string) {
		await db.query(
			`
        		INSERT INTO skills (user_id, skill)
       		 	VALUES ($1, $2)`,
			[userId, skill]
		);
		return { success: true };
	}

	static async getSkillsById(userId: string) {
		const result = await db.query(
			`
        		SELECT * FROM skills
        		WHERE user_id = $1`,
			[userId]
		);

		return result.rows;
	}

	static async removeSkill(id: number) {
		await db.query(
			`
        		DELETE FROM skills
        		WHERE id = $1`,
			[id]
		);

		return { success: true };
	}
}
