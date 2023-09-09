import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Form, useNavigation } from "@remix-run/react";
import { useState } from "react";

const CommentList = ({ comments, userId }: any) => {
	const navigation = useNavigation();
	const [commentClicked, setCommentClicked] = useState<number | null>(null);

	function textState(commentId: number) {
		return commentId === commentClicked &&
			(navigation.state === "submitting" || navigation.state === "loading") ? (
			<ArrowPathIcon className="w-3 m-[2px] animate animate-spin font-bold text-gray-300/50" />
		) : (
			<div className="w-4">X</div>
		);
	}

	return (
		<div className="pl-4 py-2">
			<div className="mt-10">
				{comments?.map((comment: any, idx: number) => (
					<div key={idx + comment?.author_first_name} className="m-2">
						<div className="relative mb-8">
							<div className="absolute -top-3 flex flex-row">
								<img
									src={comment?.author_image_url}
									alt="profile"
									className="w-8 rounded-full absolute -ml-2 ring-2 ring-blue-700/10"
								/>
								<span className="ml-2 pl-5 items-center rounded-md bg-gray-700 px-2 p-1 text-[10px] font-medium text-gray-300 ring-1 ring-inset ring-gray-300/10">
									{comment?.author_first_name + " " + comment?.author_last_name}
								</span>
							</div>
							{comment?.user_id === userId && (
								<Form method="post" className="absolute right-3 -top-3">
									<input
										type="hidden"
										defaultValue={comment?.comment_id}
										name="commentId"
									/>
									<button
										onClick={() => setCommentClicked(comment.comment_id)}
										type="submit"
										name="_action"
										value="DELETE_COMMENT"
										className="text-center inline-flex items-center rounded-full bg-gray-800 px-1 py-1 text-xs font-medium text-rose-400 ring-1 ring-inset ring-rose-400/80 hover:ring-rose-400/40"
									>
										{textState(comment.comment_id)}
									</button>
								</Form>
							)}
						</div>

						<div className="text-xs ring-1 bg-gray-900/20 ring-gray-900 w-11/12 m-2 p-1 pt-0 rounded whitespace-normal overflow-hidden overflow-ellipsis">
							<br></br>
							{comment?.comment
								?.split("\n")
								?.map((paragraph: string, index: number) => (
									<p
										key={index + "paragraph"}
										className="pb-1 pl-4 text-gray-300/70 whitespace-normal overflow-hidden overflow-ellipsis"
									>
										{paragraph}
									</p>
								))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CommentList;
