import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { User } from "../models/users";
import { Projects } from "~/models/projects";
import { Skills } from "~/models/skills";
import Header from "~/components/user-view/UserHeader";
import SkillView from "~/components/user-view/SkillView";
import BioView from "~/components/user-view/BioView";
import GitHubView from "~/components/user-view/GitHubView";
import LeetCodeView from "~/components/user-view/LeetCodeView";
import ProjectListView from "~/components/user-view/ProjectListView";

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

type UserSkills = {
	id: number;
	skill: string;
	user_id: string;
};

type UserProjects = {
	id: number;
	image_url: string;
	title: string;
	code_link: string;
	live_link: string;
	like_count: string[] | null;
};

type LoaderData = {
	userProfile: UserProfile;
	userProjects: UserProjects[] | null | undefined;
	userSkills: UserSkills[];
};

export const loader: LoaderFunction = async ({
	params,
}: LoaderArgs): Promise<LoaderData | null> => {
	const userId: string | undefined = params.userid;

	if (userId) {
		let userProfile = await User.getUserProfileById(userId);
		let userProjects = await Projects.getUserProjectsById(userId);
		let userSkills = await Skills.getSkillsById(userId);

		return { userProfile, userProjects, userSkills };
	}

	return null;
};

export default function UserProfile() {
	const loaderData = useLoaderData<LoaderData>();
	const { userid } = useParams();

	const userSkills: UserSkills[] = loaderData.userSkills;
	const userProfile: UserProfile = loaderData.userProfile;
	const userProjects: UserProjects[] | null | undefined =
		loaderData.userProjects;

	console.log(userid, userSkills, userProjects);

	if (userProfile) {
		return (
			<div className="bg-white rounded-sm">
				<Header userProfile={userProfile} />
				<BioView userBio={userProfile.about} />
				<SkillView userSkills={userSkills} />
				<GitHubView githubUsername={userProfile.github_username} />
				<LeetCodeView leetcodeUsername={userProfile.leetcode_username} />
				<ProjectListView userId={userProfile.id} userProjects={userProjects} />
			</div>
		);
	}

	return <p>No user profile data available.</p>;
}
