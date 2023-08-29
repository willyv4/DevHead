import { json } from "@remix-run/node";
import db from "~/db.server";

// type UserProjects = {
// 	id: string;
// 	image_url: string;
// 	title: string;
// 	code_link: string;
// 	live_link: string;
// 	like_count: string[] | null;
// };

export class Projects {
	static async getUserProjectsById(id: string | null) {
		const result = await db.query(
			`SELECT * FROM portfolio_posts WHERE user_id = $1`,
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

	static async deleteProjectById(id: string) {
		await db.query(
			`DELETE
            FROM portfolio_posts
            WHERE id = $1`,
			[id]
		);

		return json({ deleted: true });
	}
}
