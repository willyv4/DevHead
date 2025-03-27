import { supabase } from "../db.server";

export class User {
  static async getUserById(id: string) {
    const { data, error } = await supabase
      .from("users")
      .select("id, image_url")
      .eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return {
        message: `Error getting user with id: ${id}}`,
      };
    }

    return data[0];
  }

  static async getUserProfileById(userId: string) {
    const { data, error } = await supabase.rpc("get_user_profile_by_id", {
      p_user_id: userId,
    });

    if (error || !data || data.length === 0) {
      return {
        message: `Error getting user Profile with id: ${userId}`,
        status: 500,
      };
    }

    return data[0]; // since RPC returns an array of rows
  }

  static async getUserOverviews() {
    const { data, error } = await supabase.rpc("get_user_overviews");

    if (error) {
      console.error("Error fetching user overviews:", error);
      return { users: [] };
    }

    return { users: data };
  }

  static async addUser(
    id: string,
    firstName: string | null,
    lastName: string | null,
    email: string,
    imageUrl: string | null
  ) {
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return {
        message: `Error adding user with id: ${id}`,
      };
    }

    if (data.length > 0) {
      return {
        message: `User with id ${id} already exists`,
      };
    }

    const { data: _data } = await supabase.from("users").insert({
      id,
      first_name: firstName,
      last_name: lastName,
      email,
      image_url: imageUrl,
    });

    return !_data ? { success: false } : { success: true };
  }

  static async updateUser(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    imageUrl: string,
    title: string
  ) {
    const { error } = await supabase
      .from("users")
      .update({
        first_name: firstName,
        last_name: lastName,
        email,
        image_url: imageUrl,
        title,
      })
      .eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return {
        message: `Error updating user with id: ${id}`,
      };
    }

    return { success: true };
  }

  static async connectLeetcode(id: string, leetcodeUsername: string | null) {
    if (!leetcodeUsername) return { success: false };

    const { error } = await supabase
      .from("users")
      .update({
        leetcode_username: leetcodeUsername,
      })
      .eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return {
        message: `Error updating user with id: ${id}`,
      };
    }

    return { success: true };
  }

  static async connectGithub(id: string, githubUsername: string | null) {
    if (!githubUsername) return { success: false };

    const { error } = await supabase
      .from("users")
      .update({
        github_username: githubUsername,
      })
      .eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return {
        message: `Error updating user with id: ${id}`,
      };
    }

    return { success: true };
  }

  static async addUserBio(id: string, userBio: string | null) {
    if (!userBio) return { success: false };

    const { error } = await supabase
      .from("users")
      .update({
        about: userBio,
      })
      .eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return {
        message: `Error updating user with id: ${id}`,
      };
    }

    return { success: true };
  }

  static async remove(id: string) {
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return {
        message: `Error deleting user with id: ${id}`,
      };
    }

    return { deleted: true };
  }
}
