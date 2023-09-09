type UserSkills = {
	id: number;
	skill: string;
	user_id: string;
};

const SkillView = ({ userSkills }: { userSkills: UserSkills[] }) => {
	return (
		<div className="mt-10">
			<div className="border-b border-gray-950 pb-5">
				<h3 className="ml-5 mt-5 text-xl font-bold leading-6 text-gray-200">
					Skills
				</h3>
			</div>
			{userSkills.length !== 0 && (
				<div className="ml-4 mr-4 flex flex-row justify-center">
					<div className="flex flex-row flex-wrap justify-center mt-10 mb-4">
						{userSkills.map((skillObj) => (
							<div key={skillObj.id + skillObj.skill} className="p-1">
								<span className="inline-flex items-center rounded-md bg-emerald-400/10 px-2 py-1 text-md sm:text-2xl font-medium text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
									{skillObj.skill}
								</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default SkillView;
