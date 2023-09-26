# [DevHead Live Site](https://dev-head-willyv4.vercel.app/)

# API DATA

- Personal backend API
- Github Graphql API
- LeetCode Graphql API
- Clerk Auth API
- Cloudinary API (Image uploads)

# Database Outline

![Database Schema](./public/database.png)

---

# DevHead Features

### Profile Page

- Customizable Profiles: Users create unique digital identities by personalizing their profile pages with pictures, bio, skills, and contact info.

- Showcase Contributions: A central hub for displaying contributions, projects, and statistics.

- Integrate LeetCode and GitHub: Connect accounts to reveal proble-solving abilities and GitHub contributions.

- Flexible Customization: Conveniently add, edit, or delete features and posts to keep profiles current.

- Post Management: Create, edit, and delete posts directly from the profile page.

- Profile Completion Notifications: Encourage completion for visibility on the Devs page.

### Landing Page

- Introduction: Initial platform overview with key features.

- Navigation: Visitors can explore, sign in, or register.

### About Page

- In-Depth Information: Learn more about DevHead, its platform, developer, and future vision.

### Devs Page

- User Directory: Explore and connect with developers who completed their profiles.

### Post Page

- Dynamic Feed: Engage with developer posts through likes, comments, and links.

### Customization and Posting

- User Control: Customize profiles and posts to reflect evolving skills and projects.

### Authentication and Security

- Secure Login: OAuth-based authentication ensures user data safety.

---

# DevHead User Flow (Before and After Login)

### Before Login

1.  **Initial Visit**:

    - New visitors arrive at DevHead.
    - Explore Landing Page and About Page without login.

2.  **Landing Page (Before Login)**:

    - Learn about site purpose and key features.
    - Navigate to other pages or sign in/register.

3.  **About Page (Before Login)**:

    - Access detailed information about DevHead, its mission, and vision.

4.  **Authentication and Security (Login/Sign Up)**:
    - Secure OAuth-based authentication for registration and login.

### After Login

5.  **Landing Page (After Login)**:

    - Redirected to Landing Page with navigation options.

6.  **Navigation Bar**:
    - Access different sections:
    - **Profile Page**: Customize your profile, manage posts.
    - **Devs Page**: Explore other developers.
    - **Post Page**: Engage with posts from developers.

# Tests

- you can run tests with `npm run test`
- tests are located in the modules files and route-tests file

Certainly, I've added the additional API endpoints for fetching GitHub user info, LeetCode user info, and uploading images to Cloudinary:

# DevHead Backend API Documentation

Welcome to the DevHead backend API documentation. Below are the available API routes:

## Comments API

### Add Comment

- **POST** `/api/comments`
  - Add a comment to a project.

### Delete Comment

- **DELETE** `/api/comments`
  - Delete a comment by its comment ID.

## Follows API

### Add Follow

- **POST** `/api/follows`
  - Follow another user.

### Remove Follow

- **DELETE** `/api/follows`
  - Unfollow a user.

## User Profile API

### Get User Profile

- **GET** `/api/user/profile/:username`
  - Retrieve a user's profile information.

## Likes API

### Add Like

- **POST** `/api/likes`
  - Add a like to a project.

### Remove Like

- **DELETE** `/api/likes`
  - Remove a like from a project.

## Projects API

### Add Project

- **POST** `/api/projects`
  - Add a new project.

### Update Project

- **PUT** `/api/projects`
  - Update an existing project.

### Delete Project

- **DELETE** `/api/projects`
  - Delete a project by its project ID.

## Skills API

### Add Skill

- **POST** `/api/skills`
  - Add a skill to a user's profile.

### Remove Skill

- **DELETE** `/api/skills`
  - Remove a skill from a user's profile.

## GitHub User API

### Get GitHub User Info

- **GET** `/api/github-users/:username`
  - Retrieve GitHub user information by username.

## LeetCode User API

### Get LeetCode User Info

- **GET** `/api/leetcode-users/:username`
  - Retrieve LeetCode user information by username.

## Cloudinary API

### Upload Image to Cloudinary

- **POST** `/api/images/upload`
  - Upload an image to Cloudinary.

That's an overview of the available API endpoints, including the new endpoints for GitHub user info, LeetCode user info, and image uploading to Cloudinary.
