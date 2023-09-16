import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { User } from "../models/users";
import GitHubStat from "../components/userprofile/github-leet-connections/GitHubStats";
import LeetCodeProfileView from "~/components/userprofile/github-leet-connections/LeetCodeProfileView";
import ProfileHeader from "~/components/userprofile/header/ProfileHeader";
import BioSection from "~/components/userprofile/bio/BioSection";
import { useNavigate } from "react-router";
import ProjectList from "~/components/userprofile/projects/ProjectList";
import Projects from "~/models/posts";
import SkillsSection from "~/components/userprofile/skills/SkillsSection";
import { Skills } from "~/models/skills";
import { useUser } from "@clerk/remix";
import { useEffect } from "react";
import type { UserProfile, LoaderData } from "~/types";

export const loader: LoaderFunction = async ({
	params,
}: LoaderArgs): Promise<LoaderData | null> => {
	const userId: string | undefined = params.userid;

	if (!userId) return null;

	const userProfile = await User.getUserProfileById(userId);
	const userProjects = await Projects.getUserProjectsById(userId);
	const userSkills = await Skills.getSkillsById(userId);
	return { userProfile, userProjects, userSkills };
};

export default function UserProfile() {
	const navigate = useNavigate();
	const { isSignedIn } = useUser();
	const { userProfile, userProjects, userSkills } = useLoaderData<LoaderData>();
	const { userid } = useParams();

	useEffect(() => {
		if (!isSignedIn) return navigate("/");
	}, [navigate, isSignedIn]);

	const userBio: string | null = userProfile?.about ?? "";

	return (
		<div className="pt-28 sm:px-10 px-4">
			<div className="rounded-2xl ring-1 ring-gray-950/40 shadow-md shadow-gray-950">
				<ProfileHeader userProfile={userProfile} />
				<BioSection userId={userProfile?.id} userBio={userBio} />
				<SkillsSection userId={userProfile?.id} userSkills={userSkills} />
				<ProjectList userId={userid} userProjects={userProjects} />
				<GitHubStat
					githubUsername={userProfile?.github_username}
					userId={userid}
				/>
				<LeetCodeProfileView
					leetcodeUsername={userProfile?.leetcode_username}
					userId={userid}
				/>
			</div>
		</div>
	);
}
