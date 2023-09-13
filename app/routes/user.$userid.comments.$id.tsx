import { useUser } from "@clerk/remix";
import type {
	ActionArgs,
	ActionFunction,
	LoaderArgs,
	LoaderFunction,
} from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import CommentList from "~/components/user-view/CommentList";
import { Comments } from "../models/comments";

type LoaderData = {
	comments: any;
};

export const loader: LoaderFunction = async ({
	params,
}: LoaderArgs): Promise<LoaderData | null> => {
	const postId: number | undefined = params.id
		? parseInt(params.id)
		: undefined;

	if (postId) {
		const comments: any = await Comments.getCommentsByPostId(postId);
		return comments;
	}

	return null;
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as unknown as {
		_action: string;
		userId: string;
		projectId: number;
		comment: string;
		commentId: number;
	};

	if (data._action === "POST_COMMENT") {
		return await Comments.addComment(data.userId, data.projectId, data.comment);
	}

	if (data._action === "DELETE_COMMENT") {
		return await Comments.deleteComment(data.commentId);
	}

	return null;
};

export default function ProjectComments() {
	const { user } = useUser();
	const loaderData: any = useLoaderData<LoaderData>();
	const [comments, setComments] = useState<any>(loaderData[0]?.comments);
	const navigate = useNavigate();
	const { isSignedIn } = useUser();

	useEffect(() => {
		if (!isSignedIn) return navigate("/");
	}, [navigate, isSignedIn]);

	// console.log("LOADER DATA", loaderData);

	useEffect(() => {
		setComments(loaderData[0]?.comments);
	}, [loaderData]);

	// console.log(comments);
	return (
		<>{user?.id && <CommentList comments={comments} userId={user?.id} />} </>
	);
}
