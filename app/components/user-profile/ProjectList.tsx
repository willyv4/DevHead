import {
	ArrowPathIcon,
	CodeBracketIcon,
	ComputerDesktopIcon,
	HeartIcon,
	PlusIcon,
	// WrenchIcon,
} from "@heroicons/react/20/solid";
import { Form, Link, useNavigation } from "@remix-run/react";
import { useState } from "react";
import Modal from "../Modal";
import CommentSlider from "../user-view/CommentSlider";
import EditButtonView from "./EditButtonView";
// import EmptyStatus from "./EmptyStatus";
import EditPostForm from "./forms/EditPostForm";
import ProjectDeleteForm from "./forms/ProjectDeleteForm";
import ProjectForm from "./forms/ProjectForm";
import ProjectUpdateForm from "./forms/ProjectUpdateForm";

type UserProject = {
	id: number;
	image_url: string;
	title: string;
	code_link: string;
	live_link: string;
	like_count: string[] | null;
	liked_user_ids: string[];
	comment_count: string;
};

type Props = {
	userId: string | undefined;
	userProjects: UserProject[];
};

const ProjectList: React.FC<Props> = ({ userId, userProjects }) => {
	const [editButton, setEditButton] = useState(false);
	const [addButton, setAddButton] = useState(false);
	const [project, setProject] = useState<UserProject | null>(null);
	const [editFormView, setEditFormView] = useState(false);
	const [commentView, setCommentView] = useState<boolean>(false);
	const [viewProject, setViewProject] = useState<UserProject | null>(null);
	const [formClicked, setFromClicked] = useState<number | null>(null);
	// const [isClicked, setIsClicked] = useState<boolean>(false);
	const navigation = useNavigation();

	const handleClick = (index: number | null) => {
		if (userProjects && index) {
			const projectToEdit = userProjects[index - 1];
			setProject(projectToEdit);
			setEditFormView(!editFormView ? true : false);
		}
	};

	const handleCommentClick = (idx: number) => {
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

	// const ProjectModal = (
	// 	<button className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400/5">
	// 		Loading Projects...
	// 	</button>
	// );

	// // function loadingState() {
	// // 	if (
	// // 		isClicked &&
	// // 		(navigation.state === "loading" || navigation.state === "submitting")
	// // 	) {
	// // 		return (
	// // 			<div className="my-20 w-full animate-pulse">
	// // 				<EmptyStatus
	// // 					Icon={<WrenchIcon height="2.5rem" width="2.5rem" />}
	// // 					ModalButton={ProjectModal}
	// // 				/>
	// // 			</div>
	// // 		);
	// // 	}
	// // }

	return (
		<div className="flex-col justify-center mt-10">
			<div className="flex flex-row justify-between border-b border-gray-950 pb-5">
				<h3 className="text-xl font-bold leading-6 text-gray-300">
					<div className="flex flex-row ml-5">
						<p className="ml-2">Projects</p>
					</div>
				</h3>
				<div className="flex flex-row mr-4">
					<div>
						<button
							onClick={() => setAddButton(addButton === false ? true : false)}
							type="submit"
							className="mr-2 flex flex-row rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400/5"
						>
							AddProject <PlusIcon className="h-4 w-4 ml-2 mt-[2px]" />
						</button>
					</div>
					<EditButtonView
						userProjectCount={userProjects?.length}
						editButton={editButton}
						setEditButton={setEditButton}
					/>
				</div>
			</div>

			{(!userProjects || userProjects.length < 1 || addButton) && (
				<Modal
					FormComponent={
						<ProjectForm
							userId={userId}
							setOpen={setAddButton}
							// setIsClicked={setIsClicked}
						/>
					}
					open={addButton}
					setOpen={setAddButton}
				/>
			)}

			{editFormView && (
				<Modal
					FormComponent={
						<ProjectUpdateForm
							userId={userId}
							project={project}
							setOpen={setEditFormView}
						/>
					}
					open={editFormView}
					setOpen={setEditFormView}
				/>
			)}

			<CommentSlider
				userId={userId}
				open={commentView}
				setOpen={setCommentView}
				viewProject={viewProject}
				action={"./comments/"}
			/>

			{userProjects.length === 0 && (
				<div className="text-center h-36 mt-16 font-bold text-l">
					NO PROJECTS YET
				</div>
			)}

			<div className="carousel rounded-box flex flex-row ml-4">
				{userProjects?.map((post, idx) => (
					<div
						key={post.id + post.title}
						className="carousel-item w-[300px] mx-2 my-6 justify-center align-items rounded-xl pl-2"
					>
						<div className="ring-2 ring-gray-400/20 relative isolate flex flex-col justify-between overflow-hidden rounded-lg bg-gray-900 px-8 pb-8 pt-80">
							{editButton && (
								<>
									<ProjectDeleteForm postId={post.id} />
									<EditPostForm handleClick={handleClick} index={idx} />
								</>
							)}

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
										className="mr-[1px] flex items-center px-2 py-1 bg-gray-400/5 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
									>
										Site
										<ComputerDesktopIcon className="w-5 ml-2" />
									</a>

									<a
										target="_blank"
										href={post.live_link}
										className="mr-[1px] flex items-center bg-gray-400/5 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
										rel="noreferrer"
									>
										Code
										<CodeBracketIcon className="w-5 ml-2" />
									</a>

									<Link
										preventScrollReset={true}
										onClick={() => handleCommentClick(idx + 1)}
										to={`./comments/${post.id}`}
										prefetch="intent"
										className=" mr-[1px] flex items-center px-2 py-2 bg-gray-400/5 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
									>
										Comments{" "}
										<span className="text-xs ml-2">{post?.comment_count}</span>
									</Link>

									{userId && post?.liked_user_ids?.includes(userId) ? (
										<Form
											method="post"
											className="flex flex-row flex items-center px-2 py-2 bg-gray-400/5 text-xs font-semibold text-white shadow-sm hover:bg-gray-50/30"
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
												{/* <HeartIcon className="w-5 text-rose-500" /> */}
												{getUnlikeState(post.id)}
											</button>
											<span className="text-xs ml-2">
												{post?.liked_user_ids?.length}
											</span>
										</Form>
									) : (
										<Form
											method="post"
											className="flex flex-row flex items-center px-2 py-2 bg-gray-400/5 text-xs font-semibold text-white shadow-sm hover:bg-gray/30"
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

export default ProjectList;
