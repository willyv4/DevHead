import { PhotoIcon } from "@heroicons/react/20/solid";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import Alert from "~/components/utility/Alert";
import { useFormClear } from "~/hooks/useFormClear";
import useImageUpload from "~/hooks/useImageUpload";
import Input from "../../utility/Input";

const ProjectForm = ({ userId }: { userId: string | undefined }) => {
	const projectPost = useFetcher();
	const isAdding = projectPost.state === "submitting";
	const { ref: setFormRef } = useFormClear(isAdding);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [
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
	] = useImageUpload() as any;

	function presentButtonView() {
		return isAdding
			? "Saving..."
			: projectPost.state === "loading"
			? "Loading..."
			: "You're good to go!";
	}

	const handleClick = () => {
		setImage(null);
		setValidFile(null);
		setIsSubmitted(false);
	};

	useEffect(() => {
		if (projectPost?.data?.success && projectPost.state === "idle") {
			setImage(null);
		}
	}, [projectPost?.data?.success, projectPost.state, setImage]);

	return (
		<>
			{message && <Alert message={message} setMessage={setMessage} />}
			<projectPost.Form method="POST" action="/api/projects" ref={setFormRef}>
				<input defaultValue={userId} type="hidden" name="userId" />

				{image ? (
					<div className="flex justify-center">
						<button
							onClick={() => handleClick()}
							className="mt-1 ring-1 ring-rose-500 items-center w-12 flex flex-row absolute z-10 right-8 top-8  rounded bg-rose-300/30 px-2 py-1 text-xs font-semibold text-rose-600 shadow-sm hover:bg-rose-200/30"
						>
							<p className="mr-2">X</p>
							<PhotoIcon className="w-16" />
						</button>
						<img
							src={image}
							alt="preview"
							className="rounded w-full w-96 m-2 object-cover"
						/>
						<input defaultValue={image} type="hidden" name="projectImage" />
					</div>
				) : (
					<div className="mt-2 mb-8 flex justify-center rounded-lg border border-dashed border-gray-200/25 px-6 py-10">
						<div className="text-center">
							<PhotoIcon
								className="mx-auto h-12 w-12 text-gray-300"
								aria-hidden="true"
							/>
							<div {...getRootProps()}>
								<span>Upload a Project Image</span>
								<input {...getInputProps()} />

								{isLoading ? (
									<p className="py-4">UPLOADING ...</p>
								) : (
									<>
										<p className="pl-1">
											{isDragActive ? "Drop file here..." : "or drag and drop"}
										</p>
										<p className="text-sm">PNG, JPG up to 10MB</p>
									</>
								)}
							</div>
						</div>
					</div>
				)}

				<Input
					id={"file-upload"}
					type={"text"}
					name={"projectTitle"}
					placeholder={"Devhead"}
					title="Project Title"
					value={undefined}
					onChange={undefined}
				/>
				<Input
					id={undefined}
					type="text"
					name="projectLiveLink"
					placeholder="https://devhead.com"
					title="Project Live Link"
					value={undefined}
					onChange={undefined}
				/>
				<Input
					id={undefined}
					type="text"
					name="projectCodeLink"
					placeholder="https://github.com/user/devhead"
					title="Project Code Link"
					value={undefined}
					onChange={undefined}
				/>

				{!image ? (
					<div
						className="text-center w-full rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
						onClick={() => setMessage("Please fill out the form to submit!")}
					>
						Submit
					</div>
				) : (
					<button
						className="w-full rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
						type="submit"
						onClick={() => setSubmitted(true)}
					>
						{submitted ? presentButtonView() : "submit"}
					</button>
				)}
			</projectPost.Form>
		</>
	);
};

export default ProjectForm;
