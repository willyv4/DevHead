import type {
	ActionFunction,
	LoaderArgs,
	LoaderFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { User } from "../models/users";
import Posts from "~/models/posts";
import { Skills } from "~/models/skills";
import Header from "~/components/user-view/UserHeader";
import SkillView from "~/components/user-view/SkillView";
import BioView from "~/components/user-view/BioView";
import GitHubView from "~/components/user-view/GitHubView";
import LeetCodeView from "~/components/user-view/LeetCodeView";
import ProjectListView from "~/components/user-view/ProjectListView";
import { useUser } from "@clerk/remix";
import { Follows } from "~/models/follows";
import { useEffect } from "react";

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
		const userProfile = (await User.getUserProfileById(
			userId
		)) as unknown as UserProfile;
		const userProjects = (await Posts.getUserProjectsById(
			userId
		)) as unknown as UserProjects[];
		const userSkills = (await Skills.getSkillsById(
			userId
		)) as unknown as UserSkills[];

		return { userProfile, userProjects, userSkills };
	}

	return null;
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as unknown as {
		_action: string;
		userId: string;
		projectId: number;
		comment: string;
		commentId: number;
		userBeingFollowed: string;
	};

	if (data._action === "POST_FOLLOW") {
		return await Follows.addFollow(data.userId, data.userBeingFollowed);
	}

	if (data._action === "DELETE_FOLLOW") {
		return await Follows.removeFollow(data.userId, data.userBeingFollowed);
	}

	return json({ status: "success" });
};

export default function UserProfile() {
	const navigate = useNavigate();
	const { isSignedIn } = useUser();
	const { user } = useUser();
	const { userSkills, userProfile, userProjects } = useLoaderData<LoaderData>();

	useEffect(() => {
		if (!isSignedIn) return navigate("/");
	}, [navigate, isSignedIn]);

	if (userProfile && user?.id) {
		return (
			<div className="pt-28 sm:px-10 px-4">
				<div className="rounded-2xl ring-1 ring-gray-950 mt-10">
					<Header userProfile={userProfile} userId={user?.id} />
					<BioView userBio={userProfile.about} />
					<SkillView userSkills={userSkills} />
					{userProjects && (
						<ProjectListView userId={user?.id} userProjects={userProjects} />
					)}
					{userProfile.github_username && (
						<GitHubView githubUsername={userProfile?.github_username} />
					)}
					{userProfile.leetcode_username && (
						<LeetCodeView leetcodeUsername={userProfile?.leetcode_username} />
					)}
				</div>
			</div>
		);
	}
}
