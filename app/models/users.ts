import db from "../db.server";

export class User {
	static async findAll() {
		const result = await db.query(`SELECT * FROM users ORDER BY username`);
		return result.rows;
	}

	static async getUserOverviews() {
		const result = await db.query(
			`SELECT id, image_url, username, title, code_start, place FROM users ORDER BY username`
		);
		return result.rows;
	}
}
