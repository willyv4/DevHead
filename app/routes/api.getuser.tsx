import type { ActionArgs, ActionFunction } from "@vercel/remix";

import { User } from "~/models/users";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	const data = await request.json();

	if (data) {
		const currUser = await User.getUserById(data.userId);

		return currUser;
	}

	return { success: false };
};
