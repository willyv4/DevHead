## API DATA:

- github API
- Personal backend API (links user data between the front and back end).

- [leetCode Api(possibly - stretch goal)](https://github.com/JeremyTsaii/leetcode-stats-api)

## Database Outline:

![Database Schema](./public/database.png)

- (stretch goals...)
- resume table
- workHistory table
- Education

## User Flow:

1. **Homepage (for Non-Logged-In Users):**

   - Non-logged-in users can view a list of developers (devs).
   - They can click on a dev's profile to view their portfolio and information.

2. **Viewing a Dev's Profile (for Non-Logged-In Users):**

   - Non-logged-in users can see a dev's portfolio and details.
   - Interaction options (like, comment, follow) are not available.

3. **Login Page:**

   - Users can log in via GitHub for authentication.

4. **Profile Creation (for Logged-In Users):**

   - After logging in, users can create a personalized profile with their tech stack, skills, and information.

5. **User Dashboard (for Logged-In Users):**

   - Logged-in users have a dashboard with a personalized feed of posts from followed devs and their own posts.

6. **Interacting with Posts (for Logged-In Users):**

   - Logged-in users can like and comment on posts.
   - They can create new posts to showcase their portfolio.

7. **Navigation and Menus:**

   - Users can easily navigate between sections using a menu.

8. **Logout:**
   - Users can log out from their account.
