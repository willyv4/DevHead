import React, { useEffect } from "react";
import { PencilIcon } from "@heroicons/react/20/solid";

type Props = {
	userProjectCount: number | undefined;
	editButton: boolean;
	setEditButton: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditButtonView: React.FC<Props> = ({
	userProjectCount,
	editButton,
	setEditButton,
}) => {
	useEffect(() => {
		if (userProjectCount === 0) setEditButton(false);
	}, [setEditButton, userProjectCount]);

	return (
		<>
			{userProjectCount !== 0 && (
				<>
					{!editButton ? (
						<button
							onClick={() => setEditButton(true)}
							className="ml-2 flex flex-row rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-1"
						>
							Edit <PencilIcon className="h-4 w-4 ml-2 mt-[2px]" />
						</button>
					) : (
						<button
							onClick={() => setEditButton(false)}
							type="submit"
							className="ml-2 flex flex-row rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 float-right mt-1"
						>
							Cancel
						</button>
					)}
				</>
			)}
		</>
	);
};

export default EditButtonView;
