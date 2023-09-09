import { Form } from "@remix-run/react";
import { useState } from "react";
import Modal from "../Modal";
import SkillsForm from "./forms/SkillsForm";

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

	console.log(userSkills);

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

			{userSkills.length !== 0 ? (
				<div className="ml-4 mr-4 flex flex-row justify-center">
					<div className="flex flex-row flex-wrap justify-center mt-10 mb-4">
						{userSkills.map((skillObj) => (
							<div key={skillObj.id + skillObj.skill} className="p-1">
								<span className="inline-flex items-center rounded-md bg-emerald-400/10 px-2 py-1 text-md sm:text-2xl font-medium text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
									{skillObj.skill}{" "}
									{deleteFormView && (
										<Form method="post">
											<input
												type="hidden"
												defaultValue={skillObj.id}
												name="skillId"
											/>
											<div className="relative flex flex-row">
												<button
													name="_action"
													value="DELETE_SKILL"
													type="submit"
													className="ml-1 -mr-1 inline-flex items-center px-2 text-[10px] font-bold text-emerald-300"
												>
													X
												</button>
											</div>
										</Form>
									)}
								</span>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="text-center h-36 mt-16 font-bold text-l">
					{" "}
					NO SKILLS YET
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
