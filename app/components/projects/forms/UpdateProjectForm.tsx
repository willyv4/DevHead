import { PhotoIcon } from "@heroicons/react/20/solid";
import { useFetcher } from "@remix-run/react";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import Alert from "~/components/utility/Alert";
import { useFormClear } from "~/hooks/useFormClear";
import useImageUpload from "~/hooks/useImageUpload";
import Input from "../../utility/Input";

type Project = {
	id: string | number;
	image_url: string;
	title: string;
	code_link: string;
	live_link: string;
	like_count: string[] | null;
};
type Props = {
	userId: string | undefined;
	project: Project | null;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectUpdateForm: React.FC<Props> = ({ userId, project, setOpen }) => {
	const projectPut = useFetcher();
	const isAdding = projectPut.state === "loading";
	const { ref: setFormRef } = useFormClear(isAdding);
	const INITIAL_STATE = {
		imageUrl: project?.image_url,
		projectTitle: project?.title,
		projectCodeLink: project?.code_link,
		projectLiveLink: project?.live_link,
		projectLikeCount: project?.like_count,
	};
	const [formData, setFormData] = useState(INITIAL_STATE);
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

	const text =
		projectPut.state === "submitting"
			? "Saving..."
			: projectPut.state === "loading"
			? "loading..."
			: "your good to go!";

	useEffect(() => {
		if (image) {
			setFormData((prevData) => ({
				...prevData,
				imageUrl: image,
			}));
		}
	}, [image]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevProfData) => ({
			...prevProfData,
			[name]: value,
		}));
	};

	const handleImageUrlClick = () => {
		setFormData((prevData) => ({
			...prevData,
			imageUrl: "",
		}));
		setImage(null);
		setValidFile(null);
		setIsSubmitted(false);
	};

	return (
		<>
			{message && <Alert message={message} setMessage={setMessage} />}
			<projectPut.Form method="PUT" action="/api/projects" ref={setFormRef}>
				{!formData.imageUrl ? (
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
									<p className="py-4 animate-pulse text-white">UPLOADING ...</p>
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
				) : (
					<div className="flex justify-center">
						<button
							onClick={handleImageUrlClick}
							className="mt-1 ring-1 ring-rose-500 items-center w-12 flex flex-row absolute z-10 right-8 top-8  rounded bg-rose-300/30 px-2 py-1 text-xs font-semibold text-rose-600 shadow-sm hover:bg-rose-200/30"
						>
							<p className="mr-2">X</p>
							<PhotoIcon className="w-16" />
						</button>
						<img
							src={formData?.imageUrl}
							alt="preview"
							className="rounded w-full w-96 m-2 object-cover"
						/>
					</div>
				)}

				<input defaultValue={project?.id} type="hidden" name="projectId" />
				<input defaultValue={userId} type="hidden" name="userId" />
				<input
					defaultValue={formData.imageUrl}
					type="hidden"
					name="projectImage"
					required
				/>

				<Input
					id={undefined}
					type="text"
					name="projectTitle"
					placeholder={undefined}
					onChange={handleInputChange}
					value={formData.projectTitle}
					title="Project Title"
				/>
				<Input
					id={undefined}
					type="text"
					name="projectLiveLink"
					placeholder={undefined}
					value={formData.projectLiveLink}
					onChange={handleInputChange}
					title="Project Live Link"
				/>
				<Input
					id={undefined}
					type="text"
					name="projectCodeLink"
					placeholder={undefined}
					value={formData.projectCodeLink}
					onChange={handleInputChange}
					title="Project Code Link"
				/>

				{!formData.imageUrl ? (
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
						name="_action"
						value="PUT"
						onClick={() => setSubmitted(true)}
					>
						{submitted ? text : "submit"}
					</button>
				)}
			</projectPut.Form>
		</>
	);
};

export default ProjectUpdateForm;
