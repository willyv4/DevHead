import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import ProfilePostForm from "./forms/ProfilePostForm";
import ProfileUpdateForm from "./forms/ProfileUpdateForm";

const ProfileHeader = ({ user }: any) => {
	const [buttonClicked, setButtonClicked] = useState(false);
	const handleSubmit = () => setButtonClicked(false);
	const handleClick = () =>
		buttonClicked ? setButtonClicked(false) : setButtonClicked(true);

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
							src={user?.image_url}
							alt=""
						/>
					</div>
					<div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
						<div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
							<h1 className="truncate text-2xl font-bold text-gray-900">
								{user?.first_name + " " + user?.last_name}
							</h1>

							{user?.title ? (
								<>
									<div className="flex flex-row">
										<h1 className="truncate text-sm font-bold text-gray-500 mt-[1px] mr-2">
											{user?.title}
										</h1>
										<button
											onClick={() => handleClick()}
											className="mb-1 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										>
											Edit Title
										</button>
									</div>
									{buttonClicked && (
										<ProfileUpdateForm
											handleSubmit={handleSubmit}
											userId={user?.id}
											userTitle={user?.title}
										/>
									)}
								</>
							) : (
								<>
									<small>Example Header: Web Developer</small>
									<ProfilePostForm userId={user?.id} />
								</>
							)}
						</div>
						<div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
							<a
								href={`mailto:${user?.email}`}
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
