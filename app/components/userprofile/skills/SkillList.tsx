import DeleteSkillForm from "./DeleteSkillForm";
import type { UserSkills } from "~/types";

type Props = {
	userSkills: UserSkills[];
	deleteFormView: boolean;
};

const SkillList: React.FC<Props> = ({ userSkills, deleteFormView }) => {
	return (
		<div className="ml-4 mr-4 flex flex-row justify-center">
			<div className="flex flex-row flex-wrap justify-center mt-10 mb-4">
				{userSkills.length !== 0 ? (
					userSkills.map((skillObj) => (
						<div key={skillObj.id + skillObj.skill} className="p-1">
							<div className="inline-flex items-center rounded-md bg-emerald-400/10 px-2 py-1 text-md sm:text-2xl font-medium text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
								{skillObj.skill}{" "}
								{deleteFormView && <DeleteSkillForm skillId={skillObj.id} />}
							</div>
						</div>
					))
				) : (
					<div className="text-center h-36 mt-16 font-bold text-l">
						NO SKILLS YET
					</div>
				)}
			</div>
		</div>
	);
};

export default SkillList;
