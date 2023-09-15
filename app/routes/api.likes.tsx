import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json } from "react-router";
import { Likes } from "~/models/likes";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	try {
		const formData = await request.formData();
		const { userId, projectId } = Object.fromEntries(formData);

		if (request.method === "DELETE") {
			await Likes.removeLike(userId.toString(), Number(projectId));
			return json({ success: true, status: 200 });
		}

		if (request.method === "POST") {
			await Likes.addLike(userId.toString(), Number(projectId));
			return json({ success: true, status: 201 });
		}
	} catch (error) {
		return json({ success: false, status: 500, error: error });
	}
};
