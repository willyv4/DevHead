import { useFetcher } from "@remix-run/react";
import { UseFormClear } from "~/hooks/useFormClear";

const CommentForm = ({
	postId,
	userId,
	action,
}: {
	postId: number;
	userId: string | undefined;
	action: string;
}) => {
	const commentPost = useFetcher();
	const isAdding = commentPost.state === "submitting";
	const { ref: setFormRef } = UseFormClear(isAdding);

	function presentButtonView() {
		return isAdding || commentPost.state === "loading" ? (
			<span className="animate-pulse">Processing...</span>
		) : (
			"Add Comment"
		);
	}

	return (
		<commentPost.Form
			action="/api/comments"
			method="POST"
			ref={setFormRef}
			className="sticky top-20 z-30 bg-gray-800"
		>
			<input type="hidden" defaultValue={postId} name="projectId" />
			<input type="hidden" defaultValue={userId} name="userId" />
			<div className=" border-2 border-gray-900 rounded ">
				<textarea
					rows={3}
					name="comment"
					id="comment"
					required
					className="p-2 block w-full bg-gray-950/20 p-0 pb-2 text-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none "
					placeholder="Add your comment..."
				/>
			</div>

			<button
				type="submit"
				name="_action"
				value="POST"
				className="mt-2 w-full rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
			>
				{presentButtonView()}
			</button>
		</commentPost.Form>
	);
};

export default CommentForm;
