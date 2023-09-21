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
import { useEffect, useState } from "react";
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
	const [message, setMessage] = useState<string | null>(null);
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (!isSignedIn || userid !== userProfile.id) return navigate("/");
	}, [navigate, isSignedIn, userid, userProfile.id]);

	const userBio: string | null = userProfile?.about ?? "";

	useEffect(() => {
		if (
			userSkills.length > 0 &&
			userProfile.github_username &&
			userProfile.leetcode_username &&
			userProjects.length > 0 &&
			userProfile.about
		) {
			setShow(false);
		} else {
			setMessage(
				"your profile will be searchable by other users when your profile is complete."
			);
			setTimeout(() => {
				setShow(false);
			}, 7000);
		}
	}, [
		message,
		userProfile.about,
		userProfile.github_username,
		userProfile.leetcode_username,
		userProjects.length,
		userSkills.length,
	]);

	return (
		<div className="pt-28 sm:px-10 px-4 lg:px-36">
			{show && (
				<p className="absolute text-[9px] top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:text-xs inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
					{message}
				</p>
			)}

			<div className="rounded-2xl ring-1 ring-gray-950/40 shadow-md shadow-gray-950">
				<ProfileHeader
					userProfile={userProfile}
					setMessage={setMessage}
					message={message}
				/>
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
