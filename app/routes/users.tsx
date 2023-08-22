import type { V2_MetaFunction } from "@vercel/remix";
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { User } from "../models/users";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export const meta: V2_MetaFunction = () => [{ title: "DevHead" }];

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
};

export default function UserList() {
	const { users } = useLoaderData<typeof loader>();

	return (
		<ul className="divide-y divide-alternate">
			{users.map((user: UserData) => (
				<li key={user.id} className="relative flex justify-between py-5">
					<div className="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
						<img
							className="h-12 w-12 flex-none rounded-full bg-alternate"
							src={user.image_url}
							alt=""
						/>
						<div className="min-w-0 flex-auto">
							<p className="text-sm font-semibold leading-6 text-alternate">
								<Link to="/user-profile">
									<span className="absolute inset-x-0 -top-px bottom-0" />
									{user.username}
								</Link>
							</p>
							<p className="mt-1 flex text-xs leading-5 text-primary">
								{user.email}
							</p>
						</div>
					</div>
					<div className="flex items-center justify-between gap-x-4 sm:w-1/2 sm:flex-none">
						<div className="min-w-0 flex-auto">
							<p className="text-sm font-bold text-alternate">{user.title}</p>
							<p className="mt-1 flex text-xs leading-5 text-primary">
								yrs exp: {new Date().getFullYear() - parseInt(user.code_start)}
							</p>
						</div>
						<ChevronRightIcon
							className="h-5 w-5 flex-none text-alternate"
							aria-hidden="true"
						/>
					</div>
				</li>
			))}
		</ul>
	);
}
