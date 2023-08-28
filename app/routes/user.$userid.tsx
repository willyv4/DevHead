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
import ProfileHeader from "~/components/user-profile/ProfileHeader";
import BioSection from "~/components/user-profile/BioSection";
import { json } from "react-router";
import UserProjects from "~/components/user-profile/UserProjects";
import ProjectList from "~/components/ProjectList";

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

type UserProjects = {
	id: string;
	image_url: string;
	title: string;
	code_link: string;
	live_link: string;
	like_count: string[] | null;
};

type LoaderData = {
	userProfile: UserProfile;
	userProjects: UserProjects;
};

export const loader: LoaderFunction = async ({
	params,
}: LoaderArgs): Promise<LoaderData | null> => {
	const userId: string | undefined = params.userid;

	if (userId) {
		let userProfile = await User.getUserProfileById(userId);
		let userProjects = await User.getUserProjectsById(userId);
		userProfile = userProfile[0];

		return { userProfile, userProjects };
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
		projectImage: string;
		projectTitle: string;
		projectLiveLink: string;
		projectCodeLink: string;
	};

	console.log("Request Data", data);
	if (
		data.projectImage &&
		data.projectTitle &&
		data.projectCodeLink &&
		data.projectLiveLink
	) {
		return await User.addUserProject(
			data.userId,
			data.projectImage,
			data.projectTitle,
			data.projectCodeLink,
			data.projectLiveLink
		);
	}

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
	const loaderData = useLoaderData<LoaderData>();
	const { userid } = useParams();

	const userProfile: UserProfile = loaderData.userProfile;
	const userProjects: UserProjects = loaderData.userProjects;

	console.log("USER PROJECT DATA:", userProjects);

	if (userProfile) {
		return (
			<div>
				<div className="m-2 p-4 bg-white rounded-sm">
					<ProfileHeader user={userProfile} />
					<BioSection userId={userProfile.id} userBio={userProfile.about} />
					<GitHubStat
						githubUsername={userProfile.github_username}
						userId={userid}
					/>
					<LeetCodeStats
						leetcodeUsername={userProfile.leetcode_username}
						userId={userid}
					/>
					<UserProjects userId={userid} />
					<ProjectList {...userProjects} />
				</div>
				<p>
					{userProfile.first_name} {userProfile.last_name}
				</p>
			</div>
		);
	}

	return <p>No user profile data available.</p>;
}