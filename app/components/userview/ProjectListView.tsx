import useCommentView from "~/hooks/useCommentView";
import ProjectCarousel from "../projects/ProjectCarousel";
import CommentSlider from "../comment/CommentSlider";
import type { UserProject } from "~/types";

type Props = {
	userProjects: UserProject[];
	userId: string | undefined;
};

const ProjectListView: React.FC<Props> = ({ userId, userProjects }) => {
	const [commentView, setCommentView, viewProject, handleCommentClick] =
		useCommentView(userProjects);

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

			<ProjectCarousel
				userProjects={userProjects}
				editButton={null}
				handleEditClick={() => null}
				handleCommentClick={handleCommentClick}
				userId={userId}
			/>
		</div>
	);
};

export default ProjectListView;
