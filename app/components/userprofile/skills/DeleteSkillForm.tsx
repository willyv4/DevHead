import { useFetcher } from "@remix-run/react";

const DeleteSkillForm = ({ skillId }: { skillId: number }) => {
	const deleteSkill = useFetcher();
	const textState = () => {
		return deleteSkill.state === "submitting" ||
			deleteSkill.state === "loading" ? (
			<p className="animate-pulse text-emerald-100">...</p>
		) : (
			"X"
		);
	};

	return (
		<deleteSkill.Form method="DELETE" action="/api/skills">
			<input type="hidden" defaultValue={skillId} name="skillId" />
			<div className="relative flex flex-row">
				<button
					name="_action"
					className="ml-1 -mr-1 inline-flex items-center px-2 text-[10px] font-bold text-emerald-300"
				>
					{textState()}
				</button>
			</div>
		</deleteSkill.Form>
	);
};

export default DeleteSkillForm;
