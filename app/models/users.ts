import { json } from "@remix-run/node";
import db from "../db.server";

type UserData = {
	id: string;
	code_start: string | null;
	firstName: string | null;
	lastName: string | null;
	place: string | null;
	imageUrl: string;
	username: string;
	githubUsername: string | null;
	leetcodeUsername: string | null;
	email: string;
	title: string | null;
	about: string | null;
	skills: string | null;
	followers: string[] | null;
	following: string[] | null;
};

export class User {
	static async getUserById(id: string) {
		const result = await db.query(
			`SELECT username, id FROM users WHERE id = $1`,
			[id]
		);
		return result.rows;
	}

	static async getUserProfileById(id: string) {
		const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
		return result.rows;
	}

	static async findAll() {
		const result = await db.query(`SELECT * FROM users ORDER BY username`);
		return result.rows;
	}

	static async getUserOverviews() {
		const result = await db.query(
			`SELECT id, image_url, first_name, last_name, title, code_start, place, email FROM users ORDER BY first_name`
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

	static async connectLeetcode(id: string, leetcodeUsername: string | null) {
		if (!leetcodeUsername) return json({ update: false });

		await db.query(
			`
        UPDATE users
        SET leetcode_username = $2
        WHERE id = $1`,
			[id, leetcodeUsername]
		);

		return json({ success: true });
	}

	static async connectGithub(id: string, githubUsername: string | null) {
		if (!githubUsername) return json({ update: false });

		await db.query(
			`
        UPDATE users
        SET github_username = $2
        WHERE id = $1`,
			[id, githubUsername]
		);

		return json({ success: true });
	}

	static async addUserTitle(id: string, userTitle: string | null) {
		if (!userTitle) return json({ update: false });

		await db.query(
			`
        UPDATE users
        SET title = $2
        WHERE id = $1`,
			[id, userTitle]
		);

		return json({ success: true });
	}

	static async addUserBio(id: string, userBio: string | null) {
		if (!userBio) return json({ update: false });

		await db.query(
			`
        UPDATE users
        SET about = $2
        WHERE id = $1`,
			[id, userBio]
		);

		return json({ success: true });
	}

	static async remove(id: string | null) {
		let result = await db.query(
			`DELETE
           FROM users
           WHERE id = $1
           RETURNING id, username`,
			[id]
		);
		const user = result.rows[0];

		if (!user) throw new Error(`No user with id: ${id}`);

		return json({ deleted: true });
	}

	static async getUserProjectsById(id: string | null) {
		const result = await db.query(
			`SELECT * FROM portfolio_posts WHERE user_id = $1`,
			[id]
		);

		// console.log(result);
		return result.rows;
	}
}
