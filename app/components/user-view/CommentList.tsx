import DeleteCommentForm from "../DeleteCommentForm";

const CommentList = ({ comments, userId }: any) => {
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
									className="w-9 h-9 object-cover rounded-full absolute -ml-3 ring-2 ring-blue-700/10"
								/>
								<span className="ml-2 pl-5 items-center rounded-md bg-gray-700 px-2 p-1 text-[10px] font-medium text-gray-300 ring-1 ring-inset ring-gray-300/10">
									{comment?.author_first_name + " " + comment?.author_last_name}
								</span>
							</div>
							{comment?.user_id === userId && (
								<DeleteCommentForm commentId={comment?.comment_id} />
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
