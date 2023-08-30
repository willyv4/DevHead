import { PencilIcon } from "@heroicons/react/20/solid";
import { Form } from "@remix-run/react";

type Props = {
	handleClick: (index: number | null) => void;
	index: number;
};

const EditPostForm: React.FC<Props> = ({ handleClick, index }) => {
	return (
		<Form method="post" className="absolute top-4 right-14 z-10">
			<button
				onClick={() => handleClick(index + 1)}
				className="-mt-[.5px] rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
			>
				<PencilIcon className="w-4 h-4" />
			</button>
		</Form>
	);
};

export default EditPostForm;
