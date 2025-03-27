import { supabase } from "../db.server";

export class Follows {
  static async addFollow(userId: string, followedUser: string) {
    await supabase.from("follows").insert({
      user_being_followed_id: followedUser,
      user_following_id: userId,
    });

    return { success: true };
  }

  static async removeFollow(userId: string, followedUser: string) {
    await supabase
      .from("follows")
      .delete()
      .eq("user_being_followed_id", followedUser)
      .eq("user_following_id", userId);

    return { success: true };
  }
}
