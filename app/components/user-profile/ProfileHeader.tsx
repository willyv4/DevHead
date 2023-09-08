import { UserCircleIcon } from "@heroicons/react/20/solid";
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

	return (
		<div>
			<div className="border-b border-gray-400/5">
				<div className="w-full h-48 bg-gradient-to-tr from-[#ff80b5]/5 to-[#9089fc]/5 rounded-tr-2xl rounded-tl-2xl" />
			</div>
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
					<div className="flex">
						<img
							className="h-24 w-24 rounded-full ring-4 ring-gray-900 sm:h-32 sm:w-32"
							src={
								userProfile?.image_url
									? userProfile?.image_url
									: "https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg"
							}
							alt=""
						/>
					</div>
					<div className="sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
						<div className="min-w-0 flex-1 md:block">
							<div className="flex flex-row mt-10">
								<h1 className="truncate text-2xl font-bold text-gray-200">
									{userProfile?.first_name + " " + userProfile?.last_name}
								</h1>
								<button
									onClick={() => setUpdateFormView(true)}
									className="ml-2 flex flex-row mt-1 rounded mt-[6px] ml-2 px-2 rounded bg-gray-300/10 px-2 py-1 text-xs font-semibold text-gray-300 shadow-sm hover:bg-gray-300/20"
								>
									<p className="mt-[1.5px]">Edit</p>
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
									<small>Example Header: Web Developer</small>
									<Modal
										FormComponent={<ProfilePostForm userId={userProfile?.id} />}
										open={buttonClicked}
										setOpen={setButtonClicked}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
