import db from "../db.server";

export class User {
	static async findAll() {
		const result = await db.query(`SELECT * FROM users ORDER BY username`);

		return result.rows;
	}
}
