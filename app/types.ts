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

export type LoaderData = {
	userProfile: UserProfile;
	userProjects: UserProject[];
	userSkills: UserSkills[];
};

export type UserData = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	title: string;
	image_url: string;
	about: string;
	skills: string;
	code_start: string;
	followers: string[];
	following: string[];
};

export type Users = {
	users: UserData[];
};

export type UserProject = {
	id: number;
	image_url: string;
	title: string;
	code_link: string;
	live_link: string;
	like_count: string[] | null;
	comment_count: string;
	liked_user_ids: string[];
	author_first_name: string;
	author_last_name: string;
	user_id: string;
};
