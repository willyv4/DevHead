import { PhotoIcon } from "@heroicons/react/20/solid";
import { Form } from "@remix-run/react";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import useImageUploader from "~/hooks/UseImageUploader";

type UserProfile = {
	id: string;
	code_start: string | null;
	first_name: string | null;
	last_name: string | null;
	place: string | null;
	image_url: string;
	username: string;
	email: string;
	title: string | null;
	about: string | null;
	skills: string | null;
	followers: string[] | null;
	following: string[] | null;
	github_username: string | null;
	leetcode_username: string | null;
};

type Props = {
	userProfile: UserProfile;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileUpdateForm: React.FC<Props> = ({ userProfile, setOpen }) => {
	const INITIAL_STATE = {
		userImage: userProfile?.image_url,
		profileTitle: userProfile?.title,
		firstName: userProfile?.first_name,
		lastName: userProfile?.last_name,
		userEmail: userProfile?.email,
	};

	const AFTER_SUBMISSION = {
		userImage: "",
		profileTitle: "",
		firstName: "",
		lastName: "",
		userEmail: "",
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
	] = useImageUploader() as any;

	const [formData, setFormData] = useState(INITIAL_STATE);

	useEffect(() => {
		if (image) {
			setFormData((prevData) => ({
				...prevData,
				userImage: image,
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
			userImage: "",
		}));
		setImage(null);
		setValidFile(null);
		setIsSubmitted(false);
	};

	const handleSubmit = () => {
		setFormData(AFTER_SUBMISSION);
		setOpen(false);
	};

	return (
		<Form method="post" onSubmit={handleSubmit}>
			{!formData.userImage ? (
				<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
									<p className="text-sm">PNG, JPG, GIF up to 10MB</p>
								</>
							)}
						</div>
					</div>
				</div>
			) : (
				<div>
					<button
						onClick={handleImageUrlClick}
						className="absolute z-10 right-8 top-8  rounded bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600 shadow-sm hover:bg-rose-100"
					>
						X
					</button>
					<img src={formData.userImage} alt="preview" className="rounded" />
				</div>
			)}

			<input defaultValue={formData.userImage} type="hidden" name="userImage" />
			<input defaultValue={userProfile.id} type="hidden" name="userId" />
			<div className="relative mt-4 mb-4">
				<label className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
					First Name
				</label>
				<input
					required
					value={formData.firstName || ""}
					onChange={handleInputChange}
					type="text"
					name="firstName"
					className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>

			<div className="relative mt-4 mb-4">
				<label className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
					Last Name
				</label>
				<input
					required
					value={formData.lastName || ""}
					onChange={handleInputChange}
					type="text"
					name="lastName"
					className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>

			<div className="relative mt-4 mb-4">
				<label className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
					Email
				</label>
				<input
					required
					value={formData.userEmail || ""}
					onChange={handleInputChange}
					type="text"
					name="userEmail"
					className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
			<div className="relative mt-4 mb-4">
				<label className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
					Title
				</label>
				<input
					required
					value={formData.profileTitle || ""}
					onChange={handleInputChange}
					type="text"
					name="profileTitle"
					className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
			<button
				className="w-full rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				type="submit"
				name="_action"
				value="PUT_USER"
			>
				Submit Edit
			</button>
		</Form>
	);
};

export default ProfileUpdateForm;
