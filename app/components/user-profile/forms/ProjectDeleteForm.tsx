import { Form } from "@remix-run/react";

const ProjectDeleteForm = ({ postId }: { postId: number }) => {
	return (
		<Form method="post" className="absolute top-[14px] right-5 z-10">
			<input type="hidden" defaultValue={postId} name="projectId" />
			<button
				name="_action"
				value="DELETE_PROJECT"
				type="submit"
				className="rounded bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600 shadow-sm hover:bg-rose-100"
			>
				X
			</button>
		</Form>
	);
};
export default ProjectDeleteForm;
