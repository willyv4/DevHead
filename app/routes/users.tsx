import {
	Link,
	useLoaderData,
	useNavigate,
	useNavigation,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { User } from "../models/users";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useUser } from "@clerk/remix";
import { useEffect, useState } from "react";
import Blob from "../components/Blob";

type UserData = {
	id: string;
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

type Users = {
	users: UserData[];
};

export const loader = async () => {
	const users = await User.getUserOverviews();
	return json({ users });
};

export default function UserList() {
	const { users } = useLoaderData<Users>();
	const navigate = useNavigate();
	const { isSignedIn } = useUser();
	const [isClicked, setIsClicked] = useState<string>("");
	const navigation = useNavigation();

	useEffect(() => {
		if (!isSignedIn) return navigate("/");
	}, [navigate, isSignedIn]);

	return (
		<>
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
				<Blob />

				{users &&
					users?.map((user: UserData) => (
						<div
							key={user.id}
							className="bg-gray-400/5 border-2 border-gray-950/10 col-span-1 flex flex-col rounded-md text-center shadow"
						>
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
											Followers:{" "}
											{user.followers?.filter((f) => f !== null).length}
										</span>

										<span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-[8px] font-medium text-emerald-200 ring-1 ring-inset ring-emerald-200">
											Following:{" "}
											{user.following?.filter((f) => f !== null).length}
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
											className="bg-white/0 text-white rounded-bl-lg rounded-br-lg relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
										>
											{isClicked === user.id &&
											(navigation.state === "submitting" ||
												navigation.state === "loading") ? (
												"Loading..."
											) : (
												<div className="flex flex-row">
													See Profile{" "}
													<ArrowRightIcon className="w-4 ml-2 mt-[2px]" />
												</div>
											)}
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
}
