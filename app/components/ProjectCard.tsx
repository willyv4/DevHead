import { Link } from "@remix-run/react";
import type { UserProject } from "~/types";
import ProjectButtonGroup from "./ProjectButtonGroup";

type Props = {
	project: UserProject;
	userId: string | undefined;
	handleCommentClick: (idx: number) => void;
	idx: number;
};

const ProjectCard: React.FC<Props> = ({
	project,
	userId,
	handleCommentClick,
	idx,
}) => {
	return (
		<div
			key={project.id + project.title}
			className="w-[300px] flex flex-row m-4 align-items rounded-xl"
		>
			<div className="ring-2 ring-gray-700 relative isolate flex flex-col justify-between overflow-hidden rounded-lg bg-gray-900 px-8 pb-8 pt-80">
				<img
					src={project.image_url}
					alt=""
					className="absolute inset-0 -z-10 h-full w-full object-cover"
				/>
				<div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/60" />
				<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

				<div className="absolute -ml-8 flex-col top-0 left-0leading-6 text-gray-100 bg-gradient-to-b from-gray-900 to-transparent w-full h-28 pl-6 pt-4">
					<h3 className="text-xl font-bold -mt-2 -ml-4">{project.title}</h3>
				</div>

				<Link
					className="absolute flex-col bottom-11 left-0 leading-6 text-gray-100 w-full h-10 pl-6 pt-4"
					to={`/user/view/${project.user_id}`}
				>
					<span className="-ml-5 inline-flex items-center rounded-md bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-500/20">
						By: {project.author_first_name} {project.author_last_name}
					</span>
				</Link>

				<ProjectButtonGroup
					project={project}
					userId={userId}
					handleCommentClick={handleCommentClick}
					idx={idx}
				/>
			</div>
		</div>
	);
};

export default ProjectCard;
