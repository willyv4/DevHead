import { useState } from "react";
import { useDropzone } from "react-dropzone";

function useImageUploader() {
	const [image, setImage] = useState<string | null | undefined>(null);

	const onDrop = (acceptedFiles: File[]) => {
		console.log(acceptedFiles);
		const validFiles = acceptedFiles.filter((file) =>
			file.type.match(/image\/(png|jpg|jpeg)/)
		);

		console.log(validFiles);
		if (validFiles.length) {
			const fileReader = new FileReader();

			fileReader.onload = () => {
				setImage(fileReader.result as string);
			};

			fileReader.readAsDataURL(validFiles[0]);
		} else {
			alert("Selected images are not of a valid type!");
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: "image/jpeg, image/png" as unknown as undefined,
	});

	return [image, setImage, getRootProps, getInputProps];
}

export default useImageUploader;
