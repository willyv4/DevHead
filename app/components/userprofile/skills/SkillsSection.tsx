import { useState } from "react";
import Modal from "../../utility/Modal";
import SkillList from "./SkillList";
import SkillsForm from "./SkillsForm";
import type { UserSkills } from "~/types";

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
			<div className="flex flex-row justify-between border-b border-gray-950 pb-5">
				<h3 className="ml-5 mt-5 text-xl font-bold leading-6 text-gray-200">
					Skills
				</h3>

				<div className="flex flex-row mt-4">
					<div>
						<button
							onClick={() => setSkillsFormView(true)}
							className="mr-2 rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-white/20"
						>
							Add Skill
						</button>
					</div>
					{userSkills.length !== 0 && (
						<div className="mr-4">
							{!deleteFormView ? (
								<button
									onClick={() => setDeleteFormView(true)}
									className="rounded-md bg-white/10 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-white/20"
								>
									Edit Skills
								</button>
							) : (
								<button
									onClick={() => setDeleteFormView(false)}
									className="rounded-md bg-rose-400/10 px-3 py-2 text-xs font-semibold text-rose-400 shadow-sm hover:bg-rose-400/20"
								>
									Cancel
								</button>
							)}
						</div>
					)}
				</div>
			</div>
			<SkillList userSkills={userSkills} deleteFormView={deleteFormView} />
			<Modal
				FormComponent={<SkillsForm userId={userId} />}
				open={skillsFormView}
				setOpen={setSkillsFormView}
			/>
		</div>
	);
};

export default SkillsSection;
