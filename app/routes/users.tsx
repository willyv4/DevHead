import { useLoaderData, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";
import { User } from "../models/users";
import { useUser } from "@clerk/remix";
import { useEffect } from "react";
import Blob from "../components/utility/Blob";
import type { UserData, Users } from "../types";
import UserCard from "~/components/UserCard";

export const loader = async () => {
	const users = await User.getUserOverviews();
	return json({ users });
};

export default function UserList() {
	const { users } = useLoaderData<Users>();
	const navigate = useNavigate();
	const { isSignedIn } = useUser();

	useEffect(() => {
		if (!isSignedIn) return navigate("/");
	}, [navigate, isSignedIn]);

	return (
		<>
			<Blob />
			<div className="border-b border-gray-950 pb-5 mt-28 px-8">
				<h3 className="text-base font-semibold leading-6 text-gray-50">
					Follow DevHeads for Insporation 🙌
				</h3>
				<p className="mt-2 max-w-4xl text-sm text-gray-400">
					Discover a talented group of developers. Connect with them to find
					inspiration and insights into their work.
				</p>
			</div>
			<div
				role="list"
				className="pb-10 px-12 md:px-4 lg:px-24 mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
			>
				{users?.map((user: UserData) => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
		</>
	);
}
