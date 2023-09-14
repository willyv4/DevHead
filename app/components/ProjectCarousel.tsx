import ProjectButtonGroup from "./ProjectButtonGroup";
import ProjectDeleteForm from "./user-profile/projects/forms/DeleteProjectForm";
import EditPostButton from "./user-profile/projects/EditPostButton";
import type { UserProject } from "~/types";

type Props = {
	userProjects: UserProject[];
	editButton: boolean | null;
	handleEditClick: (index: number) => void;
	handleCommentClick: () => void;
	userId: string | undefined;
};

const ProjectCarousel: React.FC<Props> = ({
	userProjects,
	editButton,
	handleEditClick,
	handleCommentClick,
	userId,
}) => {
	return (
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
								<EditPostButton handleClick={handleEditClick} index={idx} />
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

						<ProjectButtonGroup
							project={post}
							userId={userId}
							handleCommentClick={handleCommentClick}
							idx={idx}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProjectCarousel;
