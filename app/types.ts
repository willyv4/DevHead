export type UserProfile = {
	id: string;
	code_start: string | null;
	first_name: string | null;
	last_name: string | null;
	place: string | null;
	image_url: string;
	email: string;
	title: string | null;
	about: string | null;
	skills: string | null;
	followers: string[] | null;
	following: string[] | null;
	github_username: string | null;
	leetcode_username: string | null;
};

export type UserSkills = {
	id: number;
	skill: string;
	user_id: string;
};

export type UserProjects = {
	id: number;
	image_url: string;
	title: string;
	code_link: string;
	live_link: string;
	like_count: string[] | null;
	liked_user_ids: string[];
	comment_count: string;
};

export type LoaderData = {
	userProfile: UserProfile;
	userProjects: UserProjects[];
	userSkills: UserSkills[];
};
