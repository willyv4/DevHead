import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link, useNavigation } from "@remix-run/react";
import { useState } from "react";
import type { UserData } from "~/types";

const UserCard = ({ user }: { user: UserData }) => {
	const [isClicked, setIsClicked] = useState("");
	const navigation = useNavigation();

	function renderLinkState() {
		return isClicked === user.id &&
			(navigation.state === "submitting" || navigation.state === "loading") ? (
			"Loading..."
		) : (
			<div className="flex flex-row">
				See Profile <ArrowRightIcon className="w-4 ml-2 mt-[2px]" />
			</div>
		);
	}

	return (
		<div className="bg-gray-800/40 border-2 border-gray-950/10 col-span-1 flex flex-col rounded-md text-center shadow">
			<div className="flex flex-1 flex-col p-8 rounded-lg">
				<img
					className="object-cover mx-auto h-32 w-32 flex-shrink-0 rounded-full"
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
							Followers: {user.followers?.filter((f) => f !== null).length}
						</span>

						<span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-[8px] font-medium text-emerald-200 ring-1 ring-inset ring-emerald-200">
							Following: {user.following?.filter((f) => f !== null).length}
						</span>
					</dd>
				</dl>
			</div>

			<div>
				<div className="-mt-px flex rounded-lg">
					<div className="flex w-0 flex-1">
						<Link
							onClick={() => setIsClicked(user.id)}
							to={`../user/view/${user.id}`}
							prefetch="intent"
							className="bg-white/0 text-white rounded-bl-lg rounded-br-lg relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
						>
							{renderLinkState()}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
