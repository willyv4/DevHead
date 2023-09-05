import { EnvelopeIcon, UserCircleIcon } from "@heroicons/react/20/solid";
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

const ProfileHeader = ({ userProfile }: { userProfile: UserProfile }) => {
	const [buttonClicked, setButtonClicked] = useState(false);
	const [updateFromView, setUpdateFormView] = useState(false);

	return (
		<div>
			<div className="border-2 border-gray-100 rounded-lg">
				<img
					className="h-32 w-full object-cover lg:h-48"
					src="https://tailwindcss.com/_next/static/media/docs@tinypng.d9e4dcdc.png"
					alt="background"
				/>
			</div>
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
					<div className="flex">
						<img
							className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
							src={userProfile?.image_url}
							alt=""
						/>
					</div>
					<div className="sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
						<div className="min-w-0 flex-1 sm:hidden md:block">
							<div className="flex flex-row">
								<h1 className="truncate text-2xl font-bold text-gray-900">
									{userProfile?.first_name + " " + userProfile?.last_name}
								</h1>
								<button
									onClick={() => setUpdateFormView(true)}
									className="ml-2 flex flex-row mt-1 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
						<div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
							<a
								href={`mailto:${userProfile?.email}`}
								className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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

export default ProfileHeader;
