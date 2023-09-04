import { json } from "@remix-run/node";
import db from "~/db.server";

export default class Posts {
	static async getUserProjectsById(id: string | null) {
		const result = await db.query(
			`
    		SELECT pp.*,
    			COUNT(pc.id) AS comment_count,
    			ARRAY(
        			SELECT user_id
        			FROM likes
        			WHERE post_id = pp.id
    			) AS liked_user_ids
			FROM portfolio_posts pp
			LEFT JOIN portfolio_comments pc ON pp.id = pc.post_id
			LEFT JOIN users u ON pc.user_id = u.id
			WHERE pp.user_id = $1
			GROUP BY pp.id
			ORDER BY pp.id ASC;
    	`,
			[id]
		);

		return result.rows;
	}

	static async addUserProject(
		userId: string,
		projectImage: string,
		projectTitle: string,
		projectLiveLink: string,
		projectCodeLink: string
	) {
		await db.query(
			`INSERT INTO portfolio_posts
     			(user_id, image_url, title, code_link, live_link)
     			VALUES ($1, $2, $3, $4, $5)`,
			[userId, projectImage, projectTitle, projectLiveLink, projectCodeLink]
		);

		return json({ success: true });
	}

	static async updateUserProject(
		projectId: number,
		userId: string,
		projectImage: string,
		projectTitle: string,
		projectCodeLink: string,
		projectLiveLink: string
	) {
		await db.query(
			`UPDATE portfolio_posts
     		SET user_id = $2,
         	image_url = $3,
         	title = $4,
         	code_link = $5,
         	live_link = $6
     		WHERE id = $1`,
			[
				projectId,
				userId,
				projectImage,
				projectTitle,
				projectCodeLink,
				projectLiveLink,
			]
		);

		return { success: true };
	}

	static async deleteProjectById(id: number) {
		await db.query(
			`DELETE
            FROM portfolio_posts
            WHERE id = $1`,
			[id]
		);

		return json({ deleted: true });
	}

	static async getAllUserProjects() {
		const result = await db.query(
			`
        SELECT
            pp.*,
            u.first_name AS author_first_name,
            u.last_name AS author_last_name,
			COUNT(pc.id) AS comment_count,
            ARRAY(
	            SELECT user_id
	            FROM likes
	            WHERE post_id = pp.id
	        ) AS liked_user_ids
        FROM portfolio_posts pp
        LEFT JOIN portfolio_comments pc ON pp.id = pc.post_id
        LEFT JOIN users u ON pp.user_id = u.id
        GROUP BY pp.id, author_first_name, author_last_name
        ORDER BY (SELECT COUNT(user_id) FROM likes WHERE post_id = pp.id) DESC;
        `
		);

		return result.rows;
	}
}
