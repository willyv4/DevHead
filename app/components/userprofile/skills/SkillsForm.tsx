import type { SetStateAction } from "react";
import { useState } from "react";
import { useFetcher } from "react-router-dom";

const SkillsForm = ({ userId }: { userId: string }) => {
	const [skill, setSkill] = useState<string>("");
	const skillPost = useFetcher();

	const text =
		skillPost.state === "submitting" || skillPost.state === "loading"
			? "Processing..."
			: "Add Skill";

	const handleChange = (e: { target: { value: SetStateAction<string> } }) =>
		setSkill(e.target.value);

	return (
		<skillPost.Form
			method="POST"
			action="/api/skills"
			onSubmit={() => setSkill("")}
		>
			<div className="relative mt-4 mb-4">
				<label className="absolute -top-2 left-2 inline-block bg-gray-700 px-1 text-xs font-medium text-gray-300">
					Skill
				</label>
				<input required type="hidden" name="userId" defaultValue={userId} />
				<input
					required
					type="text"
					name="skill"
					onChange={handleChange}
					value={skill}
					className="pl-2 bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
			<button
				className="w-full rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
				type="submit"
			>
				{text}
			</button>
		</skillPost.Form>
	);
};

export default SkillsForm;