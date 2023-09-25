import { User } from "./users";
import type { UserData } from "~/types";
import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "./_testCommon";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);

describe("getUserProfileById method", () => {
	test("should return a user profile when a valid id is provided", async () => {
		const validUserId = "1";
		const userProfile = await User.getUserProfileById(validUserId);

		expect(userProfile).toBeDefined();
		expect(userProfile.id).toBe(validUserId);
		expect(userProfile.followers).toBeDefined();
		expect(userProfile.following).toBeDefined();
	});

	test("should return an error message and status when an invalid id is provided", async () => {
		const invalidUserId = "invalidUserId";
		const userProfile = await User.getUserProfileById(invalidUserId);

		expect(userProfile).toBeDefined();
		expect(userProfile.message).toContain("Error getting user Profile with id");
		expect(userProfile.status).toBe(500);
	});

	test("should return an error message and status when a database query fails", async () => {
		const errorUserId = "errorUserId";
		const userProfile = await User.getUserProfileById(errorUserId);

		expect(userProfile).toBeDefined();
		expect(userProfile.message).toContain("Error getting user Profile with id");
		expect(userProfile.status).toBe(500);
	});
});
describe("User.getUserById", () => {
	test("returns user data when a valid id is provided", async () => {
		const userId = "1";
		const user = await User.getUserById(userId);

		expect(user).toEqual({
			id: "1",
			image_url:
				"https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg",
		});
	});

	test("returns error message when an empty id is provided", async () => {
		const userId = "";
		const user = await User.getUserById(userId);

		expect(user).toEqual({
			message: "Error getting user with id: }",
		});
	});

	test("returns an error message when the database query fails", async () => {
		const userId = "jerry";
		const user = await User.getUserById(userId);

		expect(user).toEqual({
			message: "Error getting user with id: jerry}",
		});
	});
});

describe("User.getUserOverviews", () => {
	test("returns the correct amount of users in the database", async () => {
		const users = (await User.getUserOverviews()).users as UserData[];
		// no users in the testing have a complete profile
		expect(users.length).toEqual(0);
	});

	test("each method is defined and user.id it not null", async () => {
		const users = (await User.getUserOverviews()).users as UserData[];

		// eslint-disable-next-line array-callback-return
		users.map((user) => {
			expect(user.id).toBeTruthy();
			expect(user.id).toBeDefined();
			expect(user.first_name).toBeDefined();
			expect(user.last_name).toBeDefined();
			expect(user.image_url).toBeDefined();
			expect(user.email).toBeDefined();
			expect(user.title).toBeDefined();
			expect(user.followers).toBeDefined();
			expect(user.following).toBeDefined();
		});
	});
});

describe("User.addUser", () => {
	test("should add a new user to the database with valid input", async () => {
		const userId = "6";
		const firstName = "Alice";
		const lastName = "Johnson";
		const email = "alice@example.com";
		const imageUrl = "https://example.com/alice.jpg";

		const addedUser = await User.addUser(
			userId,
			firstName,
			lastName,
			email,
			imageUrl
		);

		expect(addedUser).toBeDefined();
		expect(addedUser.id).toBe(userId);
		expect(addedUser.firstName).toBe(firstName);
		expect(addedUser.lastName).toBe(lastName);
		expect(addedUser.email).toBe(email);
		expect(addedUser.imageUrl).toBe(imageUrl);
	});

	test("should return the existing user if user with the same id already exists", async () => {
		const userId = "1";

		const existingUser = await User.addUser(
			userId,
			"New",
			"User",
			"new@example.com",
			null
		);

		expect(existingUser).toBeDefined();
		expect(existingUser.id).toBe(userId);
	});
});

describe("User.updateUser", () => {
	test("should update an existing user with valid input", async () => {
		const userId = "1";
		const updatedFirstName = "Updated First Name";
		const updatedLastName = "Updated Last Name";
		const updatedEmail = "updated@example.com";
		const updatedImageUrl = "https://example.com/updated.jpg";
		const updatedTitle = "Updated Title";

		const updatedUser = await User.updateUser(
			userId,
			updatedFirstName,
			updatedLastName,
			updatedEmail,
			updatedImageUrl,
			updatedTitle
		);

		expect(updatedUser).toBeDefined();
		expect(updatedUser.id).toBe(userId);
		expect(updatedUser.firstName).toBe(updatedFirstName);
		expect(updatedUser.lastName).toBe(updatedLastName);
		expect(updatedUser.email).toBe(updatedEmail);
		expect(updatedUser.imageUrl).toBe(updatedImageUrl);
		expect(updatedUser.title).toBe(updatedTitle);
	});

	test("should return an error message and status if user with specified id is not found", async () => {
		const userId = "nonexistentId";
		const updatedUser = await User.updateUser(
			userId,
			"Updated First Name",
			"Updated Last Name",
			"updated@example.com",
			"https://example.com/updated.jpg",
			"Updated Title"
		);

		expect(updatedUser).toBeDefined();
		expect(updatedUser.message).toContain(`User with id ${userId} not found`);
		expect(updatedUser.status).toBe(500);
	});
});

describe("User.connectLeetcode", () => {
	test("should return success: true when a valid LeetCode username is provided", async () => {
		const userId = "1";
		const leetcodeUsername = "testLeetCodeUsername";

		const result = await User.connectLeetcode(userId, leetcodeUsername);

		expect(result).toBeDefined();
		expect(result.success).toBe(true);
	});

	test("should return success: false when a null LeetCode username is provided", async () => {
		const userId = "1";
		const leetcodeUsername = null;

		const result = await User.connectLeetcode(userId, leetcodeUsername);

		expect(result).toBeDefined();
		expect(result.success).toBe(false);
	});
});

describe("User.connectGithub", () => {
	test("should return success: true when a valid GitHub username is provided", async () => {
		const userId = "1";
		const githubUsername = "testGithubUsername";

		const result = await User.connectGithub(userId, githubUsername);

		expect(result).toBeDefined();
		expect(result.success).toBe(true);
	});

	test("should return success: false when a null GitHub username is provided", async () => {
		const userId = "1";
		const githubUsername = null;

		const result = await User.connectGithub(userId, githubUsername);

		expect(result).toBeDefined();
		expect(result.success).toBe(false);
	});
});

describe("User.addUserBio", () => {
	test("should return success: true when a valid user bio is provided", async () => {
		const userId = "1";
		const userBio = "This is my bio.";

		const result = await User.addUserBio(userId, userBio);

		expect(result).toBeDefined();
		expect(result.success).toBe(true);
	});

	test("should return success: false when a null user bio is provided", async () => {
		const userId = "1";
		const userBio = null;

		const result = await User.addUserBio(userId, userBio);

		expect(result).toBeDefined();
		expect(result.success).toBe(false);
	});
});

describe("User.remove", () => {
	test("should return { deleted: true } when a valid user id is provided", async () => {
		const userId = "1";

		const result = await User.remove(userId);

		expect(result).toBeDefined();
		expect(result.deleted).toBe(true);
	});

	test("should return { deleted: false, message: 'No user with id: {id}' } when an invalid user id is provided", async () => {
		const invalidUserId = "invalidId"; // An invalid user id

		const result = await User.remove(invalidUserId);

		expect(result).toBeDefined();
		expect(result.deleted).toBe(false);
		expect(result.message).toContain(`No user with id: ${invalidUserId}`);
	});
});
