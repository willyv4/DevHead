import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  console.log("📨 Incoming request to /upload endpoint");

  if (request.method !== "POST") {
    console.log("❌ Invalid request method:", request.method);
    return json({ error: `Invalid Method`, status: 500 });
  }

  try {
    const api_key: string = process.env.CLOUDINARY_API_KEY || "";
    console.log("🔑 CLOUDINARY_API_KEY loaded:", !!api_key);

    const formData = await request.formData();
    console.log("🧾 Received formData");

    const file = formData.get("file") as string | Blob;
    console.log("📸 File found in formData:", !!file);

    const upload_preset = "ovbvlega";
    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/dpozfwlj4/image/upload";

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", upload_preset);
    cloudinaryFormData.append("api_key", api_key);

    console.log("📤 Sending request to Cloudinary...");

    const cloudinaryResponse = await fetch(cloudinaryUrl, {
      method: "POST",
      body: cloudinaryFormData,
    });

    console.log("📥 Cloudinary response status:", cloudinaryResponse.status);

    if (cloudinaryResponse.ok) {
      const cloudinaryData = await cloudinaryResponse.json();
      console.log("✅ Upload successful:", cloudinaryData);
      return json({ success: true, data: cloudinaryData.secure_url });
    } else {
      const errText = await cloudinaryResponse.text();
      console.log("❌ Upload failed:", errText);
      return json({ error: `File upload failed`, status: 500 });
    }
  } catch (error) {
    console.log("🔥 Upload error caught:", error);
    return json({ error: `File upload failed: ${error}`, status: 500 });
  }
};
