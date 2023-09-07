import { Form, useNavigation } from "@remix-run/react";

const CommentList = ({ comments, userId }: any) => {
	const navigation = useNavigation();

	const isLoading = navigation.state === "submitting";

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
								<span className="ml-2 pl-5 items-center rounded-md bg-emerald-50 px-2 p-1 text-[10px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-700/10">
									{comment?.author_first_name + " " + comment?.author_last_name}
								</span>
							</div>
							{comment?.user_id === userId && (
								<Form method="post" className="absolute right-3 -top-4">
									<input
										type="hidden"
										defaultValue={comment?.comment_id}
										name="commentId"
									/>
									<button
										type="submit"
										name="_action"
										value="DELETE_COMMENT"
										className="inline-flex items-center gap-x-0.5 rounded-md bg-rose-50 px-2 py-1 text-[9px] font-medium text-rose-600 ring-1 ring-inset ring-rose-500/10"
									>
										{isLoading ? "..." : "X"}
									</button>
								</Form>
							)}
						</div>

						<div className="text-xs ring-1 bg-gray-900/20 ring-gray-900 w-11/12 m-2 p-1 pt-0 rounded">
							<br></br>
							{comment?.comment
								?.split("\n")
								?.map((paragraph: string, index: number) => (
									<p
										key={index + "paragraph"}
										className="pb-1 pl-4 text-gray-300/70"
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
