import { useUser } from "@clerk/remix";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { User } from "../models/users";
import GitHubStat from "../components/user-profile/GitHubStats";
import LeetCodeStats from "~/components/user-profile/LeetCodeStats";

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
};

type LoaderData = {
	userProfile: UserProfile;
};

export const loader = async ({
	params,
}: LoaderArgs): Promise<LoaderData | null> => {
	const userId: string | undefined = params.userid;

	if (userId) {
		let userProfile = await User.getUserProfileById(userId);
		userProfile = userProfile[0];
		return { userProfile };
	}

	return null;
};

export default function UserList() {
	const loaderData = useLoaderData<LoaderData>();
	const { user } = useUser();

	console.log(user?.firstName);

	if (loaderData) {
		const userProfile: UserProfile = loaderData.userProfile;

		return (
			<div>
				<div className="m-2 p-4 bg-white rounded-sm">
					<GitHubStat />
					<LeetCodeStats />
				</div>
				<p>
					{userProfile.first_name} {userProfile.last_name}
				</p>
			</div>
		);
	}

	return <p>No user profile data available.</p>;
}
