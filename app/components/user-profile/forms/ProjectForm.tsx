import { PhotoIcon } from "@heroicons/react/20/solid";
import { Form } from "@remix-run/react";
import useImageUploader from "~/hooks/UseImageUploader";

const ProjectForm = ({ userId }: { userId: string | undefined }) => {
	const [image, setImage, getRootProps, getInputProps] =
		useImageUploader() as any;

	return (
		<Form method="post" encType="multipart/form-data">
			<input defaultValue={userId} type="hidden" name="userId" />

			{image ? (
				<div>
					<button
						onClick={() => setImage(null)}
						className="absolute z-10 right-8 top-8  rounded bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600 shadow-sm hover:bg-rose-100"
					>
						X
					</button>
					<img src={image} alt="preview" className="rounded" />
					<input defaultValue={image} type="hidden" name="projectImage" />
				</div>
			) : (
				<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
					<div className="text-center">
						<PhotoIcon
							className="mx-auto h-12 w-12 text-gray-300"
							aria-hidden="true"
						/>
						<div
							{...getRootProps()}
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
									accept="image/*"
									value={""}
								/>
							</label>
							<p className="pl-1">or drag and drop</p>
						</div>
						<p className="text-xs leading-5 text-gray-600">
							PNG, JPG, GIF up to 10MB
						</p>
					</div>
				</div>
			)}

			<div className="relative mt-4 mb-4">
				<label className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
					Project Title
				</label>
				<input
					required
					id="file-upload"
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
					type="text"
					name="projectCodeLink"
					className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
			<button
				className="w-full rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				type="submit"
				name="_action"
				value="POST_PROJECTS"
			>
				Submit
			</button>
		</Form>
	);
};

export default ProjectForm;
