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
import { json, useNavigate } from "react-router";
import ProjectList from "~/components/user-profile/ProjectList";
import Projects from "~/models/posts";
import SkillsSection from "~/components/user-profile/SkillsSection";
import { Skills } from "~/models/skills";
import { useUser } from "@clerk/remix";
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
		let userProfile = await User.getUserProfileById(userId);
		let userProjects = await Projects.getUserProjectsById(userId);
		let userSkills = await Skills.getSkillsById(userId);

		return { userProfile, userProjects, userSkills };
	}

	return null;
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as unknown as {
		_action: string;
		userId: string;
		githubUsername: string;
		leetcodeUsername: string;
		userBio: string;
		userTitle: string;
		projectImage: string;
		projectTitle: string;
		projectLiveLink: string;
		projectCodeLink: string;
		projectId: number;
		firstName: string;
		lastName: string;
		profileTitle: string;
		userEmail: string;
		userImage: string;
		skill: string;
		skillId: number;
	};

	if (data._action === "PUT_USER") {
		if (data.userId) {
			const userData: any = {
				id: data.userId,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.userEmail,
				imageUrl: data.userImage,
				title: data.profileTitle,
			};
			return await User.updateUser(userData);
		}
	}

	if (data._action === "PUT") {
		if (data.projectId) {
			return await Projects.updateUserProject(
				data.projectId,
				data.userId,
				data.projectImage,
				data.projectTitle,
				data.projectCodeLink,
				data.projectLiveLink
			);
		}
	}

	if (data.projectId) {
		return await Projects.deleteProjectById(data.projectId);
	}

	if (data._action === "DELETE_SKILL") {
		return await Skills.removeSkill(data.skillId);
	}

	if (data._action === "POST_PROJECTS") {
		return await Projects.addUserProject(
			data.userId,
			data.projectImage,
			data.projectTitle,
			data.projectLiveLink,
			data.projectCodeLink
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

	if (data.skill && data.userId) {
		return await Skills.addSkill(data.userId, data.skill);
	}

	if (data.userTitle) {
		return await User.addUserTitle(data.userId, data.userTitle);
	}

	return json({ success: false });
};

export default function UserProfile() {
	const navigate = useNavigate();
	const auth = useUser();
	const loaderData = useLoaderData<LoaderData>();
	const { userid } = useParams();

	useEffect(() => {
		if (auth.user?.id !== userid || !auth.isSignedIn) return navigate("/home");
	}, [navigate, auth.user?.id, auth.isSignedIn, userid]);

	const userSkills: UserSkills[] = loaderData.userSkills;
	const userProfile: UserProfile = loaderData.userProfile;
	const userProjects: UserProjects[] | null | undefined =
		loaderData.userProjects;

	console.log(userProfile);

	if (userProfile) {
		return (
			<div className="m-2 p-4 bg-white rounded-sm">
				<ProfileHeader userProfile={userProfile} />
				<BioSection userId={userProfile.id} userBio={userProfile.about} />
				<SkillsSection userId={userProfile.id} userSkills={userSkills} />
				<GitHubStat
					githubUsername={userProfile.github_username}
					userId={userid}
				/>
				<LeetCodeStats
					leetcodeUsername={userProfile.leetcode_username}
					userId={userid}
				/>
				<ProjectList userId={userid} userProjects={userProjects} />
			</div>
		);
	}

	return <p>No user profile data available.</p>;
}
