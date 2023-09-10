import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { Form, useNavigation } from "@remix-run/react";

type UserProfile = {
	id: string;
	code_start: string | null;
	first_name: string | null;
	last_name: string | null;
	place: string | null;
	image_url: string;
	username: string;
	email: string;
	title: string | null;
	about: string | null;
	skills: string | null;
	followers: string[] | null;
	following: string[] | null;
	github_username: string | null;
	leetcode_username: string | null;
};

const Header = ({
	userProfile,
	userId,
}: {
	userProfile: UserProfile;
	userId: string;
}) => {
	const navigation = useNavigation();
	const followerCount = userProfile.followers?.filter((f) => f !== null).length;
	const followingCount = userProfile.following?.filter(
		(f) => f !== null
	).length;

	return (
		<div>
			<div className="border-b border-gray-400/5">
				<div className="w-full h-48 bg-gradient-to-r from-white/60 via to-emerald-100/70 rounded-tr-2xl rounded-tl-2xl" />
			</div>
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
					<div className="flex">
						<img
							className="h-24 w-24 rounded-full ring-4 ring-gray-900 sm:h-32 sm:w-32"
							src={userProfile?.image_url}
							alt=""
						/>
					</div>

					<div className="mt-10 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
						<div className="min-w-0 flex-1 -mb-10  md:block">
							<div className="flex flex-row">
								<h1 className="text-2xl font-bold text-gray-200">
									{userProfile?.first_name + " " + userProfile?.last_name}
								</h1>
								{userId !== userProfile.id && (
									<Form method="post">
										<input type="hidden" defaultValue={userId} name="userId" />
										<input
											type="hidden"
											defaultValue={userProfile.id}
											name="userBeingFollowed"
										/>
										{userProfile.followers?.includes(userId) ? (
											<button
												name="_action"
												value="DELETE_FOLLOW"
												type="submit"
												className="mt-[6px] ml-2 px-2 rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-white/20"
											>
												{navigation.state === "submitting"
													? "Saving..."
													: navigation.state === "loading"
													? "Saved!"
													: "Unfollow"}
											</button>
										) : (
											<button
												name="_action"
												value="POST_FOLLOW"
												type="submit"
												className="mt-[6px] ml-2 px-2 rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-white/20"
											>
												{navigation.state === "submitting"
													? "Saving..."
													: navigation.state === "loading"
													? "Saved!"
													: "Follow"}
											</button>
										)}
									</Form>
								)}
							</div>

							{userProfile?.title && (
								<div className="flex flex-row">
									<h1 className="truncate text-sm font-bold text-gray-500 mt-[1px] mr-2">
										{userProfile?.title}
									</h1>
								</div>
							)}

							<div className="flex flex-row mt-2">
								<span className="mr-2 inline-flex items-center rounded-md bg-emerald-300/10 px-2 py-1 text-sm font-medium text-emerald-300 ring-1 ring-inset ring-emerald-300/30">
									Followers: {followerCount}
								</span>
								<span className="inline-flex items-center rounded-md bg-emerald-300/10 px-2 py-1 text-sm font-medium text-emerald-300 ring-1 ring-inset ring-emerald-300/30">
									Following: {followingCount}
								</span>
							</div>
						</div>
						<div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 mt-[80px]">
							<a
								href={`mailto:${userProfile?.email}`}
								className="inline-flex justify-center rounded-md bg-white px-3 py-2 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
							>
								<EnvelopeIcon
									className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
								<span>Message</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
