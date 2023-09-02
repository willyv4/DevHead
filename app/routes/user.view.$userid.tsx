import type {
	ActionArgs,
	ActionFunction,
	LoaderArgs,
	LoaderFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { User } from "../models/users";
import { Projects } from "~/models/projects";
import { Skills } from "~/models/skills";
import Header from "~/components/user-view/UserHeader";
import SkillView from "~/components/user-view/SkillView";
import BioView from "~/components/user-view/BioView";
import GitHubView from "~/components/user-view/GitHubView";
import LeetCodeView from "~/components/user-view/LeetCodeView";
import ProjectListView from "~/components/user-view/ProjectListView";
import { Likes } from "~/models/likes";
import { useUser } from "@clerk/remix";
import { Follows } from "~/models/follows";

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
	// projectLikes: number[];
};

export const loader: LoaderFunction = async ({
	params,
}: LoaderArgs): Promise<LoaderData | null> => {
	const userId: string | undefined = params.userid;

	if (userId) {
		const userProfile = await User.getUserProfileById(userId);
		const userProjects = await Projects.getUserProjectsById(userId);
		const userSkills = await Skills.getSkillsById(userId);

		return { userProfile, userProjects, userSkills };
	}

	return null;
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as unknown as {
		_action: string;
		userId: string;
		projectId: number;
		comment: string;
		commentId: number;
		userBeingFollowed: string;
	};

	if (data._action === "POST_LIKE") {
		return await Likes.addLike(data.userId, data.projectId);
	}

	if (data._action === "POST_UNLIKE") {
		return await Likes.removeLike(data.userId, data.projectId);
	}

	if (data._action === "POST_FOLLOW") {
		return await Follows.addFollow(data.userId, data.userBeingFollowed);
	}

	if (data._action === "DELETE_FOLLOW") {
		return await Follows.removeFollow(data.userId, data.userBeingFollowed);
	}

	return null;
};

export default function UserProfile() {
	const { user } = useUser();
	const loaderData = useLoaderData<LoaderData>();

	const userSkills = loaderData.userSkills;
	const userProfile = loaderData.userProfile;
	const userProjects = loaderData.userProjects;

	console.log("Users", userProfile.id, user?.id);
	console.log("USER Profile", userProfile);

	if (userProfile && user?.id) {
		return (
			<div className="bg-gray-900 pt-10 sm:px-10 px-4">
				<div className="rounded-2xl shadow-gray-950 shadow-lg mt-10">
					<Header userProfile={userProfile} userId={user?.id} />
					<BioView userBio={userProfile.about} />
					<SkillView userSkills={userSkills} />
					<GitHubView githubUsername={userProfile.github_username} />
					<LeetCodeView leetcodeUsername={userProfile.leetcode_username} />
					<ProjectListView userId={user?.id} userProjects={userProjects} />
				</div>
			</div>
		);
	}

	return <p>No user profile data available.</p>;
}
