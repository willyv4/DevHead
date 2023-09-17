import { Follows } from "./follows";

describe("Follows.addFollow", () => {
	test("should return { success: true } when adding a follow", async () => {
		const userId = "1";
		const followedUser = "2";

		const result = await Follows.addFollow(userId, followedUser);

		expect(result).toBeDefined();
		expect(result.success).toBe(true);
	});
});

describe("Follows.removeFollow", () => {
	test("should return { success: true } when removing a follow", async () => {
		const userId = "1";
		const followedUser = "2";

		const result = await Follows.removeFollow(userId, followedUser);

		expect(result).toBeDefined();
		expect(result.success).toBe(true);
	});
});
