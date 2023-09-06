import { json } from "@remix-run/node";
import { db } from "../db.server";

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
		if (!id) return null;

		try {
			const result = await db.query(
				`SELECT username, id, image_url FROM users WHERE id = $1`,
				[id]
			);

			return result.rows;
		} catch (error) {
			return json({
				message: `Error getting user with id: ${id}, ERROR: ${error}`,
			});
		}
	}

	static async getUserProfileById(id: string) {
		try {
			const result = await db.query(
				`
        		SELECT 
           			u.*,
            		array_agg(DISTINCT f1.user_following_id) AS following,
            		array_agg(DISTINCT f2.user_being_followed_id) AS followers
        		FROM users u
        		LEFT JOIN follows f1 ON u.id = f1.user_being_followed_id
        		LEFT JOIN follows f2 ON u.id = f2.user_following_id
        		WHERE u.id = $1
        		GROUP BY u.id`,
				[id]
			);

			const user = result.rows[0];
			return user;
		} catch (error) {
			return json({
				message: `Error getting user Profile with id: ${id}, ERROR: ${error}`,
			});
		}
	}

	static async findAll() {
		try {
			const result = await db.query(`SELECT * FROM users ORDER BY username`);
			return result.rows;
		} catch (error) {
			return json({
				message: `Error getting users ERROR: ${error}`,
			});
		}
	}

	static async getUserOverviews() {
		try {
			const result = await db.query(`
        		SELECT 
            		u.*,
            		ARRAY_AGG(DISTINCT f1.user_following_id) AS following,
            		ARRAY_AGG(DISTINCT f2.user_being_followed_id) AS followers
        		FROM users u
        		LEFT JOIN follows f1 ON u.id = f1.user_being_followed_id
        		LEFT JOIN follows f2 ON u.id = f2.user_following_id
        		GROUP BY u.id`);

			return result.rows;
		} catch (error) {
			return json({
				message: `Error getting users overview ERROR: ${error}`,
			});
		}
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
			`SELECT username FROM users WHERE username = $1`,
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

		return result.rows[0] as unknown as UserData;
	}

	static async updateUser(userData: UserData): Promise<UserData> {
		const { id, firstName, lastName, email, imageUrl, title } = userData;
		const result = await db.query(
			`UPDATE users
     		SET first_name = $2, last_name = $3, email = $4, image_url = $5, title = $6
     		WHERE id = $1
     		RETURNING id, first_name AS "firstName", last_name AS "lastName", email, image_url AS "imageUrl"`,
			[id, firstName, lastName, email, imageUrl, title]
		);

		if (result.rows.length === 0) {
			throw new Error(`User with id ${id} not found`);
		}

		return result.rows[0] as unknown as UserData;
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
			`DELETE FROM users WHERE id = $1 RETURNING id, username`,
			[id]
		);

		const user = result.rows[0];
		if (!user) throw new Error(`No user with id: ${id}`);

		return json({ deleted: true });
	}
}
