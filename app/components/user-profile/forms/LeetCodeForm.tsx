import { Form } from "@remix-run/react";
import { useEffect } from "react";
import { UseFormClear } from "~/hooks/useFormClear";

const LeetCodeForm = ({
	userId,
	setOpen,
}: {
	userId: string | undefined;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { ref: setFormRef, isAdding } = UseFormClear("POST_LEETCODE");

	useEffect(() => {
		if (isAdding) setOpen(false);
	}, [isAdding, setOpen]);

	return (
		<Form ref={setFormRef} method="post">
			<input defaultValue={userId} type="hidden" name="userId" />

			<div className="relative mt-4 mb-4">
				<label className="absolute -top-2 left-2 inline-block bg-gray-700 px-1 text-xs font-medium text-gray-300">
					LeetCode Username
				</label>
				<input
					type="text"
					name="leetcodeUsername"
					className="pl-2 bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
			<button
				className="w-full rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
				type="submit"
				name="_action"
				value="POST_LEETCODE"
			>
				{isAdding ? "Processing..." : "Submit"}
			</button>
		</Form>
	);
};

export default LeetCodeForm;
