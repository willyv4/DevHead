import { useUser } from "@clerk/remix";
import {
	CodeBracketIcon,
	ComputerDesktopIcon,
	HeartIcon,
	ArrowPathIcon,
} from "@heroicons/react/24/solid";
import type {
	ActionArgs,
	ActionFunction,
	LoaderFunction,
} from "@remix-run/node";
import {
	Form,
	Link,
	useLoaderData,
	useNavigate,
	useNavigation,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import CommentSlider from "~/components/user-view/CommentSlider";
import { Likes } from "~/models/likes";
import Posts from "~/models/posts";
import Blob from "../components/Blob";

type UserProject = {
	id: number;
	image_url: string;
	title: string;
	code_link: string;
	live_link: string;
	like_count: string[] | null;
	comments: any;
	comment_count: string;
	liked_user_ids: string[];
	author_first_name: string;
	author_last_name: string;
	user_id: string;
};

type Projects = {
	projects: UserProject[] | null | undefined;
};

export const loader: LoaderFunction = async () => {
	const projects = Posts.getAllUserProjects();

	return projects;
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as unknown as {
		_action: string;
		userId: string;
		projectId: number;
		comment: string;
		commentId: number;
		userBeingFollowed: string;
	};

	if (data._action === "POST_LIKE") {
		return await Likes.addLike(data.userId, data.projectId);
	}

	if (data._action === "POST_UNLIKE") {
		return await Likes.removeLike(data.userId, data.projectId);
	}
};

export default function Projects() {
	const { user } = useUser();
	const projects = useLoaderData<Projects | any>();
	const [commentView, setCommentView] = useState<boolean>(false);
	const [viewProject, setViewProject] = useState<UserProject | null>(null);
	const [formClicked, setFromClicked] = useState<number | null>(null);
	const navigate = useNavigate();
	const { isSignedIn } = useUser();
	const navigation = useNavigation();

	useEffect(() => {
		if (!isSignedIn) return navigate("/");
	}, [navigate, isSignedIn]);

	const handleClick = (idx: number) => {
		if (projects) {
			const pickedProject = projects[idx - 1];
			setViewProject(pickedProject);
			setCommentView(!commentView);
		}
	};

	console.log("PROJECTS", projects);

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
		<>
			<div className="border-b border-gray-950 pb-5 mt-28 px-8">
				<h3 className="text-base font-semibold leading-6 text-gray-50">
					Projects & Contributions 🔨
				</h3>
				<p className="mt-2 max-w-4xl text-sm text-gray-400">
					Dive in and Discover a range of projects and contributions from our
					talented community. Explore, learn, and get inspired by the
					code-driven solutions shared here.
				</p>
			</div>

			<Blob />

			<div className="container justify-center mx-auto">
				<div className="flex-col justify-center mt-12">
					<CommentSlider
						userId={user?.id}
						open={commentView}
						setOpen={setCommentView}
						viewProject={viewProject}
						action={"./comments/"}
					/>

					<div className="rounded-box flex flex-row flex-wrap justify-center mt-10">
						{projects?.map((post: UserProject, idx: number) => (
							<div
								key={post.id + post.title}
								className="w-[300px] flex flex-row m-4 align-items rounded-xl"
							>
								<div className="ring-2 ring-gray-700 relative isolate flex flex-col justify-between overflow-hidden rounded-lg bg-gray-900 px-8 pb-8 pt-80">
									<img
										src={post.image_url}
										alt=""
										className="absolute inset-0 -z-10 h-full w-full object-cover"
									/>
									<div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/60" />
									<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

									<div className="absolute -ml-8 flex-col top-0 left-0leading-6 text-gray-100 bg-gradient-to-b from-gray-900 to-transparent w-full h-28 pl-6 pt-4">
										<h3 className="text-xl font-bold -mt-2 -ml-4">
											{post.title}
										</h3>
									</div>

									<Link
										className="absolute flex-col bottom-11 left-0 leading-6 text-gray-100 w-full h-10 pl-6 pt-4"
										to={`/user/view/${post.user_id}`}
									>
										<span className="-ml-5 inline-flex items-center rounded-md bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-500/20">
											By: {post.author_first_name} {post.author_last_name}
										</span>
									</Link>

									<div className="-mb-6 bg-gray-800/30 w-[300px] -ml-8 -mb-8">
										<div className="grid grid-flow-col justify-stretch">
											<a
												rel="noreferrer"
												target="_blank"
												href={post.code_link}
												className="mr-[1px] flex items-center px-2 py-1 bg-white/20 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
											>
												Site
												<ComputerDesktopIcon className="w-4 ml-1" />
											</a>

											<a
												target="_blank"
												href={post.live_link}
												className="mr-[1px] flex items-center bg-white/20 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
												rel="noreferrer"
											>
												Code
												<CodeBracketIcon className="w-4 ml-1" />
											</a>

											<Link
												preventScrollReset={true}
												onClick={() => handleClick(idx + 1)}
												to={`./comments/${post.id}`}
												prefetch="intent"
												className=" mr-[1px] flex items-center px-2 py-2 bg-white/20 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
											>
												Comments{" "}
												<span className="text-xs ml-2">
													{post.comment_count}
												</span>
											</Link>

											{user?.id && post?.liked_user_ids?.includes(user?.id) ? (
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
														defaultValue={user?.id}
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
														defaultValue={user?.id}
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
			</div>
		</>
	);
}
