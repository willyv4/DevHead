import {
	CodeBracketIcon,
	ComputerDesktopIcon,
	HeartIcon,
} from "@heroicons/react/20/solid";
import { Form } from "@remix-run/react";
// import { useState } from "react";

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
	userId: string;
};

const ProjectListView: React.FC<Props> = ({ userId, userProjects }) => {
	// const [projectId, setProjectId] = useState<UserProject | null>(null);

	// const handleClick = (index: number | null) => {
	// 	if (userProjects && index) {
	// 		const projectToEdit = userProjects[index - 1];
	// 		setProjectId(projectToEdit);
	// 	}
	// };

	return (
		<div className="flex-col justify-center mt-20">
			<div className="border-b border-gray-200 pb-5">
				<h3 className="text-base font-semibold leading-6 text-gray-900">
					<div className="flex flex-row ml-5">
						<p className="ml-2">Projects</p>
					</div>
				</h3>
			</div>

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

							<div className="flex flex-row justfiy-between">
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

								<Form method="post">
									<input type="hidden" name="projectId" value={post.id} />
									<input type="hidden" name="userId" value={userId} />
									<button
										type="submit"
										className="flex items-center rounded-lg px-2 py-1 text-xs font-semibold text-white shadow-sm  hover:bg-gray-50/20"
									>
										<HeartIcon className="w-5" />
									</button>
								</Form>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectListView;
