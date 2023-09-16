import { useUser } from "@clerk/remix";
import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import CommentList from "~/components/comment/CommentList";
import { Comments } from "../models/comments";

type LoaderData = {
	comments: any;
};

export const loader: LoaderFunction = async ({
	params,
}: LoaderArgs): Promise<LoaderData | null> => {
	const postId: number = Number(params.id);

	if (!postId) return null;

	const { comments } = await Comments.getCommentsByPostId(postId);
	return comments;
};

export default function ProjectComments() {
	const { user, isSignedIn } = useUser();
	const comments = useLoaderData<LoaderData>();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isSignedIn) return navigate("/");
	}, [navigate, isSignedIn]);

	return (
		<>{user?.id && <CommentList comments={comments} userId={user?.id} />} </>
	);
}
