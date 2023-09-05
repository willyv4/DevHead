import { useState } from "react";
// import type { Accept } from "react-dropzone";
import { useDropzone } from "react-dropzone";

function useImageUploader() {
	const [image, setImage] = useState<string | null | undefined>(null);

	const onDrop = (acceptedFiles: File[]) => {
		const validFiles = acceptedFiles.filter((file) =>
			file.type.match(/image\/(png|jpg|jpeg)/)
		);

		console.log(validFiles);
		if (validFiles.length) {
			const fileReader = new FileReader();
			fileReader.onload = () => setImage(fileReader.result as string);
			fileReader.readAsDataURL(validFiles[0]);
		} else {
			alert("Selected images are not of a valid type!");
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return [image, getRootProps, getInputProps, isDragActive, setImage];
}

export default useImageUploader;
