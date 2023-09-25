import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function useImageUpload() {
	const [image, setImage] = useState<string | null | undefined>(null);
	const [validFile, setValidFile] = useState<File | null>(null);
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);

	// Function to upload a file to the server
	async function uploadFileToServer(file: File | null) {
		if (file !== null) {
			try {
				const formData = new FormData();
				formData.append("file", file);

				// const url = "http://localhost:3000/";
				const url = "https://dev-head-willyv4.vercel.app/";

				const response = await fetch(`${url}api/images/upload`, {
					method: "POST",
					body: formData,
				});

				if (response.ok) {
					const { data } = await response.json();
					setImage(data);
					setIsLoading(false);
				} else {
					console.error("File upload to Cloudinary failed");
				}
			} catch (error) {
				console.error("Error uploading file:", error);
			}
		}
	}

	// Use useEffect to trigger file upload when a valid file is selected
	useEffect(() => {
		if (validFile && !isSubmitted) {
			uploadFileToServer(validFile);
			setIsLoading(true);
			setIsSubmitted(true);
		}
	}, [validFile, isSubmitted]);

	// Function to handle file drop
	const onDrop = (files: File[]) => {
		// Filter out valid image files (PNG, JPG, JPEG)
		const validFiles = files.filter((f) =>
			f.type.match(/image\/(png|jpg|jpeg)/)
		);

		if (validFiles.length) {
			setValidFile(validFiles[0]);
		} else {
			setMessage(
				"Invalid file format! Please select a PNG, JPG, or JPEG image."
			);
		}
	};

	// UseDropzone hook to manage file drop functionality
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { "image/*": [] },
	});

	return [
		image,
		getRootProps,
		getInputProps,
		isDragActive,
		setImage,
		setValidFile,
		setIsSubmitted,
		isLoading,
		message,
		setMessage,
	];
}

export default useImageUpload;
