import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json } from "react-router";
import { Skills } from "../models/skills";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	try {
		const formData = await request.formData();
		const { skillId, userId, skill } = Object.fromEntries(formData);

		if (request.method === "DELETE") {
			await Skills.removeSkill(Number(skillId));
			return json({ success: true, status: 200 });
		}

		if (request.method === "POST") {
			await Skills.addSkill(userId.toString(), skill.toString());
			return json({ success: true, status: 201 });
		}
	} catch (error) {
		return json({
			success: false,
			status: 500,
			message: `failed to ${request.method} Skill!`,
			error: error,
		});
	}
};
