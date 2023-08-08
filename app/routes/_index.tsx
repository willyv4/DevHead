import type { V2_MetaFunction } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { User } from "../models/users";

export const meta: V2_MetaFunction = () => [{ title: "DevHEad" }];

export const loader = async () => {
	const users = await User.getUserOverviews();
	return json({ users });
};

type UserData = {
	id: number;
	username: string;
	email: string;
	title: string;
	image_url: string;
	about: string;
	skills: string;
	code_start: string;
	followers: Number[];
	following: Number[];
};

export default function Index() {
	const { users } = useLoaderData<typeof loader>();

	return (
		<>
			<h1 className="text-3xl font-bold text-emerald-500">
				Home Page: User Data List
			</h1>
			<div>
				{users.map((user: UserData) => (
					<div key={user.id}>
						<div>{user.username}</div>
						<div>{user.email}</div>
						<div>{user.title}</div>
						<img src={user.image_url} alt={user.username + "image"}></img>
					</div>
				))}
			</div>
		</>
	);
}
