import type {
	LoaderArgs,
	ActionArgs,
	ActionFunction,
	LoaderFunction,
} from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { User } from "../models/users";
import GitHubStat from "../components/user-profile/GitHubStats";
import LeetCodeStats from "~/components/user-profile/LeetCodeStats";
import Modal from "~/components/Modal";
import LeetCodeForm from "~/components/user-profile/forms/LeetCodeForm";
import { useState } from "react";
import EmptyStatus from "~/components/user-profile/EmptyStatus";
import GitHubIcon from "~/components/icon-components/GitHubIcon";
import LeetCodeIcon from "~/components/icon-components/LeetCodeIcon";
import GitHubForm from "~/components/user-profile/forms/GitHubForm";
import { PencilIcon } from "@heroicons/react/20/solid";
import ProfileHeader from "~/components/user-profile/ProfileHeader";
import BioSection from "~/components/user-profile/BioSection";
import { json } from "react-router";

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

type LoaderData = {
	userProfile: UserProfile;
};

export const loader: LoaderFunction = async ({
	params,
}: LoaderArgs): Promise<LoaderData | null> => {
	const userId: string | undefined = params.userid;

	if (userId) {
		let userProfile = await User.getUserProfileById(userId);
		userProfile = userProfile[0];
		return { userProfile };
	}

	return null;
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as {
		userId: string;
		githubUsername: string;
		leetcodeUsername: string;
		userBio: string;
		userTitle: string;
	};

	console.log("Request Data", data);

	if (data.githubUsername) {
		return await User.connectGithub(data.userId, data.githubUsername);
	}

	if (data.leetcodeUsername) {
		return await User.connectLeetcode(data.userId, data.leetcodeUsername);
	}

	if (data.userBio) {
		return await User.addUserBio(data.userId, data.userBio);
	}

	if (data.userTitle) {
		return await User.addUserTitle(data.userId, data.userTitle);
	}

	return json({ success: false });
};

export default function UserProfile() {
	const [leetCodeOpen, setLeetCodeOpen] = useState(false);
	const [gitHubOpen, setGitHubOpen] = useState(false);
	const loaderData = useLoaderData<LoaderData>();
	const { userid } = useParams();

	const GitHubModal = (
		<button
			className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			onClick={() => setGitHubOpen(true)}
		>
			Connect Github
		</button>
	);

	const LeetCodeModal = (
		<button
			className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			onClick={() => setLeetCodeOpen(true)}
		>
			Connect LeetCode
		</button>
	);

	if (loaderData) {
		const userProfile: UserProfile = loaderData.userProfile;

		return (
			<div>
				<div className="m-2 p-4 bg-white rounded-sm">
					<Modal
						FormComponent={<GitHubForm userId={userid} />}
						open={gitHubOpen}
						setOpen={setGitHubOpen}
					/>

					<Modal
						FormComponent={<LeetCodeForm userId={userid} />}
						open={leetCodeOpen}
						setOpen={setLeetCodeOpen}
					/>

					<ProfileHeader user={userProfile} />

					<BioSection userId={userProfile.id} userBio={userProfile.about} />

					<div>Skills Section</div>

					{userProfile.github_username ? (
						<div className="border-t-2 pt-6 mt-6">
							<button
								className="flex flex-row rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-1"
								onClick={() => setGitHubOpen(true)}
							>
								Edit <PencilIcon className="h-4 w-4 ml-2 mt-[2px]" />
							</button>
							<GitHubStat githubUsername={userProfile.github_username} />
						</div>
					) : (
						<EmptyStatus
							Icon={<GitHubIcon height="2.5rem" width="2.5rem" />}
							ModalButton={GitHubModal}
						/>
					)}
					{userProfile.leetcode_username ? (
						<div className="border-t-2 pt-6 mt-6">
							<button
								className="flex flex-row rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-1"
								onClick={() => setLeetCodeOpen(true)}
							>
								Edit <PencilIcon className="h-4 w-4 ml-2 mt-[2px]" />
							</button>
							<LeetCodeStats leetcodeUsername={userProfile.leetcode_username} />
						</div>
					) : (
						<EmptyStatus
							Icon={<LeetCodeIcon height="2.5rem" width="2.5rem" />}
							ModalButton={LeetCodeModal}
						/>
					)}
				</div>
				<p>
					{userProfile.first_name} {userProfile.last_name}
				</p>
			</div>
		);
	}

	return <p>No user profile data available.</p>;
}
