import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Modal from "../../utility/Modal";
import CommentSlider from "../../comment/CommentSlider";
import EditButtonView from "./EditButtonView";
import ProjectForm from "../../projects/forms/PostProjectForm";
import ProjectUpdateForm from "../../projects/forms/UpdateProjectForm";
import type { UserProject } from "../../../types";
import ProjectCarousel from "~/components/projects/ProjectCarousel";
import useCommentView from "~/hooks/useCommentView";

type Props = {
	userId: string | undefined;
	userProjects: UserProject[];
};

const ProjectList: React.FC<Props> = ({ userId, userProjects }) => {
	const [editButton, setEditButton] = useState(false);
	const [addButton, setAddButton] = useState(false);
	const [project, setProject] = useState<UserProject | null>(null);
	const [editFormView, setEditFormView] = useState(false);
	const [commentView, setCommentView, viewProject, handleCommentClick] =
		useCommentView(userProjects);

	const handleEditClick = (index: number | null) => {
		if (userProjects && index) {
			const projectToEdit = userProjects[index - 1];
			setProject(projectToEdit);
			setEditFormView(!editFormView ? true : false);
		}
	};

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
					FormComponent={<ProjectForm userId={userId} />}
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
			<ProjectCarousel
				userProjects={userProjects}
				editButton={editButton}
				handleEditClick={handleEditClick}
				handleCommentClick={handleCommentClick}
				userId={userId}
			/>
		</div>
	);
};

export default ProjectList;
