import { User } from "./users";
import {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
} from "./_testCommon";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
// afterAll();

describe("getUserProfileById method", () => {
	test("should return a user profile when a valid id is provided", async () => {
		// Arrange: Prepare the test data and environment
		const validUserId = "1"; // Replace with a valid user ID from your test data

		// Act: Call the method you want to test
		const userProfile = await User.getUserProfileById(validUserId);

		console.log(userProfile);
		// Assert: Check the result and expectations
		expect(userProfile).toBeDefined();
		expect(userProfile.id).toBe(validUserId); // Adjust this expectation based on your data
		expect(userProfile.followers).toBeDefined();
		expect(userProfile.following).toBeDefined();
		// Add more assertions as needed
	});

	test("should return an error message and status when an invalid id is provided", async () => {
		// Arrange: Prepare the test data and environment
		const invalidUserId = "invalidUserId"; // Replace with an invalid user ID for testing

		// Act: Call the method with an invalid ID
		const userProfile = await User.getUserProfileById(invalidUserId);

		// Assert: Check that an error message and status are returned
		expect(userProfile).toBeDefined();
		expect(userProfile.message).toContain("Error getting user Profile with id");
		expect(userProfile.status).toBe(500); // Adjust this expectation based on your error handling
		// Add more assertions as needed
	});

	test("should return an error message and status when a database query fails", async () => {
		// Arrange: Prepare the test data and environment
		const errorUserId = "errorUserId"; // Replace with a user ID that triggers a database error

		// Act: Call the method with an ID that triggers a database error
		const userProfile = await User.getUserProfileById(errorUserId);

		// Assert: Check that an error message and status are returned
		expect(userProfile).toBeDefined();
		expect(userProfile.message).toContain("Error getting user Profile with id");
		expect(userProfile.status).toBe(500); // Adjust this expectation based on your error handling
		// Add more assertions as needed
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
