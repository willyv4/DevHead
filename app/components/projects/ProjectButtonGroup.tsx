import {
	CodeBracketIcon,
	ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import LikeDeleteForm from "~/components/likes/LikeDeleteForm";
import LikePostForm from "~/components/likes/likePostForm";
import type { UserProject } from "~/types";

type Props = {
	project: UserProject;
	userId: string | undefined;
	handleCommentClick: (idx: number) => void;
	idx: number;
};

const ProjectButtonGroup: React.FC<Props> = ({
	project,
	userId,
	handleCommentClick,
	idx,
}) => {
	function renderFormView() {
		return userId && project?.liked_user_ids?.includes(userId) ? (
			<LikeDeleteForm
				userId={userId}
				postId={project.id}
				likeCount={project?.liked_user_ids?.length}
			/>
		) : (
			<LikePostForm
				userId={userId}
				postId={project.id}
				likeCount={project?.liked_user_ids?.length}
			/>
		);
	}

	return (
		<div className="-mb-6 bg-gray-800/30 w-[300px] -ml-8 -mb-8">
			<div className="grid grid-flow-col justify-stretch">
				<a
					rel="noreferrer"
					target="_blank"
					href={project.code_link}
					className="mr-[1px] flex items-center px-2 py-2 bg-gray-400/5 text-xs font-semibold text-white shadow-sm  hover:bg-gray-50/30"
				>
					Site
					<ComputerDesktopIcon className="w-4 ml-1" />
				</a>

				<a
					target="_blank"
					href={project.live_link}
					className="mr-[1px] flex items-center px-2 py-2 bg-gray-400/5 text-xs font-semibold text-white shadow-sm  hover:bg-gray-50/30"
					rel="noreferrer"
				>
					Code
					<CodeBracketIcon className="w-4 ml-1" />
				</a>

				<Link
					preventScrollReset={true}
					onClick={() => handleCommentClick(idx + 1)}
					to={`./comments/${project.id}`}
					prefetch="intent"
					className="mr-[1px] flex items-center px-2 py-2 bg-gray-400/5 text-xs font-semibold text-white shadow-sm  hover:bg-gray-50/30"
				>
					Comments
					<span className="text-xs ml-2">{project.comment_count}</span>
				</Link>

				{renderFormView()}
			</div>
		</div>
	);
};

export default ProjectButtonGroup;
