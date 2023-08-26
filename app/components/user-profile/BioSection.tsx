import { PencilIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import BioPostForm from "./forms/BioPostForm";
import BioUpdateForm from "./forms/BioUpdateForm";

type Props = {
	userId: string | undefined;
	userBio: string | null;
};

const BioSection: React.FC<Props> = ({ userId, userBio }) => {
	const [buttonClicked, setButtonClicked] = useState(false);
	const [data, setData] = useState(userBio || "");

	const handleChange = (evt: any) => setData(evt.target.value);

	const handleSubmit = () => {
		setData(data);
		setButtonClicked(false);
	};

	const handleClick = () => {
		buttonClicked ? setButtonClicked(false) : setButtonClicked(true);
	};

	if (!userBio) return <BioPostForm userId={userId} />;

	return !buttonClicked ? (
		<div className="border-t-2 border-gray-200 mt-12">
			<div className="flex flex-row justify-between mb-4">
				<p className="text-xl font-bold mt-4">Bio</p>
				<div className="mt-2 flex justify-end">
					<button
						onClick={() => handleClick()}
						type="submit"
						className="flex flex-row rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-1"
					>
						Edit <PencilIcon className="h-4 w-4 ml-2 mt-[2px]" />
					</button>
				</div>
			</div>
			<div className="story-container">
				{userBio?.split("\n")?.map((paragraph, index) => (
					<p key={index + "paragraph"} className="my-2 text-gray-500">
						{paragraph}
					</p>
				))}
			</div>
		</div>
	) : (
		<>
			<div className="flex flex-row justify-between mb-4">
				<p className="text-xl font-bold mt-4">Bio</p>
				<div className="mt-2 flex justify-end">
					<button
						onClick={() => handleClick()}
						type="submit"
						className="flex flex-row rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 float-right mt-1"
					>
						Cancel
					</button>
				</div>
			</div>

			<BioUpdateForm
				handleSubmit={handleSubmit}
				handleChange={handleChange}
				userId={userId}
				data={data}
			/>
		</>
	);
};

export default BioSection;
