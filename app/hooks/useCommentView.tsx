import { useState } from "react";
import type { UserProject } from "~/types";

const useCommentView = (userProjects: UserProject[]) => {
	const [commentView, setCommentView] = useState<boolean>(false);
	const [viewProject, setViewProject] = useState<UserProject | null>(null);

	const handleCommentClick: any = (idx: number) => {
		if (userProjects) {
			setViewProject(userProjects[idx - 1]);
			setCommentView(!commentView);
		}
	};

	return [commentView, setCommentView, viewProject, handleCommentClick];
};

export default useCommentView;
