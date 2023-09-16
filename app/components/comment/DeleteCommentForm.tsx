import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useFetcher } from "@remix-run/react";

const DeleteCommentForm = ({ commentId }: { commentId: number }) => {
	const commentDelete = useFetcher();

	function textState() {
		return commentDelete.state === "submitting" ||
			commentDelete.state === "loading" ? (
			<ArrowPathIcon className="w-3 m-[2px] animate animate-spin font-bold text-gray-300/50" />
		) : (
			<div className="w-4">X</div>
		);
	}

	return (
		<commentDelete.Form
			method="DELETE"
			action="/api/comments"
			className="absolute right-3 -top-3"
		>
			<input type="hidden" defaultValue={commentId} name="commentId" />
			<button
				type="submit"
				className="text-center inline-flex items-center rounded-full bg-gray-800 px-1 py-1 text-xs font-medium text-rose-400 ring-1 ring-inset ring-rose-400/80 hover:ring-rose-400/40"
			>
				{textState()}
			</button>
		</commentDelete.Form>
	);
};

export default DeleteCommentForm;
