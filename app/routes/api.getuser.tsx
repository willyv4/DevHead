import type { ActionArgs, ActionFunction } from "@vercel/remix";
import { User } from "~/models/users";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	const data = await request.json();

	console.log(data);

	if (data.userId) {
		const currUser = await User.getUserById(data.userId);
		console.log("CURR USER", currUser);
		return currUser;
	}

	return { success: false };
};
