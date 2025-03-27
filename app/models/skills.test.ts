// import { Skills } from "./skills";
// import {
// 	commonBeforeAll,
// 	commonBeforeEach,
// 	commonAfterEach,
// } from "./_testCommon";

// beforeAll(commonBeforeAll);
// beforeEach(commonBeforeEach);
// afterEach(commonAfterEach);

// describe("Skills.addSkill", () => {
// 	test("should return { success: true } when adding a skill to a user", async () => {
// 		const userId = "1";
// 		const skill = "JavaScript";
// 		const result = await Skills.addSkill(userId, skill);

// 		expect(result).toBeDefined();
// 		expect(result.success).toBe(true);
// 	});
// });

// describe("Skills.getSkillsById", () => {
// 	test("should return an array of skills when a valid user id is provided", async () => {
// 		const userId = "1";
// 		const skills = await Skills.getSkillsById(userId);

// 		expect(Array.isArray(skills)).toBe(true);
// 		expect(skills.length).toBeGreaterThan(0);
// 	});

// 	test("should return an empty array when an invalid user id is provided", async () => {
// 		const invalidUserId = "invalidId";
// 		const skills = await Skills.getSkillsById(invalidUserId);

// 		expect(Array.isArray(skills)).toBe(true);
// 		expect(skills.length).toBe(0);
// 	});
// });

// describe("Skills.removeSkill", () => {
// 	test("should return { success: true } when removing a skill by its ID", async () => {
// 		const skillId = 1;
// 		const result = await Skills.removeSkill(skillId);

// 		expect(result).toBeDefined();
// 		expect(result.success).toBe(true);
// 	});

// 	test("should return { success: true } when removing a skill by its ID", async () => {
// 		const invalidSkillId = 9999;
// 		const result = await Skills.removeSkill(invalidSkillId);

// 		expect(result).toBeDefined();
// 		expect(result.success).toBe(true);
// 	});
// });
