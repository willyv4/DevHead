import { EnvelopeIcon } from "@heroicons/react/20/solid";
import FollowForm from "./forms/FollowForm";
import UnfollowForm from "./forms/UnfollowForm";
import type { UserProfile } from "../../types";

const Header = ({
	userProfile,
	userId,
}: {
	userProfile: UserProfile;
	userId: string;
}) => {
	const followerCount = userProfile.followers?.filter((f) => f !== null).length;
	const followingCount = userProfile.following?.filter(
		(f) => f !== null
	).length;

	return (
		<div>
			<div>
				<div className="w-full h-48 bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 rounded-tr-2xl rounded-tl-2xl" />
			</div>
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<div className="-mt-36 sm:flex sm:items-end sm:space-x-5">
					<div className="flex">
						<img
							className="object-cover h-24 w-24 rounded-full sm:h-32 sm:w-32"
							src={
								userProfile?.image_url
									? userProfile?.image_url
									: "https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg"
							}
							alt=""
						/>
					</div>

					<div className="mt-10 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
						<div className="min-w-0 flex-1 -mb-10  md:block">
							<div className="flex flex-row">
								<h1 className="text-2xl font-bold text-gray-200">
									{userProfile?.first_name + " " + userProfile?.last_name}
								</h1>
								{userId !== userProfile.id &&
									(userProfile.followers?.includes(userId) ? (
										<UnfollowForm
											userId={userId}
											userBeingFollowed={userProfile.id}
										/>
									) : (
										<FollowForm
											userId={userId}
											userBeingFollowed={userProfile.id}
										/>
									))}
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
