import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createClerkClient } from "@clerk/remix/api.server";
import { User } from "../models/users";
import Home from "~/components/Home";

export const loader: LoaderFunction = async (args) => {
	// get userId from clerk auth
	const { userId }: { userId: string | null } = await getAuth(args);
	if (!userId) return json({ message: "no active user" });

	// if there's a user show homepage complete auth process
	const userWithId = await User.getUserById(userId);
	if (userWithId?.id) return userWithId;

	// if not user get user from clerk
	const user = await createClerkClient({
		secretKey: process.env.CLERK_SECRET_KEY,
	}).users.getUser(userId);

	if (!user.id) return json({ message: "could not create clerk user" });

	// if new user from clerk client add user info to devhead database
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
