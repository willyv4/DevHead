import {
	CodeBracketIcon,
	ComputerDesktopIcon,
	PlusIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import Modal from "../Modal";
import EditButtonView from "./EditButtonView";
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
};

type Props = {
	userId: string | undefined;
	userProjects: UserProject[] | null | undefined;
};

const ProjectList: React.FC<Props> = ({ userId, userProjects }) => {
	const [editButton, setEditButton] = useState(false);
	const [addButton, setAddButton] = useState(false);
	const [project, setProject] = useState<UserProject | null>(null);
	const [editFormView, setEditFormView] = useState(false);

	const handleClick = (index: number | null) => {
		if (userProjects && index) {
			const projectToEdit = userProjects[index - 1];
			setProject(projectToEdit);
			setEditFormView(!editFormView ? true : false);
		}
	};

	return (
		<div className="flex-col justify-center">
			<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
				My Projects
			</h2>

			{(!userProjects || userProjects.length < 1 || addButton) && (
				<Modal
					FormComponent={<ProjectForm userId={userId} setOpen={setAddButton} />}
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

			<EditButtonView
				userProjectCount={userProjects?.length}
				editButton={editButton}
				setEditButton={setEditButton}
			/>

			<button
				onClick={() => setAddButton(addButton === false ? true : false)}
				type="submit"
				className="flex flex-row rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-1"
			>
				AddProject <PlusIcon className="h-4 w-4 ml-2 mt-[2px]" />
			</button>

			<div className="flex flex-row flex-wrap mt-10 justify-center">
				{userProjects?.map((post, idx) => (
					<div
						key={post.id + post.title}
						className="w-[300px] mx-2 my-6 justify-center align-items"
					>
						<div className="relative isolate flex flex-col justify-end overflow-hidden rounded-lg bg-gray-900 px-8 pb-8 pt-80">
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

							<div className="flex flex-row">
								<a
									rel="noreferrer"
									target="_blank"
									href={`https://${post.live_link}`}
									className="mr-2 flex items-center rounded-lg bg-white/10 px-2 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50/20"
								>
									Site
									<ComputerDesktopIcon className="w-5 ml-2" />
								</a>

								<a
									target="_blank"
									href={`https://${post.code_link}`}
									className="flex items-center rounded-lg bg-white/10 px-2 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50/20"
									rel="noreferrer"
								>
									Code
									<CodeBracketIcon className="w-5 ml-2" />
								</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectList;
