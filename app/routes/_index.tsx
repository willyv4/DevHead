import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { createClerkClient } from "@clerk/remix/api.server";
import { User } from "../models/users";
import Home from "./home";

export const loader: LoaderFunction = async (args) => {
	const { userId }: { userId: string | null } = await getAuth(args);
	if (!userId) return json({ message: "no active user" });

	const userWithId = await User.getUserById(userId);
	// not "", undefined, null
	if (userWithId[0]?.id) return redirect("/home");

	const user = await createClerkClient({
		secretKey: process.env.CLERK_SECRET_KEY,
	}).users.getUser(userId);

	if (!user.id) return json({ message: "could not create clerk user" });

	const username =
		user.emailAddresses[0].emailAddress.split("@")[0] +
		Math.floor(Math.random() * 1000);

	const userData: any = {
		id: user.id,
		username: user.username || username,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.emailAddresses[0].emailAddress,
		imageUrl: user.imageUrl,
	};

	const newUser = await User.addUser(userData);

	if (!newUser.id) return json({ message: "could not create db user" });

	return redirect("/home");
};

export default function Index() {
	return <Home />;
}
