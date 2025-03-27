import { supabase } from "../db.server";
// import type { Comment } from "../types";

// interface CommentsRespose {
//   comments: Comment[];
// }

// function isCommentsResponse(data: any): data is CommentsRespose {
//   return "comments" in data &&
//     Array.isArray(data.comments) &&
//     "comment_id" in data.comments[0]
//     ? true
//     : false;
// }

export class Comments {
  static async addComment(userId: string, postId: number, comment: string) {
    await supabase.from("portfolio_comments").insert({
      post_id: postId,
      user_id: userId,
      comment: comment,
    });

    return { success: true };
  }

  static async getCommentsByPostId(postId: number) {
    const { data, error } = await supabase.rpc("get_comments_by_post_id", {
      p_post_id: postId,
    });

    if (error) {
      console.error("RPC Error:", error);
      return { comments: [] };
    }

    return { comments: data };
  }

  static async deleteComment(commentId: number) {
    await supabase.from("portfolio_comments").delete().eq("id", commentId);

    return { success: true };
  }
}
