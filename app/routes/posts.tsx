import { useUser } from "@clerk/remix";
import { useEffect } from "react";
import CommentSlider from "~/components/comment/CommentSlider";
import Posts from "~/models/posts";
import Blob from "../components/utility/Blob";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { UserProject } from "~/types";
import ProjectCard from "~/components/projects/ProjectCard";
import useCommentView from "~/hooks/useCommentView";

export const loader: LoaderFunction = async () => {
	const projects = Posts.getAllUserProjects();
	return projects;
};

export default function Projects() {
	const navigate = useNavigate();
	const { user, isSignedIn } = useUser();
	const projects = useLoaderData<UserProject[]>();
	const [commentView, setCommentView, viewProject, handleCommentClick] =
		useCommentView(projects);

	useEffect(() => {
		if (!isSignedIn) return navigate("/");
	}, [navigate, isSignedIn]);

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
						{projects?.map((project, idx: number) => (
							<ProjectCard
								key={project.id + project.title}
								project={project}
								userId={user?.id}
								handleCommentClick={handleCommentClick}
								idx={idx}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
