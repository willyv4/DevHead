import { json } from "@remix-run/node";
import { db } from "../db.server";

export class User {
	static async getUserById(id: string) {
		try {
			const result = await db.query(
				`SELECT id, image_url FROM users WHERE id = $1`,
				[id]
			);

			if (!result.rows[0]) {
				return {
					message: `Error getting user with id: ${id}}`,
				};
			}

			return result.rows[0];
		} catch (error) {
			return {
				message: `Error getting user with id: ${id}, ERROR: ${error}`,
			};
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

			console.log("USSER", user);

			if (!user) {
				return {
					message: `Error getting user Profile with id: ${id}`,
					status: 500,
				};
			}

			return user;
		} catch (error) {
			return {
				message: `Error getting user Profile with id: ${id}, ERROR: ${error}`,
				status: 500,
			};
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

	static async addUser(
		id: string,
		firstName: string | null,
		lastName: string | null,
		email: string,
		imageUrl: string | null
	) {
		const duplicateCheck = await db.query(
			`SELECT id FROM users WHERE id = $1`,
			[id]
		);

		if (duplicateCheck.rows[0]) {
			return duplicateCheck.rows[0];
		}

		const result = await db.query(
			`INSERT INTO users
           		(id,
            	first_name,
            	last_name,
            	email,
            	image_url)
           		VALUES ($1, $2, $3, $4, $5)
           		RETURNING id, first_name AS "firstName", last_name AS "lastName", email, image_url AS "imageUrl"`,
			[id, firstName, lastName, email, imageUrl]
		);

		return result.rows[0];
	}

	static async updateUser(
		id: string,
		firstName: string,
		lastName: string,
		email: string,
		imageUrl: string,
		title: string
	) {
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

	static async remove(id: string) {
		let result = await db.query(
			`DELETE FROM users WHERE id = $1 RETURNING id`,
			[id]
		);

		const user = result.rows[0];
		if (!user) throw new Error(`No user with id: ${id}`);

		return json({ deleted: true });
	}
}
