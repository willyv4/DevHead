import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	try {
		const api_key: string = process.env.CLOUDINARY_API_KEY || "";
		const formData = await request.formData();
		const file = formData.get("file") as string | Blob;

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
			return json({ success: true, data: cloudinaryData.secure_url });
		} else {
			return json({ error: `File upload failed`, status: 500 });
		}
	} catch (error) {
		return json({ error: `File upload failed: ${error}`, status: 500 });
	}
};

// PUT or POST at /images:upload
