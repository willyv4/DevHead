import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import type { LoaderData } from "~/types";
import { Comments } from "~/models/comments";

export const loader: LoaderFunction = async ({
	params,
}: LoaderArgs): Promise<LoaderData | null> => {
	const postId: number = Number(params.id);

	if (!postId) return null;
	const { comments } = await Comments.getCommentsByPostId(postId);
	return comments;
};
