import { supabase } from "~/db.server";

export class Likes {
  static async addLike(userId: string, postId: number) {
    try {
      await supabase.from("likes").insert({
        post_id: postId,
        user_id: userId,
      });

      return { success: true };
    } catch (error) {
      return {
        message: `Error adding like with userid: ${userId} and postId: ${postId} ERROR: ${error}`,
      };
    }
  }

  static async removeLike(userId: string, projectId: number) {
    try {
      await supabase
        .from("likes")
        .delete()
        .eq("user_id", userId)
        .eq("post_id", projectId);

      return { success: true };
    } catch (error) {
      return {
        message: `Error removing like with userid: ${userId} and postId: ${projectId} ERROR: ${error}`,
      };
    }
  }

  static async getLikesById(userId: string) {
    try {
      const { data } = await supabase
        .from("likes")
        .select("post_id")
        .eq("user_id", userId);

      return data?.map((row: any) => row.post_id);
    } catch (error) {
      return {
        message: `Error getting likes with userid: ${userId} ERROR: ${error}`,
      };
    }
  }
}
