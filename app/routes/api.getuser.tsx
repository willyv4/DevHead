import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunction } from "@vercel/remix";

import { User } from "~/models/users";

export const loader: LoaderFunction = async (args) => {
	const { userId } = await getAuth(args);

	if (userId) {
		const currUser = await User.getUserById(userId);

		return currUser;
	}

	return null;
};
