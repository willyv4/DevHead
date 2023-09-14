import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createClerkClient } from "@clerk/remix/api.server";
import { User } from "../models/users";
import Home from "~/components/Home";

export const loader: LoaderFunction = async (args) => {
	const { userId }: { userId: string | null } = await getAuth(args);

	if (!userId) return json({ message: "no active user" });

	const userWithId = await User.getUserById(userId);

	if (userWithId?.id) {
		return userWithId;
	}

	const user = await createClerkClient({
		secretKey: process.env.CLERK_SECRET_KEY,
	}).users.getUser(userId);

	if (!user.id) return json({ message: "could not create clerk user" });

	const newUser = await User.addUser(
		user.id,
		user.firstName,
		user.lastName,
		user.emailAddresses[0].emailAddress,
		user.imageUrl
	);

	if (!newUser.id) return json({ message: "could not create db user" });

	return null;
};

export default function Index() {
	return <Home />;
}
