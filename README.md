## [DevHead Live Site](https://dev-head-willyv4.vercel.app/)

## API DATA:

- Personal backend API
- Github Graphql API
- LeetCode Graphql API
- Clerk Auth API
- Cloudinary API (Image uploads)

## Database Outline:

![Database Schema](./public/database.png)

## Features

**Profile Page**:

- Each user has their own customizable profile page, serving as their digital identity on DevHead.
- Users can personalize their profiles by uploading a profile picture and providing essential information, such as their bio, skills, and contact details.
- The profile page serves as a central hub for showcasing a user's contributions, projects, and statistics.
- Users can easily connect their LeetCode and GitHub profiles by entering their usernames, displaying detailed statistics on problem-solving abilities, GitHub contributions, and more.
- Additionally, users can conveniently customize their profiles by adding, editing, or deleting various features and posts.
- This flexibility empowers users to maintain profiles that stay current and relevant to their evolving skills and projects.
- Users can create, edit, and delete posts directly from their profile page, allowing them to share updates, insights, and project highlights.
- To encourage a vibrant and active community, users who haven't completed their profiles receive notifications, reminding them to do so. Completing profiles is necessary if users wish to be featured on the Devs page, enhancing their visibility within the developer community.

**Landing Page**

- The landing page serves as the initial introduction to the DevHead platform for new visitors.
- It provides a brief overview of the site's purpose and key features.
- Visitors can navigate to other pages or sign in/register from the landing page.

**About Page**:

- The About page offers more in-depth information about DevHead.
- It includes details about the platform, the developer, and future idea.

**Devs Page**:

- The Devs page is a directory of all users who have completed their profiles and want to be featured.
- It allows visitors to explore and discover other developers on the platform.
- Users can click on profiles to learn more about individual developers and connect with them.

**Post Page**:

- The Post page displays a feed of all the posts added to developer profiles.
- Users can scroll through and engage with posts by liking and commenting and visiting their provided links.
- It serves as a dynamic space for developers to share updates, ideas, and collaborate with each other.

**Profile Completion Notification**:

- Users who haven't completed their profiles will receive notifications in the app if they want to be feautured in the dev page.
- Completing profiles is necessary if users want to be featured on the Devs page, ensuring a vibrant and active community.

**Customization and Posting**:

- Users have the ability to customize their profiles by adding, editing, or deleting features and posts.
- This flexibility allows them to keep their profiles up-to-date and relevant to their evolving skills and projects.

**Authentication and Security**:

- DevHead uses secure OAuth-based authentication for user registration and login.
- Users can securely log in and log out of their accounts, ensuring the safety of their data.

Certainly! Here's the combined user flow that includes both the user journey before and after login:

**User Flow on DevHead (Before and After Login):**

**Before Login**:

1. **Initial Visit**:

   - New visitors arrive at the DevHead platform.
   - They can explore the Landing Page and About Page without the need to log in.

2. **Landing Page (Before Login)**:

   - Users are introduced to the site's purpose and key features.
   - They can navigate to other pages or choose to sign in or register for an account.

3. **About Page (Before Login)**:

   - Users interested in learning more about DevHead can access the About Page.
   - Here, they find in-depth information about the platform, its history, mission, and vision.

4. **Authentication and Security (Login/Sign Up)**:
   - Users who choose to register or sign in are directed to the secure OAuth-based authentication system.
   - They can log in securely or sign up for an account.

**After Login**:

5. **Landing Page (After Login)**:

   - Users who have logged in are redirected to the Landing Page.
   - From here, they can access the navigation bar for easy navigation to different sections of the platform.

6. **Navigation Bar**:
   - Users can use the navigation bar to move between different sections of the platform:
     - **Profile Page**: By clicking on their profile picture or username in the navigation bar, users can access their customizable profile page. Here, they can set up their digital identity, customize their profile, and manage their posts.
     - **Devs Page**: Users interested in exploring other developers on the platform can click on the "Devs" option in the navigation bar. This takes them to a directory of all users who have completed their profiles and want to be featured. Users can click on profiles to learn more about individual developers and connect with them.
     - **Post Page**: Users can access the "Posts" section from the navigation bar. Here, they see a feed of all the posts added to developer profiles and can engage with posts by liking, commenting, and visiting provided links.
