// import Posts from "./posts";
// import {
// 	commonBeforeAll,
// 	commonBeforeEach,
// 	commonAfterEach,
// } from "./_testCommon";

// beforeAll(commonBeforeAll);
// beforeEach(commonBeforeEach);
// afterEach(commonAfterEach);

// describe("Posts.getUserProjectsById", () => {
// 	test("should return an array of user projects when a valid user id is provided", async () => {
// 		const userId = "1";

// 		const userProjects = await Posts.getUserProjectsById(userId);

// 		expect(Array.isArray(userProjects)).toBe(true);
// 		expect(userProjects.length).toBeGreaterThan(0);
// 	});

// 	test("should return an empty array when an invalid user id is provided", async () => {
// 		const invalidUserId = "invalidId";

// 		const userProjects = await Posts.getUserProjectsById(invalidUserId);

// 		expect(Array.isArray(userProjects)).toBe(true);
// 		expect(userProjects.length).toBe(0);
// 	});
// });

// describe("Posts.addUserProject", () => {
// 	test("should return { success: true } when adding a user project", async () => {
// 		const userId = "1";
// 		const projectImage = "projectImage.jpg";
// 		const projectTitle = "Project Title";
// 		const projectLiveLink = "https://example.com/live";
// 		const projectCodeLink = "https://example.com/code";

// 		const result = await Posts.addUserProject(
// 			userId,
// 			projectImage,
// 			projectTitle,
// 			projectLiveLink,
// 			projectCodeLink
// 		);

// 		expect(result).toBeDefined();
// 		expect(result.success).toBe(true);
// 	});
// });

// describe("Posts.updateUserProject", () => {
// 	test("should return { success: true } when updating a user project by its ID", async () => {
// 		const projectId = 1;
// 		const userId = "1";
// 		const projectImage = "updatedImage.jpg";
// 		const projectTitle = "Updated Title";
// 		const projectLiveLink = "https://updated.com/live";
// 		const projectCodeLink = "https://updated.com/code";

// 		const result = await Posts.updateUserProject(
// 			projectId,
// 			userId,
// 			projectImage,
// 			projectTitle,
// 			projectLiveLink,
// 			projectCodeLink
// 		);

// 		expect(result).toBeDefined();
// 		expect(result.success).toBe(true);
// 	});
// });

// describe("Posts.deleteProjectById", () => {
// 	test("should return { deleted: true } when deleting a project by its ID", async () => {
// 		const projectId = 1;

// 		const result = await Posts.deleteProjectById(projectId);

// 		expect(result).toBeDefined();
// 		expect(result.deleted).toBe(true);
// 	});
// });

// describe("Posts.getAllUserProjects", () => {
// 	test("should return an array of all user projects with additional data", async () => {
// 		const allUserProjects = await Posts.getAllUserProjects();

// 		expect(Array.isArray(allUserProjects)).toBe(true);
// 		expect(allUserProjects.length).toBeGreaterThan(0);
// 		const project = allUserProjects[0];
// 		expect(project.author_first_name).toBeDefined();
// 		expect(project.author_last_name).toBeDefined();
// 		expect(project.comment_count).toBeDefined();
// 		expect(Array.isArray(project.liked_user_ids)).toBe(true);
// 	});
// });
