import { db } from "../db.server";
import type { UserOverviews } from "../types";

interface UserResp {
	users: UserOverviews[];
}

function isUser(data: any): data is UserResp {
	return "users" in data && Array.isArray(data.users) ? true : false;
}

export class User {
	static async getUserById(id: string) {
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
	}

	static async getUserProfileById(id: string) {
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

		if (!user) {
			return {
				message: `Error getting user Profile with id: ${id}`,
				status: 500,
			};
		}

		return user;
	}

	static async getUserOverviews() {
		// const result = await db.query(`
		// 		SELECT
		//     		u.*,
		//     		ARRAY_AGG(DISTINCT f1.user_following_id) AS following,
		//     		ARRAY_AGG(DISTINCT f2.user_being_followed_id) AS followers
		// 		FROM users u
		// 		LEFT JOIN follows f1 ON u.id = f1.user_being_followed_id
		// 		LEFT JOIN follows f2 ON u.id = f2.user_following_id
		// 		GROUP BY u.id`);

		const result = await db.query(`
			SELECT
    			u.id,
    			u.first_name,
    			u.last_name,
    			u.place,
    			u.image_url,
    			u.email,
    			u.title,
    			u.about,
    			u.leetcode_username,
    			u.github_username,
    		ARRAY_AGG(DISTINCT f1.user_following_id) AS following,
    		ARRAY_AGG(DISTINCT f2.user_being_followed_id) AS followers
			FROM users u
				LEFT JOIN follows f1 ON u.id = f1.user_being_followed_id
				LEFT JOIN follows f2 ON u.id = f2.user_following_id
			WHERE
    			u.about IS NOT NULL
    			AND (u.github_username IS NOT NULL OR u.leetcode_username IS NOT NULL)
    			AND EXISTS (
        			SELECT 1
        			FROM portfolio_posts pp
        			WHERE pp.user_id = u.id
    			)
    			AND EXISTS (
        			SELECT 1
        			FROM skills s
        			WHERE s.user_id = u.id
    			)
			GROUP BY
    			u.id,
    			u.first_name,
    			u.last_name,
    			u.place,
    			u.image_url,
    			u.email,
    			u.title,
    			u.about,
    			u.leetcode_username,
    			u.github_username;`);

		let users = result.rows;

		if (isUser({ users })) {
			return { users };
		}
		return { users: [] };
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
     		RETURNING id, first_name AS "firstName", last_name AS "lastName", email, image_url AS "imageUrl", title`,
			[id, firstName, lastName, email, imageUrl, title]
		);

		if (result.rows.length === 0) {
			return { message: `User with id ${id} not found`, status: 500 };
		}

		return result.rows[0];
	}

	static async connectLeetcode(id: string, leetcodeUsername: string | null) {
		if (!leetcodeUsername) return { success: false };

		await db.query(
			`
       		UPDATE users
        	SET leetcode_username = $2
        	WHERE id = $1`,
			[id, leetcodeUsername]
		);

		return { success: true };
	}

	static async connectGithub(id: string, githubUsername: string | null) {
		if (!githubUsername) return { success: false };

		await db.query(
			`
        	UPDATE users
        	SET github_username = $2
        	WHERE id = $1`,
			[id, githubUsername]
		);

		return { success: true };
	}

	static async addUserBio(id: string, userBio: string | null) {
		if (!userBio) return { success: false };

		await db.query(
			`
        	UPDATE users
        	SET about = $2
    		WHERE id = $1`,
			[id, userBio]
		);

		return { success: true };
	}

	static async remove(id: string) {
		let result = await db.query(
			`DELETE FROM users WHERE id = $1 RETURNING id`,
			[id]
		);

		const user = result.rows[0];
		if (!user) return { deleted: false, message: `No user with id: ${id}` };

		return { deleted: true };
	}
}
