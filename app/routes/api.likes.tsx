import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json } from "react-router";
import { Likes } from "~/models/likes";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	const formData = await request.formData();
	const { userId, projectId } = Object.fromEntries(formData);

	if (request.method === "DELETE") {
		await Likes.removeLike(userId.toString(), Number(projectId));
		return json({ success: true });
	}

	if (request.method === "POST") {
		await Likes.addLike(userId.toString(), Number(projectId));
		return json({ success: true });
	}

	return json({ success: false });
};
