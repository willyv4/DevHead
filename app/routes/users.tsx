import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { User } from "../models/users";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

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
	followers: string[];
	following: string[];
};

export const loader = async () => {
	const users = await User.getUserOverviews();
	return json({ users });
};

export default function UserList() {
	const { users } = useLoaderData<typeof loader>();

	console.log(users);

	return (
		<div
			role="list"
			className="pb-10 px-12 md:px-4 lg:px-24 mt-28 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
		>
			<div
				className="fixed inset-x-0 mb-96 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				aria-hidden="true"
			>
				<div
					className="relitive left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>

			{users.map((user: UserData) => (
				<div
					key={user.id}
					className="bg-gray-950/20 border-[.10px] border-white/10 col-span-1 flex flex-col rounded-md text-center shadow"
				>
					<div className="flex flex-1 flex-col p-8 rounded-lg">
						<img
							className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
							src={user.image_url}
							alt=""
						/>
						<h3 className="mt-6 text-sm font-bold text-white">
							{user.first_name + " " + user.last_name}
						</h3>
						<dl className="mt-1 flex flex-grow flex-col justify-between">
							<dt className="sr-only">Title</dt>
							<dd className="text-sm text-gray-400">{user.title}</dd>
							<dt className="sr-only">Role</dt>
							<dd className="mt-3">
								<span className="mr-2 inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-[8px] font-medium text-emerald-200 ring-1 ring-inset ring-emerald-200">
									Followers: {user.followers.length}
								</span>

								<span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-[8px] font-medium text-emerald-200 ring-1 ring-inset ring-emerald-200">
									Following: {user.following.length}
								</span>
							</dd>
						</dl>
					</div>

					<div>
						<div className="-mt-px flex rounded-lg">
							<div className="flex w-0 flex-1">
								<Link
									to={`../user/view/${user.id}`}
									className="bg-white/0 text-white rounded-bl-lg rounded-br-lg relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
								>
									See Profile <ArrowRightIcon className="w-4" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			))}
			<div
				className="fixed inset-x-0 ml-96 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
				aria-hidden="true"
			>
				<div
					className="relitive left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>
		</div>
	);
}
