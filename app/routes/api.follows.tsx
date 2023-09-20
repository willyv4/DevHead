import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Follows } from "../models/follows";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const { userId, userBeingFollowed } = Object.fromEntries(formData);

	if (request.method === "POST") {
		await Follows.addFollow(userId.toString(), userBeingFollowed.toString());
		return json({ success: true, status: 201 });
	}

	if (request.method === "DELETE") {
		await Follows.removeFollow(userId.toString(), userBeingFollowed.toString());
		return json({ success: true, status: 200 });
	}

	return json({ success: false, status: 500 });
};
