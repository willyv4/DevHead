import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { User } from "../models/users";
import GitHubStat from "../components/user-profile/github-leet-connections/GitHubStats";
import LeetCodeStats from "~/components/user-profile/github-leet-connections/LeetCodeStats";
import ProfileHeader from "~/components/user-profile/header/ProfileHeader";
import BioSection from "~/components/user-profile/bio/BioSection";
import { useNavigate } from "react-router";
import ProjectList from "~/components/user-profile/projects/ProjectList";
import Projects from "~/models/posts";
import SkillsSection from "~/components/user-profile/skills/SkillsSection";
import { Skills } from "~/models/skills";
import { useUser } from "@clerk/remix";
import { useEffect } from "react";
import type { UserProfile, LoaderData } from "~/types";

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
			<div className="rounded-2xl ring-1 ring-gray-950/40">
				<ProfileHeader userProfile={userProfile} />
				<BioSection userId={userProfile?.id} userBio={userBio} />
				<SkillsSection userId={userProfile?.id} userSkills={userSkills} />
				<ProjectList userId={userid} userProjects={userProjects} />
				<GitHubStat
					githubUsername={userProfile?.github_username}
					userId={userid}
				/>
				<LeetCodeStats
					leetcodeUsername={userProfile?.leetcode_username}
					userId={userid}
				/>
			</div>
		</div>
	);
}
