import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { User } from "../models/users";
import Posts from "~/models/posts";
import { Skills } from "~/models/skills";
import Header from "~/components/userview/UserHeader";
import SkillView from "~/components/userview/SkillView";
import BioView from "~/components/userview/BioView";
import GitHubView from "~/components/userview/GitHubView";
import LeetCodeUserView from "~/components/userview/LeetCodeUserView";
import ProjectListView from "~/components/userview/ProjectListView";
import { useUser } from "@clerk/remix";
import { useEffect } from "react";
import type { LoaderData, UserProject, UserSkills, UserProfile } from "~/types";

export const loader: LoaderFunction = async ({
	params,
}: LoaderArgs): Promise<LoaderData | null> => {
	const userId: string | undefined = params.userid;

	if (!userId) return null;

	const userProfile: UserProfile = await User.getUserProfileById(userId);
	const userProjects: UserProject[] = await Posts.getUserProjectsById(userId);
	const userSkills: UserSkills[] = await Skills.getSkillsById(userId);
	return { userProfile, userProjects, userSkills };
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
			<div className="pt-28 sm:px-10 px-4 lg:px-36">
				<div className="rounded-2xl ring-1 ring-gray-950/40 shadow-md shadow-gray-950">
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
						<LeetCodeUserView
							leetcodeUsername={userProfile?.leetcode_username}
						/>
					)}
				</div>
			</div>
		);
	}
}
