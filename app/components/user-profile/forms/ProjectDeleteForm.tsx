import { Form, useNavigation } from "@remix-run/react";
import { useState } from "react";

const ProjectDeleteForm = ({ postId }: { postId: number }) => {
	const [clickedPostId, setClickedPostId] = useState<number | null>(null);
	const navigation = useNavigation();

	const textState = () => {
		return clickedPostId === postId &&
			(navigation.state === "submitting" || navigation.state === "loading") ? (
			<span className="w-4 text-xl text-rose-200 text-base animate-pulse -mt-[9px] -mb-[3px] inline-block align-top">
				...
			</span>
		) : (
			"X"
		);
	};

	return (
		<Form method="post" className="absolute top-[14px] right-5 z-10">
			<input type="hidden" defaultValue={postId} name="projectId" />
			<button
				name="_action"
				value="DELETE_PROJECT"
				type="submit"
				onClick={() => setClickedPostId(postId)}
				className="inline-flex items-center rounded-md bg-rose-400/10 px-2 py-1 text-xs font-medium text-rose-400 ring-1 ring-inset ring-rose-400/20"
			>
				{textState()}
			</button>
		</Form>
	);
};
export default ProjectDeleteForm;
