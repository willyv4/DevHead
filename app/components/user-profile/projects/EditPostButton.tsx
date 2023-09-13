import { PencilIcon } from "@heroicons/react/20/solid";

type Props = {
	handleClick: (index: number | null) => void;
	index: number;
};

const EditPostButton: React.FC<Props> = ({ handleClick, index }) => {
	return (
		<div className="absolute top-4 right-14 z-10">
			<button
				onClick={() => handleClick(index + 1)}
				className="inline-flex items-center rounded-md bg-gray-300/10 px-2 py-1 text-xs font-medium text-gray-300 ring-1 ring-inset ring-gray-300/20"
			>
				<PencilIcon className="w-4 h-4" />
			</button>
		</div>
	);
};

export default EditPostButton;
