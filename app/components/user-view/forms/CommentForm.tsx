import { Form } from "@remix-run/react";

const CommentForm = ({
	postId,
	userId,
}: {
	postId: number;
	userId: string | undefined;
}) => {
	return (
		<Form
			action={`./comments/${postId}`}
			method="post"
			className="sticky top-10 z-30 bg-white pb-8 -ml-2 -mr-2"
		>
			<input type="hidden" defaultValue={postId} name="projectId" />
			<input type="hidden" defaultValue={userId} name="userId" />
			<div className="ring-1 ring-gray-200 rounded mt-2">
				<textarea
					rows={3}
					name="comment"
					id="comment"
					className="p-2 block w-full bg-white resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none"
					placeholder="Add your comment..."
				/>
			</div>

			<button
				name="_action"
				value="POST_COMMENT"
				type="submit"
				className="mt-2 w-full text-center items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				Add comment
			</button>
		</Form>
	);
};

export default CommentForm;
