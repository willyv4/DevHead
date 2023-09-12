import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useNavigation } from "@remix-run/react";
import { useState } from "react";
import Modal from "../Modal";
import ProfilePostForm from "./forms/ProfilePostForm";
import ProfileUpdateForm from "./forms/ProfileUpdateForm";

type UserProfile = {
	id: string;
	code_start: string | null;
	first_name: string | null;
	last_name: string | null;
	place: string | null;
	image_url: string;
	email: string;
	title: string | null;
	about: string | null;
	skills: string | null;
	followers: string[] | null;
	following: string[] | null;
	github_username: string | null;
	leetcode_username: string | null;
};

const ProfileHeader = ({ userProfile }: { userProfile: UserProfile }) => {
	const [buttonClicked, setButtonClicked] = useState(false);
	const [updateFromView, setUpdateFormView] = useState(false);
	const navigation = useNavigation();

	const followerCount = userProfile.followers?.filter((f) => f !== null).length;
	const followingCount = userProfile.following?.filter(
		(f) => f !== null
	).length;

	const text =
		navigation.state === "submitting"
			? "Saving..."
			: navigation.state === "loading"
			? "Saved!"
			: "Edit";

	return (
		<div>
			<div className="border-b border-gray-400/5">
				<div className="w-full h-48 bg-gradient-to-r from-white/60 via to-emerald-100/70 rounded-tr-2xl rounded-tl-2xl" />
			</div>
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
					<div className="flex">
						<img
							className="object-cover h-24 w-24 rounded-full ring-4 ring-gray-900 sm:h-32 sm:w-32"
							src={
								userProfile?.image_url
									? userProfile?.image_url
									: "https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg"
							}
							alt=""
						/>
					</div>
					<div className="sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
						<div className="mt-10 min-w-0 flex-1 md:block">
							<div className="flex flex-row mt-10">
								<h1 className="truncate text-2xl font-bold text-gray-200">
									{userProfile?.first_name + " " + userProfile?.last_name}
								</h1>
								<button
									onClick={() => setUpdateFormView(true)}
									className="ml-2 flex flex-row mt-1 rounded mt-[6px] ml-2 px-2 rounded bg-gray-300/10 px-2 py-1 text-xs font-semibold text-gray-300 shadow-sm hover:bg-gray-300/20"
								>
									<p className="mt-[1.5px]">{text}</p>
									<UserCircleIcon className="w-5 h-5 ml-2" />
								</button>
							</div>

							<Modal
								FormComponent={
									<ProfileUpdateForm
										userProfile={userProfile}
										setOpen={setUpdateFormView}
									/>
								}
								open={updateFromView}
								setOpen={setUpdateFormView}
							/>

							{userProfile?.title ? (
								<div className="flex flex-row">
									<h1 className="truncate text-sm font-bold text-gray-500 mt-[1px] mr-2">
										{userProfile?.title}
									</h1>
								</div>
							) : (
								<>
									<Modal
										FormComponent={<ProfilePostForm userId={userProfile?.id} />}
										open={buttonClicked}
										setOpen={setButtonClicked}
									/>
								</>
							)}

							<div className="flex flex-row mt-2">
								<span className="mr-2 inline-flex items-center rounded-md bg-emerald-400/10 px-2 py-1 text-sm font-medium text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
									Followers: {followerCount}
								</span>
								<span className="inline-flex items-center rounded-md bg-emerald-400/10 px-2 py-1 text-sm font-medium text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
									Following: {followingCount}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
