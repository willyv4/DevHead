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
			{userSkills.length && (
				<div className="flex flex-row flex-wrap justify-center pt-10 px-10">
					{userSkills.map((skillObj) => (
						<span
							key={skillObj.id}
							className="mx-10 my-4 inline-flex items-center gap-x-1.5 rounded-md px-2.5 py-1 font-bold text-white ring-1 ring-inset ring-gray-800 text-xs sm:text-2xl"
						>
							<svg
								className="h-1.5 w-1.5 sm:h-2.5 w-2.5 fill-emerald-400"
								viewBox="0 0 6 6"
								aria-hidden="true"
							>
								<circle cx={3} cy={3} r={3} />
							</svg>
							{skillObj.skill}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default SkillView;
