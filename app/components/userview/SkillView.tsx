import SkillList from "../userprofile/skills/SkillList";
import type { UserSkills } from "~/types";

const SkillView = ({ userSkills }: { userSkills: UserSkills[] }) => {
	return (
		<div className="mt-10">
			<div className="border-b border-gray-950 pb-5">
				<h3 className="ml-5 mt-5 text-xl font-bold leading-6 text-gray-200">
					Skills
				</h3>
			</div>
			<SkillList userSkills={userSkills} deleteFormView={false} />
		</div>
	);
};

export default SkillView;
