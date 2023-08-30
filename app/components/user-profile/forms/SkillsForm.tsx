import { Form } from "@remix-run/react";
import type { SetStateAction } from "react";
import { useState } from "react";

const SkillsForm = ({ userId }: { userId: string }) => {
	const [skill, setSkill] = useState<string>("");

	const handleChange = (e: { target: { value: SetStateAction<string> } }) =>
		setSkill(e.target.value);

	return (
		<Form method="post" onSubmit={() => setSkill("")}>
			<div className="relative mt-4 mb-4">
				<label className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
					Skill
				</label>
				<input required type="hidden" name="userId" defaultValue={userId} />
				<input
					required
					type="text"
					name="skill"
					onChange={handleChange}
					value={skill}
					className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
			<button
				className="w-full rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				type="submit"
				name="_action"
				value="POST_SKILL"
			>
				Submit
			</button>
		</Form>
	);
};

export default SkillsForm;
