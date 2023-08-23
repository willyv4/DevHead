import type { V2_MetaFunction } from "@vercel/remix";
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { User } from "../models/users";
import { EnvelopeIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

export const meta: V2_MetaFunction = () => [{ title: "DevHead" }];

type UserData = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	title: string;
	image_url: string;
	about: string;
	skills: string;
	code_start: string;
};

export const loader = async () => {
	const users = await User.getUserOverviews();
	return json({ users });
};

export default function UserList() {
	const { users } = useLoaderData<typeof loader>();

	return (
		<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
			{users.map((user: UserData) => (
				<li
					key={user.email + user.id}
					className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
				>
					<div className="flex w-full items-center justify-between space-x-6 p-6">
						<div className="flex-1 truncate">
							<div className="flex items-center space-x-3">
								<h3 className="truncate text-sm font-medium text-gray-900">
									{user.first_name + " " + user.last_name}
								</h3>
							</div>
							<p className="mt-1 truncate text-sm text-gray-500">
								{new Date().getFullYear() - parseInt(user.code_start)} yrs exp
								as {user.title}
							</p>
							<p className="text-xs mt-1">key skills: sk8 sk8 sk8</p>
						</div>
						<div className="flex-3 truncate">
							<img
								className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 ml-20 mb-2"
								src={user.image_url}
								alt=""
							/>
							<p>featured project</p>
						</div>
					</div>
					<div>
						<div className="-mt-px flex divide-x divide-gray-200">
							<div className="flex w-0 flex-1">
								<a
									href={`mailto:${user.email}`}
									className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
								>
									<EnvelopeIcon
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
									Email
								</a>
							</div>
							<div className="flex w-0 flex-1">
								<Link
									to={`/user/${user.id}`}
									className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-xs font-semibold text-gray-900"
								>
									{user.first_name}'s profile
									<ArrowRightIcon
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</Link>
							</div>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
}
