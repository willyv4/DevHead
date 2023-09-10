import { PhotoIcon } from "@heroicons/react/20/solid";
import { Form } from "@remix-run/react";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import Alert from "~/components/Alert";

import useImageUploader from "~/hooks/UseImageUploader";

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
	// const projectFetcher = useFetcher();
	// const formRef = useRef<HTMLFormElement>(null);
	const INITIAL_STATE = {
		imageUrl: project?.image_url,
		projectTitle: project?.title,
		projectCodeLink: project?.code_link,
		projectLiveLink: project?.live_link,
		projectLikeCount: project?.like_count,
	};

	const AFTER_SUBMISSION: any = {
		imageUrl: "",
		projectTitle: "",
		projectCodeLink: "",
		projectLiveLink: "",
		projectLikeCount: "",
	};

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
	] = useImageUploader() as any;
	const [formData, setFormData] = useState(INITIAL_STATE);

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
	// projectFetcher.data returned from action method on server
	// projectFetcher.state //  "idle" | "loading" | "submitting"
	// projectFetcher.load // (href: /api/getuser) => void  this method hits the loader
	// projectFetcher.submit({})
	// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	// 	setFormData(AFTER_SUBMISSION);
	// 	setOpen(false);
	// 	if (formRef.current) {
	// 		const formData = new FormData(formRef.current);
	// 		// const formData = new FormData(e.currentTarget);
	// 		const projectId = "";
	// 		projectFetcher.submit(formData,{"action":`user/${userId}/${projectId}`,"method":"PUT"})
	// 	}
	// };
	const handleSubmit = () => {
		setFormData(AFTER_SUBMISSION);
		setOpen(false);
	};

	console.log(message);

	return (
		// <projectFetcher.Form ref={formRef} onSubmit={handleSubmit}>
		<>
			{message && <Alert message={message} setMessage={setMessage} />}
			<Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
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
									<p className="py-4 animate pulse text-white">UPLOADING ...</p>
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

				<div className="relative mt-4 mb-4">
					<label className="absolute -top-2 left-2 inline-block bg-gray-700 px-1 text-xs font-medium text-gray-300">
						Project Title
					</label>
					<input
						required
						value={formData.projectTitle}
						onChange={handleInputChange}
						type="text"
						name="projectTitle"
						className="pl-2 bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
				<div className="relative mt-4 mb-4">
					<label className="absolute -top-2 left-2 inline-block bg-gray-700 px-1 text-xs font-medium text-gray-300">
						Project Live Link
					</label>
					<input
						required
						value={formData.projectLiveLink}
						onChange={handleInputChange}
						type="text"
						name="projectLiveLink"
						className="pl-2 bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
				<div className="relative mt-4 mb-4">
					<label className="absolute -top-2 left-2 inline-block bg-gray-700 px-1 text-xs font-medium text-gray-300">
						Project Code Link
					</label>
					<input
						required
						value={formData.projectCodeLink}
						onChange={handleInputChange}
						type="text"
						name="projectCodeLink"
						className="pl-2 bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>

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
					>
						Submit
					</button>
				)}
			</Form>
		</>
		// </projectFetcher.Form>
	);
};

export default ProjectUpdateForm;
