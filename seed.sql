-- Insert data into the users table
INSERT INTO users (id, username, email, title, about, skills, code_start, place)
VALUES
  (1, 'user1', 'user1@example.com', 'Software Engineer', 'I love coding!', 'Python, JavaScript', '2002', 'UT'),
  (2, 'user2', 'user2@example.com', 'Web Developer', 'Passionate about front-end development.', 'HTML, CSS, React', '2020', 'FL'),
  (3, 'user3', 'user3@example.com', 'Data Scientist', 'Exploring the world of data.', 'Python, R, SQL', '1994', 'OH'),
  (4, 'user4', 'user4@example.com', 'Mobile App Developer', 'Building awesome apps.', 'Flutter, Dart, Java', '2008', 'CA'),
  (5, 'user5', 'user5@example.com', 'UI/UX Designer', 'Creating beautiful interfaces.', 'Sketch, Adobe XD', '2013', 'NY');

-- Insert data into the portfolioPosts table
INSERT INTO portfolio_posts (id, user_id, title, description, like_count, image_url)
VALUES
  (1, 1, 'My Project 1', 'Check out my latest project!', 50, 'https://th.bing.com/th/id/OIP.AMf3_unDy19GQrtkKzjdDgHaEo?w=300&h=180&c=7&r=0&o=5&dpr=2&pid=1.7'),
  (2, 2, 'Web App Demo', 'A demo of my web app.', 30, ''),
  (3, 3, 'Data Analysis', 'Analyzing data from a real-world dataset.', 20, ''),
  (4, 4, 'Mobile Game', 'Play my new mobile game!', 15, ''),
  (5, 5, 'UI Redesign', 'Redesigned the user interface for an app.', 25, '');

-- Insert data into the portfolioComments table
INSERT INTO portfolio_comments (id, user_id, post_id, comment)
VALUES
  (1, 2, 1, 'Great work!'),
  (2, 3, 1, 'I like your project.'),
  (3, 1, 3, 'Amazing analysis.'),
  (4, 4, 4, 'The game is fun.'),
  (5, 5, 5, 'Beautiful UI design.');

INSERT INTO follows (user_being_followed_id, user_following_id)
VALUES
  (1, 2),
  (1, 3),
  (3, 1),
  (1, 4),
  (5, 2);

UPDATE users
SET followers = (
  SELECT ARRAY_AGG(user_following_id)
  FROM follows
  WHERE user_being_followed_id = users.id
),

following = (
  SELECT ARRAY_AGG(user_being_followed_id)
  FROM follows
  WHERE user_following_id = users.id
);

-- Insert data into the likes table
INSERT INTO likes (id, post_id, user_id)
VALUES
  (1, 1, 2),
  (2, 1, 3),
  (3, 3, 1),
  (4, 4, 4),
  (5, 5, 2);
