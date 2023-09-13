import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json } from "react-router";
import { Comments } from "~/models/comments";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	const formData = await request.formData();
	const { userId, projectId, comment, commentId } =
		Object.fromEntries(formData);

	if (request.method === "POST") {
		await Comments.addComment(
			userId.toString(),
			Number(projectId),
			comment.toString()
		);
		return json({ success: true });
	}

	if (request.method === "DELETE") {
		await Comments.deleteComment(Number(commentId));
		return json({ success: true });
	}

	return json({ success: false });
};
