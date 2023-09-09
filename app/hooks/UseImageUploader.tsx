import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function useImageUploader() {
	const [image, setImage] = useState<string | null | undefined>(null);
	const [validFile, setValidFile] = useState<File | null>(null);
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function uploadFileToServer(file: File | null) {
		if (file !== null) {
			try {
				console.log("Valid File:", file);
				const formData = new FormData();
				formData.append("file", file);

				// const url = "http://localhost:3000/";
				const url = "https://dev-head-willyv4.vercel.app/";

				const response = await fetch(`${url}${"api/uploadimage"}`, {
					method: "POST",
					body: formData,
				});

				if (response.ok) {
					const { data } = await response.json();
					setImage(data);
					setIsLoading(false);
					console.log("File uploaded to Cloudinary:", data);
				} else {
					console.error("File upload to Cloudinary failed");
				}
			} catch (error) {
				console.error("Error uploading file:", error);
			}
		}
	}

	useEffect(() => {
		if (validFile && !isSubmitted) {
			uploadFileToServer(validFile);
			setIsLoading(true);
			setIsSubmitted(true);
		}
	}, [validFile, isSubmitted]);

	const onDrop = (files: File[]) => {
		const validFiles = files.filter((f) =>
			f.type.match(/image\/(png|jpg|jpeg)/)
		);

		if (validFiles.length) setValidFile(validFiles[0]);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { "image/*": [] },
		maxSize: 1024 * 1000,
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
	];
}

export default useImageUploader;
