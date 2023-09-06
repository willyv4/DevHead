import type {
	ActionArgs,
	ActionFunction,
	LoaderArgs,
	LoaderFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { User } from "../models/users";
import Posts from "~/models/posts";
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

// interface ActionRequest {

// 	request:Request
// }

const userViewPost: ActionFunction = async ({ request, params }) => {
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

	return json({ status: "success" });
};
const actionMethodMap = {
	POST: userViewPost,
	PUT: userViewPost,
	DELETE: userViewPost, // DELETE_FOLLOW
};

function isActionMethod(s: string): s is keyof typeof actionMethodMap {
	return Object.keys(actionMethodMap).includes(s);
}

export const action: ActionFunction = async (args: ActionArgs) => {
	// const formData = await request.formData();
	// const data = Object.fromEntries(formData) as unknown as {
	// 	_action: string;
	// 	userId: string;
	// 	projectId: number;
	// 	comment: string;
	// 	commentId: number;
	// 	userBeingFollowed: string;
	// };

	// LIKES RESOURCE
	// if (data._action === "POST_LIKE") {
	// 	return await Likes.addLike(data.userId, data.projectId);
	// }

	// if (data._action === "POST_UNLIKE") {
	// 	return await Likes.removeLike(data.userId, data.projectId);
	// }

	// FOLLOWS RESOURCE
	// if (data._action === "POST_FOLLOW") {
	// 	return await Follows.addFollow(data.userId, data.userBeingFollowed);
	// }

	// if (data._action === "DELETE_FOLLOW") {
	// 	return await Follows.removeFollow(data.userId, data.userBeingFollowed);
	// }

	// return null;
	// const customerId = req.cookies['customer'];
	const method = args.request.method;
	if (!isActionMethod(method)) {
		return json({ status: "unsuported method" }, 400);
	}
	const func = actionMethodMap[method];

	return await func(args);
};

export default function UserProfile() {
	const { user } = useUser();
	const { userSkills, userProfile, userProjects } = useLoaderData<LoaderData>();

	if (userProfile && user?.id) {
		return (
			<div className="bg-gray-900 pt-28 sm:px-10 px-4">
				<div className="rounded-2xl ring-1 ring-gray-950 mt-10">
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
