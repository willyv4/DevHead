import ProjectForm from "./forms/ProjectForm";

const UserProjectForm = ({ userId }: { userId: string | undefined }) => {
	// if (!userId) return (<div>User has</div>)
	return (
		<>
			<ProjectForm userId={userId} />
			<div>Hello from User Projects</div>
		</>
	);
};

export default UserProjectForm;
