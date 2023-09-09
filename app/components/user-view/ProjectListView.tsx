import {
	ArrowPathIcon,
	CodeBracketIcon,
	ComputerDesktopIcon,
	HeartIcon,
} from "@heroicons/react/20/solid";
import { Form, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
	const [formClicked, setFromClicked] = useState<number | null>(null);
	const navigation = useNavigation();

	const handleClick = (idx: number) => {
		if (userProjects) {
			const pickedProject = userProjects[idx - 1];
			setViewProject(pickedProject);
			setCommentView(!commentView);
		}
	};

	function getUnlikeState(postId: number) {
		return postId === formClicked &&
			(navigation.state === "submitting" || navigation.state === "loading") ? (
			<ArrowPathIcon className="w-5 p-1 animate-spin opacity-50" />
		) : (
			<HeartIcon className="w-5 text-rose-500" />
		);
	}

	function getLikeState(postId: number) {
		return postId === formClicked &&
			(navigation.state === "submitting" || navigation.state === "loading") ? (
			<ArrowPathIcon className="w-5 p-1 animate-spin opacity-50" />
		) : (
			<HeartIcon className="w-5" />
		);
	}

	return (
		<div className="flex-col justify-center mt-20">
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
										href={post.live_link}
										className="mr-[1px] flex items-center px-2 py-1 bg-white/20 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
									>
										Site
										<ComputerDesktopIcon className="w-4 ml-1" />
									</a>

									<a
										target="_blank"
										href={post.code_link}
										className="mr-[1px] flex items-center bg-white/20 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
										rel="noreferrer"
									>
										Code
										<CodeBracketIcon className="w-4 ml-1" />
									</a>

									<Link
										preventScrollReset={true}
										to={`./comments/${post.id}`}
										onClick={() => handleClick(idx + 1)}
										className=" mr-[1px] flex items-center px-2 py-2 bg-white/20 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
									>
										Comments {post.comment_count}
									</Link>

									{post?.liked_user_ids?.includes(userId) ? (
										<Form
											method="post"
											className="flex flex-row flex items-center px-2 py-2 bg-white/20 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
										>
											<input
												type="hidden"
												name="projectId"
												defaultValue={post.id}
											/>
											<input
												type="hidden"
												name="userId"
												defaultValue={userId}
											/>
											<button
												type="submit"
												className="flex items-center rounded-lg text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
												name="_action"
												value="POST_UNLIKE"
												onClick={() => setFromClicked(post.id)}
											>
												{getUnlikeState(post.id)}
											</button>
											<span className="text-xs ml-2">
												{post?.liked_user_ids?.length}
											</span>
										</Form>
									) : (
										<Form
											method="post"
											className="flex flex-row flex items-center px-2 py-2 bg-white/20 text-xs font-semibold text-white shadow-sm hover:bg-gray/30"
										>
											<input
												type="hidden"
												name="projectId"
												defaultValue={post.id}
											/>
											<input
												type="hidden"
												name="userId"
												defaultValue={userId}
											/>
											<button
												type="submit"
												className="flex items-center rounded-lg text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
												name="_action"
												value="POST_LIKE"
												onClick={() => setFromClicked(post.id)}
											>
												{getLikeState(post.id)}
											</button>
											<span className="text-xs ml-2">
												{post?.liked_user_ids?.length}
											</span>
										</Form>
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
