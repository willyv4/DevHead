import { PhotoIcon } from "@heroicons/react/20/solid";
import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";

type Project = {
	id: string;
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

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const ProjectUpdateForm: React.FC<Props> = ({ userId, project }) => {
	// const INITIAL_STATE = {
	// 	id: project?.id,
	// 	imageUrl: project?.image_url,
	// 	title: project?.title,
	// 	codeLink: project?.code_link,
	// 	liveLink: project?.live_link,
	// 	likeCount: project?.like_count,
	// };

	const [imageFiles, setImageFiles]: any = useState([]);
	const [images, setImages]: any = useState([]);
	// const [formData, setFormData] = useState(INITIAL_STATE);

	// console.log(formData);

	const image = images[0];

	const handleChange = (e: any) => {
		const { files } = e.target;
		const validImageFiles = [];
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			if (file.type.match(imageTypeRegex)) {
				validImageFiles.push(file);
			}
		}
		if (validImageFiles.length) {
			setImageFiles(validImageFiles);
			return;
		}
		alert("Selected images are not of valid type!");
	};

	useEffect(() => {
		const images: any = [],
			fileReaders: any = [];
		let isCancel = false;
		if (imageFiles.length) {
			imageFiles.forEach((file: any) => {
				const fileReader = new FileReader();
				fileReaders.push(fileReader);
				fileReader.onload = (e) => {
					const { result }: any = e.target;
					if (result) {
						images.push(result);
					}
					if (images.length === imageFiles.length && !isCancel) {
						setImages(images);
					}
				};
				fileReader.readAsDataURL(file);
			});
		}
		return () => {
			isCancel = true;
			fileReaders.forEach((fileReader: any) => {
				if (fileReader.readyState === 1) {
					fileReader.abort();
				}
			});
		};
	}, [imageFiles]);

	return (
		<Form method="post" encType="multipart/form-data">
			<input
				defaultValue={userId}
				type="hidden"
				name="userId"
				className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
			<input
				defaultValue={image}
				type="hidden"
				name="projectImage"
				className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>

			{images.length > 0 ? (
				<div>
					{images.map((image: any, idx: any) => {
						return (
							<p key={idx}>
								{" "}
								<img src={image} alt="" />{" "}
							</p>
						);
					})}
				</div>
			) : null}
			<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
				<div className="text-center">
					<PhotoIcon
						className="mx-auto h-12 w-12 text-gray-300"
						aria-hidden="true"
					/>
					<div className="mt-4 flex text-sm leading-6 text-gray-600">
						<label
							htmlFor="file-upload"
							className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
						>
							<span>Upload a Project Image</span>
							<input
								onChange={handleChange}
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
			>
				Submit
			</button>
		</Form>
	);
};

export default ProjectUpdateForm;
