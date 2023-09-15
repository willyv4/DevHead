import { useFetcher } from "@remix-run/react";

const UnfollowForm = ({
	userId,
	userBeingFollowed,
}: {
	userId: string;
	userBeingFollowed: string;
}) => {
	const followDelete = useFetcher();

	function renderFollowState() {
		return followDelete.state === "submitting"
			? "Saving..."
			: followDelete.state === "loading"
			? "Saved!"
			: "Unfollow";
	}

	return (
		<followDelete.Form method="DELETE" action="/api/follows">
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
				{renderFollowState()}
			</button>
		</followDelete.Form>
	);
};

export default UnfollowForm;
