import { EnvelopeIcon } from "@heroicons/react/20/solid";

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

const Header = ({ userProfile }: { userProfile: UserProfile }) => {
	return (
		<div>
			<div className="border-b-2 border-gray-100">
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
							</div>

							{userProfile?.title && (
								<div className="flex flex-row">
									<h1 className="truncate text-sm font-bold text-gray-500 mt-[1px] mr-2">
										{userProfile?.title}
									</h1>
								</div>
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

export default Header;
