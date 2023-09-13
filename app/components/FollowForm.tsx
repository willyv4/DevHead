import { useFetcher } from "@remix-run/react";

const FollowForm = ({
	userId,
	userBeingFollowed,
}: {
	userId: string;
	userBeingFollowed: string;
}) => {
	const followPost = useFetcher();

	function presentTextState() {
		return followPost.state === "submitting"
			? "Saving..."
			: followPost.state === "loading"
			? "Saved!"
			: "Unfollow";
	}

	return (
		<followPost.Form method="POST" action="/api/follows">
			<input type="hidden" defaultValue={userId} name="userId" />
			<input
				type="hidden"
				defaultValue={userBeingFollowed}
				name="userBeingFollowed"
			/>

			<button
				type="submit"
				className="mt-[6px] ml-2 px-2 rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-white/20"
			>
				{presentTextState()}
			</button>
		</followPost.Form>
	);
};

export default FollowForm;
