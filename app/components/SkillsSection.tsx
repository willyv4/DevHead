import { Form } from "@remix-run/react";
import { useState } from "react";
import Modal from "./Modal";
import SkillsForm from "./user-profile/forms/SkillsForm";

type UserSkills = {
	id: number;
	skill: string;
	user_id: string;
};

const SkillsSection = ({
	userId,
	userSkills,
}: {
	userId: string;
	userSkills: UserSkills[];
}) => {
	const [skillsFormView, setSkillsFormView] = useState<boolean>(false);
	const [deleteFormView, setDeleteFormView] = useState<boolean>(false);

	return (
		<div>
			<button
				onClick={() => setSkillsFormView(true)}
				className="mb-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-1"
			>
				Add Skills
			</button>
			{!deleteFormView ? (
				<button
					onClick={() => setDeleteFormView(true)}
					className="mb-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-1"
				>
					Edit Skills
				</button>
			) : (
				<button
					onClick={() => setDeleteFormView(false)}
					className="mb-1 rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 float-right mt-1"
				>
					Cancel
				</button>
			)}
			{userSkills.length && (
				<div className="flex flex-row flex-wrap">
					{userSkills.map((skillObj) => (
						<div key={skillObj.id + skillObj.skill}>
							{deleteFormView && (
								<Form method="post">
									<input
										type="hidden"
										defaultValue={skillObj.id}
										name="skillId"
									/>
									<div className="relative">
										<button
											name="_action"
											value="DELETE_SKILL"
											type="submit"
											className="absolute top-4 right-4 rounded-full bg-rose-100 px-2 p-1 text-[8px] text-rose-500 shadow-sm hover:text-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
										>
											X
										</button>
									</div>
								</Form>
							)}
							<p className="m-6 text-lg font-bold bg-indigo-200 text-indigo-900 rounded px-2">
								{skillObj.skill}
							</p>
						</div>
					))}
				</div>
			)}
			<Modal
				FormComponent={<SkillsForm userId={userId} />}
				open={skillsFormView}
				setOpen={setSkillsFormView}
			/>
		</div>
	);
};

export default SkillsSection;
