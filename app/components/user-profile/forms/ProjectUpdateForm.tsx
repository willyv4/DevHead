import { PhotoIcon } from "@heroicons/react/20/solid";
import { Form } from "@remix-run/react";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
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
};

const ProjectUpdateForm: React.FC<Props> = ({ userId, project }) => {
	const INITIAL_STATE = {
		imageUrl: project?.image_url,
		projectTitle: project?.title,
		projectCodeLink: project?.code_link,
		projectLiveLink: project?.live_link,
		projectLikeCount: project?.like_count,
	};
	const [image, getRootProps, getInputProps] = useImageUploader() as any;
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
	};

	return (
		<Form method="post" encType="multipart/form-data">
			{!formData.imageUrl ? (
				<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
					<div className="text-center">
						<PhotoIcon
							className="mx-auto h-12 w-12 text-gray-300"
							aria-hidden="true"
						/>
						<div
							{...getRootProps}
							className="mt-4 flex text-sm leading-6 text-gray-600"
						>
							<label
								htmlFor="file-upload"
								className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
							>
								<span>Upload a Project Image</span>
								<input
									{...getInputProps()}
									id="file-upload"
									type="file"
									className="sr-only"
									accept="image/jpeg, image/jpg, image/png"
								/>
							</label>
							<p className="pl-1">or drag and drop</p>
						</div>
						<p className="text-xs leading-5 text-gray-600">
							PNG, JPG up to 10MB
						</p>
					</div>
				</div>
			) : (
				<div>
					<button
						onClick={handleImageUrlClick}
						className="absolute z-10 right-8 top-8 rounded bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600 shadow-sm hover:bg-rose-100"
					>
						X
					</button>
					<img
						src={formData.imageUrl || image}
						alt="preview"
						className="rounded"
					/>
				</div>
			)}

			<input defaultValue={project?.id} type="hidden" name="projectId" />
			<input defaultValue={userId} type="hidden" name="userId" />
			<input
				defaultValue={formData.imageUrl}
				type="hidden"
				name="projectImage"
			/>

			<div className="relative mt-4 mb-4">
				<label className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
					Project Title
				</label>
				<input
					required
					value={formData.projectTitle}
					onChange={handleInputChange}
					type="text"
					name="projectTitle"
					className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
			<div className="relative mt-4 mb-4">
				<label className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
					Project Live Link
				</label>
				<input
					required
					value={formData.projectLiveLink}
					onChange={handleInputChange}
					type="text"
					name="projectLiveLink"
					className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
			<div className="relative mt-4 mb-4">
				<label className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
					Project Code Link
				</label>
				<input
					required
					value={formData.projectCodeLink}
					onChange={handleInputChange}
					type="text"
					name="projectCodeLink"
					className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
			<button
				className="w-full rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				type="submit"
				name="_action"
				value="PUT"
			>
				Submit
			</button>
		</Form>
	);
};

export default ProjectUpdateForm;
