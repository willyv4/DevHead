import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { UserButton } from "@clerk/remix";
import { createClerkClient } from "@clerk/remix/api.server";
import { User } from "../models/users";

type UserData = {
	id: string;
	username: string | null;
	firstName: string | null;
	lastName: string | null;
	email: string;
	imageUrl: string;
};

export const loader: LoaderFunction = async (args) => {
	const { userId }: { userId: string | null } = await getAuth(args);

	if (userId) {
		const userWithId = await User.getUserById(userId);

		if (userWithId[0]?.id) return redirect("/home");

		const user = await createClerkClient({
			secretKey: process.env.CLERK_SECRET_KEY,
		}).users.getUser(userId);

		if (user.id !== userWithId[0]?.id) {
			const userData: UserData = {
				id: user.id,
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.emailAddresses[0].emailAddress,
				imageUrl: user.imageUrl,
			};

			await User.addUser(userData);
		}
	}

	return redirect("/home");
};

export default function Index() {
	return (
		<div>
			<h1>Index route</h1>
			<p>You are signed in!</p>
			<UserButton afterSignOutUrl="/" />
		</div>
	);
}
