import {
	CodeBracketIcon,
	ComputerDesktopIcon,
	HeartIcon,
} from "@heroicons/react/20/solid";
import { Form } from "@remix-run/react";
import { useState } from "react";
import CommentSlider from "./CommentSlider";

type UserProject = {
	id: number;
	image_url: string;
	title: string;
	code_link: string;
	live_link: string;
	like_count: string[] | null;
};

type Props = {
	userProjects: UserProject[] | null | undefined;
	userId: string | undefined;
	projectLikes: number[];
};

const ProjectListView: React.FC<Props> = ({
	userId,
	userProjects,
	projectLikes,
}) => {
	const [commentView, setCommentView] = useState<boolean>(false);
	const [viewProject, setViewProject] = useState<UserProject | null>(null);

	const handleClick = (idx: number) => {
		if (userProjects) {
			const pickedProject = userProjects[idx - 1];
			setViewProject(pickedProject);
			setCommentView(commentView ? false : true);
		}
	};

	return (
		<div className="flex-col justify-center mt-20">
			<div className="border-b border-gray-200 pb-5">
				<h3 className="text-base font-semibold leading-6 text-gray-900">
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
			/>

			<div className="flex flex-row flex-wrap mt-10 justify-center">
				{userProjects?.map((post, idx) => (
					<div
						key={post.id + post.title}
						className="w-[300px] mx-2 my-6 justify-center align-items"
					>
						<div className="relative isolate flex flex-col justify-end overflow-hidden rounded-lg bg-gray-900 px-8 pb-8 pt-80">
							<img
								src={post.image_url}
								alt=""
								className="absolute inset-0 -z-10 h-full w-full object-cover"
							/>
							<div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/60" />
							<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

							<div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
								<div className="-ml-4 flex items-center gap-x-4">
									<svg
										viewBox="0 0 2 2"
										className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
									>
										<circle cx={1} cy={1} r={1} />
									</svg>
								</div>
							</div>

							<h3 className="absolute top-0 left-0 text-lg font-semibold leading-6 text-white bg-gradient-to-b from-gray-900 to-transparent w-full h-28 pl-6 pt-4">
								{post.title}
							</h3>

							<div className="-mb-6 -ml-7">
								<div className="flex flex-row">
									<a
										rel="noreferrer"
										target="_blank"
										href={`https://${post.live_link}`}
										className="ml-1 flex items-center px-2 py-1 rounded-lg bg-indigo-400 px-2 py-1 text-indigo-950 text-xs font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
									>
										Site
										<ComputerDesktopIcon className="w-4 ml-1" />
									</a>

									<a
										target="_blank"
										href={`https://${post.code_link}`}
										className="ml-2 flex items-center px-2 py-1 rounded-lg bg-indigo-400 px-2 py-1 text-indigo-950  text-xs font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
										rel="noreferrer"
									>
										Code
										<CodeBracketIcon className="w-4 ml-1" />
									</a>

									<button
										onClick={() => handleClick(idx + 1)}
										className="ml-2 flex items-center px-2 py-1 rounded-lg bg-indigo-400 px-2 py-1 text-indigo-950  text-xs font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
									>
										Comments
									</button>

									{projectLikes.includes(post.id) ? (
										<Form method="post" className="flex flex-row ml-2">
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
												className="flex items-center rounded-lg px-2 py-1 text-xs font-semibold text-white shadow-sm  hover:bg-gray-50/20"
												name="_action"
												value="POST_UNLIKE"
											>
												<HeartIcon className="w-5  text-rose-500" />
											</button>
											<span className="text-xs mt-[5px]">
												{post.like_count}
											</span>
										</Form>
									) : (
										<Form method="post" className="flex flex-row">
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
												className="flex items-center rounded-lg px-2 py-1 text-xs font-semibold text-white shadow-sm  hover:bg-gray-50/20"
												name="_action"
												value="POST_LIKE"
											>
												<HeartIcon className="w-5" />
											</button>
											<span className="text-xs mt-[5px]">
												{post.like_count}
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
