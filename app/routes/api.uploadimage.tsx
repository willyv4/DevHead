import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	try {
		const api_key: string = process.env.CLOUDINARY_API_KEY || "";
		const formData = await request.formData();
		const file = formData.get("file") as unknown as string | Blob;

		const upload_preset = "ovbvlega";
		const cloudinaryUrl =
			"https://api.cloudinary.com/v1_1/dpozfwlj4/image/upload";

		const cloudinaryFormData = new FormData();
		cloudinaryFormData.append("file", file);
		cloudinaryFormData.append("upload_preset", upload_preset);
		cloudinaryFormData.append("api_key", api_key);

		const cloudinaryResponse = await fetch(cloudinaryUrl, {
			method: "POST",
			body: cloudinaryFormData,
		});

		if (cloudinaryResponse.ok) {
			const cloudinaryData = await cloudinaryResponse.json();
			console.log("Cloudinary response:", cloudinaryData);

			return json({ message: "success", data: cloudinaryData.secure_url });
		} else {
			console.error(
				"Cloudinary upload failed with status:",
				cloudinaryResponse.status
			);
			return json(
				{ error: "File upload to Cloudinary failed" },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error("Error handling file upload:", error);
		return json({ error: "File upload failed" }, { status: 500 });
	}
};