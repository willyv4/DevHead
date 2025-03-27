import { supabase } from "../db.server";

export class Skills {
  static async addSkill(userId: string, skill: string) {
    await supabase.from("skills").insert({
      user_id: userId,
      skill: skill,
    });
    return { success: true };
  }

  static async getSkillsById(userId: string) {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase error:", error);
      return [];
    }

    return data;
  }

  static async removeSkill(id: number) {
    await supabase.from("skills").delete().eq("id", id);

    return { success: true };
  }
}
