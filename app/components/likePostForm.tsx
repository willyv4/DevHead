import { ArrowPathIcon, HeartIcon } from "@heroicons/react/24/solid";
import { useFetcher } from "@remix-run/react";

type Props = {
	userId: string | undefined;
	postId: number;
	likeCount: number;
};

const LikePostForm: React.FC<Props> = ({ userId, postId, likeCount }) => {
	const likePost = useFetcher();

	function renderLikeState() {
		return likePost.state === "submitting" || likePost.state === "loading" ? (
			<ArrowPathIcon className="w-5 p-1 animate-spin opacity-50" />
		) : (
			<HeartIcon className="w-5" />
		);
	}
	return (
		<likePost.Form
			method="POST"
			action="/api/likes"
			className="flex flex-row flex items-center px-2 py-2 bg-gray-400/5 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
		>
			<input type="hidden" name="projectId" defaultValue={postId} />
			<input type="hidden" name="userId" defaultValue={userId} />
			<button
				type="submit"
				className="flex items-center rounded-lg text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
			>
				{renderLikeState()}
			</button>
			<span className="text-xs ml-2">{likeCount}</span>
		</likePost.Form>
	);
};

export default LikePostForm;
