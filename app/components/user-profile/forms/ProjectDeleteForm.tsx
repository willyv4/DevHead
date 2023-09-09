import { Form } from "@remix-run/react";

const ProjectDeleteForm = ({ postId }: { postId: number }) => {
	return (
		<Form method="post" className="absolute top-[14px] right-5 z-10">
			<input type="hidden" defaultValue={postId} name="projectId" />
			<button
				name="_action"
				value="DELETE_PROJECT"
				type="submit"
				className="inline-flex items-center rounded-md bg-rose-400/10 px-2 py-1 text-xs font-medium text-rose-400 ring-1 ring-inset ring-rose-400/20"
			>
				X
			</button>
		</Form>
	);
};
export default ProjectDeleteForm;
