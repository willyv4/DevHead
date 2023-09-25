import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

const GitHubForm = ({
	userId,
	setOpen,
}: {
	userId: string | undefined;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const gitHubPost = useFetcher();
	function renderTextState() {
		return gitHubPost.state === "submitting"
			? "Saving..."
			: gitHubPost.state === "loading"
			? "Saved!"
			: "Submit";
	}

	useEffect(() => {
		if (gitHubPost?.data?.success && gitHubPost.state === "idle") {
			setOpen(false);
		}
	}, [gitHubPost?.data?.success, gitHubPost.state, setOpen]);

	return (
		<gitHubPost.Form method="POST" action="/api/userprofile">
			<div className="relative mt-2 mb-4">
				<input defaultValue={userId} type="hidden" name="userId" />
				<label className="absolute -top-2 left-2 inline-block bg-gray-700 px-1 text-xs font-medium text-gray-300">
					GitHub Username
				</label>
				<input
					type="text"
					name="githubUsername"
					className="pl-2 bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm border-[1px] border-gray-200 sm:text-sm sm:leading-6"
				/>
			</div>
			<button
				className="w-full rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
				type="submit"
				name="_action"
				value="POST_GITHUB"
			>
				{renderTextState()}
			</button>
		</gitHubPost.Form>
	);
};

export default GitHubForm;
