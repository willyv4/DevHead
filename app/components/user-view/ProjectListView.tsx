import {
	CodeBracketIcon,
	ComputerDesktopIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import LikeDeleteForm from "../LikeDeleteForm";
import LikePostForm from "../likePostForm";
import CommentSlider from "./CommentSlider";

type UserProject = {
	id: number;
	image_url: string;
	title: string;
	code_link: string;
	live_link: string;
	like_count: string[] | null;
	comments: any;
};

type Props = {
	userProjects: UserProject[] | null | undefined | any;
	userId: string | undefined;
};

const ProjectListView: React.FC<Props> = ({ userId, userProjects }) => {
	const [commentView, setCommentView] = useState<boolean>(false);
	const [viewProject, setViewProject] = useState<UserProject | null>(null);

	const handleClick = (idx: number) => {
		if (userProjects) {
			const pickedProject = userProjects[idx - 1];
			setViewProject(pickedProject);
			setCommentView(!commentView);
		}
	};

	return (
		<div className="flex-col justify-center mt-10">
			<div className="border-b border-gray-950 pb-5">
				<h3 className="text-xl font-bold leading-6 text-gray-300">
					<div className="flex flex-row ml-5">
						<p className="ml-2">Projects</p>
					</div>
				</h3>
			</div>

			<CommentSlider
				userId={userId}
				open={commentView}
				setOpen={setCommentView}
				viewProject={viewProject}
				action="./comments/"
			/>

			<div className="carousel rounded-box flex flex-row ml-4">
				{userProjects?.map((post: any, idx: number) => (
					<div
						key={post.id + post.title}
						className="carousel-item w-[300px] mx-2 my-6 justify-center align-items rounded-xl pl-2"
					>
						<div className="ring-2 ring-gray-700 relative isolate flex flex-col justify-between overflow-hidden rounded-lg bg-gray-900 px-8 pb-8 pt-80">
							<img
								src={post.image_url}
								alt=""
								className="absolute inset-0 -z-10 h-full w-full object-cover"
							/>
							<div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/60" />
							<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

							<h3 className="absolute top-0 left-0 text-lg font-semibold leading-6 text-white bg-gradient-to-b from-gray-900 to-transparent w-full h-28 pl-6 pt-4">
								{post.title}
							</h3>

							<div className="-mb-6 bg-gray-800/30 w-[300px] -ml-8 -mb-8">
								<div className="grid grid-flow-col justify-stretch">
									<a
										rel="noreferrer"
										target="_blank"
										href={post.code_link}
										className="mr-[1px] flex items-center px-2 py-2 bg-gray-400/5 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
									>
										Site
										<ComputerDesktopIcon className="w-4 ml-1" />
									</a>

									<a
										target="_blank"
										href={post.live_link}
										className="mr-[1px] flex items-center px-2 py-2 bg-gray-400/5 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
										rel="noreferrer"
									>
										Code
										<CodeBracketIcon className="w-4 ml-1" />
									</a>

									<Link
										preventScrollReset={true}
										to={`./comments/${post.id}`}
										onClick={() => handleClick(idx + 1)}
										className="mr-[1px] flex items-center px-2 py-2 bg-gray-400/5 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
									>
										Comments {post.comment_count}
									</Link>

									{post?.liked_user_ids?.includes(userId) ? (
										<LikeDeleteForm
											userId={userId}
											postId={post.id}
											likeCount={post?.liked_user_ids?.length}
										/>
									) : (
										<LikePostForm
											userId={userId}
											postId={post.id}
											likeCount={post?.liked_user_ids?.length}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectListView;
