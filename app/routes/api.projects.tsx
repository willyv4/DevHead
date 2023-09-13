import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json } from "react-router";
import Projects from "~/models/posts";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	const formData = await request.formData();
	const {
		userId,
		projectImage,
		projectTitle,
		projectLiveLink,
		projectCodeLink,
		projectId,
	} = Object.fromEntries(formData);

	if (request.method === "PUT") {
		return await Projects.updateUserProject(
			Number(projectId),
			userId.toString(),
			projectImage.toString(),
			projectTitle.toString(),
			projectCodeLink.toString(),
			projectLiveLink.toString()
		);
	}

	if (request.method === "POST") {
		return await Projects.addUserProject(
			userId.toString(),
			projectImage.toString(),
			projectTitle.toString(),
			projectLiveLink.toString(),
			projectCodeLink.toString()
		);
	}

	if (request.method === "DELETE") {
		return await Projects.deleteProjectById(Number(projectId));
	}

	return json({ success: false });
};
