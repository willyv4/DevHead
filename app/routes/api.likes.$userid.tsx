import type { ActionArgs, ActionFunction } from "@vercel/remix";
import { Likes } from "~/models/likes";

export const loader: ActionFunction = async ({ params }: ActionArgs) => {
	const userId = params.userid;

	if (userId) {
		const currUser = await Likes.getLikesById(userId);

		return currUser;
	}

	return { success: false };
};
