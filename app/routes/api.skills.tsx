import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json } from "react-router";
import { Skills } from "~/models/skills";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	const formData = await request.formData();
	const { skillId, userId, skill } = Object.fromEntries(formData);

	if (request.method === "DELETE") {
		return await Skills.removeSkill(Number(skillId));
	}

	if (request.method === "POST") {
		return await Skills.addSkill(userId.toString(), skill.toString());
	}

	return json({ success: false });
};
