type UserSkills = {
	id: number;
	skill: string;
	user_id: string;
};

const SkillView = ({ userSkills }: { userSkills: UserSkills[] }) => {
	return (
		<div>
			<div className="border-b border-gray-200 pb-5">
				<h3 className="ml-5 mt-5 text-base font-semibold leading-6 text-gray-700">
					Skills
				</h3>
			</div>
			{userSkills.length && (
				<div className="flex flex-row flex-wrap justify-center">
					{userSkills.map((skillObj) => (
						<div key={skillObj.id + skillObj.skill}>
							<p className="m-6 text-lg font-bold bg-indigo-200 text-indigo-900 rounded px-2">
								{skillObj.skill}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SkillView;
