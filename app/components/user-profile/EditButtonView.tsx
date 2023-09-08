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
							className="flex flex-row rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
						>
							Edit <PencilIcon className="h-4 w-4 ml-2 mt-[2px]" />
						</button>
					) : (
						<button
							onClick={() => setEditButton(false)}
							type="submit"
							className="flex flex-row rounded-md bg-rose-400/10 px-2.5 py-1.5 text-sm font-semibold text-rose-400 shadow-sm hover:bg-rose-400/20"
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
