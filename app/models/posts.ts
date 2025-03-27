import { supabase } from "../db.server";
// import type { UserProjects } from "../types";

// type AllUserProjectResp = {
//   UserProjects: UserProjects[];
// };

// function isUserProject(data: any): data is AllUserProjectResp {
//   return "user_id" in data[0] &&
//     Array.isArray(data[0].liked_user_ids) &&
//     "id" in data[0]
//     ? true
//     : false;
// }

export default class Posts {
  static async getUserProjectsById(id: string) {
    const { data, error } = await supabase.rpc("get_user_projects_by_id", {
      p_user_id: id,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      return [];
    }

    return data;
  }

  static async addUserProject(
    userId: string,
    projectImage: string,
    projectTitle: string,
    projectLiveLink: string,
    projectCodeLink: string
  ) {
    await supabase.from("portfolio_posts").insert({
      user_id: userId,
      image_url: projectImage,
      title: projectTitle,
      code_link: projectCodeLink,
      live_link: projectLiveLink,
    });

    return { success: true };
  }

  static async updateUserProject(
    projectId: number,
    userId: string,
    projectImage: string,
    projectTitle: string,
    projectCodeLink: string,
    projectLiveLink: string
  ) {
    await supabase
      .from("portfolio_posts")
      .update({
        user_id: userId,
        image_url: projectImage,
        title: projectTitle,
        code_link: projectCodeLink,
        live_link: projectLiveLink,
      })
      .eq("id", projectId);

    return { success: true };
  }

  static async deleteProjectById(id: number) {
    await supabase.from("portfolio_posts").delete().eq("id", id);

    return { deleted: true };
  }

  static async getAllUserProjects() {
    const { data, error } = await supabase.rpc("get_all_user_projects");

    if (error) {
      console.error("Supabase RPC error:", error);
      return [];
    }

    return data;
  }
}
