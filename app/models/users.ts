import db from "../db.server";

interface UserData {
	id: string;
	username: string | null;
	firstName: string | null;
	lastName: string | null;
	email: string;
	imageUrl: string;
}

export class User {
	static async getUserById(id: string) {
		const result = await db.query(
			`SELECT username, id FROM users WHERE id = $1`,
			[id]
		);
		console.log(result.rows);
		return result.rows;
	}

	static async findAll() {
		const result = await db.query(`SELECT * FROM users ORDER BY username`);
		return result.rows;
	}

	static async getUserOverviews() {
		const result = await db.query(
			`SELECT id, image_url, username, title, code_start, place, email FROM users ORDER BY username`
		);
		return result.rows;
	}

	static async addUser({
		id,
		username,
		firstName,
		lastName,
		email,
		imageUrl,
	}: UserData): Promise<UserData> {
		const duplicateCheck = await db.query(
			`SELECT username
           FROM users
           WHERE username = $1`,
			[username]
		);

		if (duplicateCheck.rows[0]) {
			throw new Error(`Duplicate username: ${username}`);
		}

		const result = await db.query(
			`INSERT INTO users
           (id,
			username,
            first_name,
            last_name,
            email,
            image_url)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING id, username, first_name AS "firstName", last_name AS "lastName", email, image_url AS "imageUrl"`,
			[id, username, firstName, lastName, email, imageUrl]
		);

		return result.rows[0];
	}

	static async remove(id: string) {
		let result = await db.query(
			`DELETE
           FROM users
           WHERE id = $1
           RETURNING id`,
			[id]
		);
		const user = result.rows[0];

		if (!user) throw new Error(`No user with id: ${id}`);
	}
}
