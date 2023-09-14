import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json } from "react-router";
import { User } from "~/models/users";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	const formData = await request.formData();
	const {
		userId,
		firstName,
		lastName,
		userEmail,
		userImage,
		profileTitle,
		userBio,
		githubUsername,
		leetcodeUsername,
	} = Object.fromEntries(formData);

	if (request.method === "PUT" && !userBio) {
		return await User.updateUser(
			userId.toString(),
			firstName.toString(),
			lastName.toString(),
			userEmail.toString(),
			userImage.toString(),
			profileTitle.toString()
		);
	}

	if (request.method === "PUT" && userBio) {
		await User.addUserBio(userId.toString(), userBio.toString());
		return json({ success: true });
	}

	if (request.method === "POST" && githubUsername && userId) {
		await User.connectGithub(userId.toString(), githubUsername.toString());
		return json({ success: true });
	}

	if (request.method === "POST" && leetcodeUsername && userId) {
		await User.connectLeetcode(userId.toString(), leetcodeUsername.toString());
		return json({ success: true });
	}
	return json({ success: false });
};
