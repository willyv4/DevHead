import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json } from "react-router";
import Projects from "~/models/posts";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	try {
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
			await Projects.updateUserProject(
				Number(projectId),
				userId.toString(),
				projectImage.toString(),
				projectTitle.toString(),
				projectCodeLink.toString(),
				projectLiveLink.toString()
			);

			return json({ success: true, status: 200 });
		}

		if (request.method === "POST") {
			await Projects.addUserProject(
				userId.toString(),
				projectImage.toString(),
				projectTitle.toString(),
				projectLiveLink.toString(),
				projectCodeLink.toString()
			);

			return json({ success: true, status: 201 });
		}

		if (request.method === "DELETE") {
			await Projects.deleteProjectById(Number(projectId));
			return json({ success: true, status: 200 });
		}
	} catch (error) {
		return json({ success: false, status: 500, error: error });
	}
};
