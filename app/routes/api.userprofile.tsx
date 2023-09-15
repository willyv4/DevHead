import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json } from "react-router";
import { User } from "~/models/users";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	try {
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
			await User.updateUser(
				userId.toString(),
				firstName.toString(),
				lastName.toString(),
				userEmail.toString(),
				userImage.toString(),
				profileTitle.toString()
			);

			return json({ success: true, status: 200 });
		}

		if (request.method === "PUT" && userBio) {
			await User.addUserBio(userId.toString(), userBio.toString());
			return json({ success: true, status: 200 });
		}

		if (request.method === "POST" && githubUsername && userId) {
			await User.connectGithub(userId.toString(), githubUsername.toString());
			return json({ success: true, status: 201 });
		}

		if (request.method === "POST" && leetcodeUsername && userId) {
			await User.connectLeetcode(
				userId.toString(),
				leetcodeUsername.toString()
			);
			return json({ success: true, status: 200 });
		}
	} catch (error) {
		return json({ success: false, status: 500, error: error });
	}
};
