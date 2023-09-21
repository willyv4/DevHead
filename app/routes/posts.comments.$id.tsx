import { useUser } from "@clerk/remix";
import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import CommentList from "~/components/comment/CommentList";
import { Comments } from "../models/comments";

type CommentResp = {
	comments: Comment[];
};

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
	const postId: number = Number(params.id);

	if (!postId) return null;
	const { comments } = await Comments.getCommentsByPostId(postId);
	return json({ comments });
};

export default function ProjectComments() {
	const { isSignedIn } = useUser();
	const comments = useLoaderData() as CommentResp | null;
	const navigate = useNavigate();

	useEffect(() => {
		if (!isSignedIn) return navigate("/");
	}, [navigate, isSignedIn]);

	return (
		<>{comments?.comments && <CommentList comments={comments.comments} />}</>
	);
}
