import { Form, useNavigation } from "@remix-run/react";
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
	const { ref: setFormRef } = UseFormClear("POST_COMMENT");
	const navigation = useNavigation();

	const text =
		navigation.state === "submitting" || navigation.state === "loading" ? (
			<span className="animate-pulse">Processing...</span>
		) : (
			"Add Comment"
		);

	return (
		<Form
			ref={setFormRef}
			action={`${action}${postId}`}
			method="post"
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
				name="_action"
				value="POST_COMMENT"
				type="submit"
				className="mt-2 w-full rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
			>
				{text}
			</button>
		</Form>
	);
};

export default CommentForm;
