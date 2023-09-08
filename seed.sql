-- Insert data into the users table
INSERT INTO users (id, email, title, about, place, first_name, last_name)
VALUES
  ('1', 'user1@example.com', 'Software Engineer', 'I love coding!', 'UT', 'John', 'Doe'),
  ('2', 'user2@example.com', 'Web Developer', 'Passionate about front-end development.', 'FL', 'Jane', 'Smith'),
  ('3', 'user3@example.com', 'Data Scientist', 'Exploring the world of data.', 'OH', 'Michael', 'Johnson'),
  ('4', 'user4@example.com', 'Mobile App Developer', 'Building awesome apps.', 'CA', 'Emily', 'Williams'),
  ('5', 'user5@example.com', 'UI/UX Designer', 'Creating beautiful interfaces.', 'NY', 'David', 'Brown');


-- Insert data into the portfolioPosts table
INSERT INTO portfolio_posts (user_id, title, description)
VALUES
  ('1', 'My Project 1', 'Check out my latest project!'),
  ('2', 'Web App Demo', 'A demo of my web app.'),
  ('3', 'Data Analysis', 'Analyzing data from a real-world dataset.'),
  ('4', 'Mobile Game', 'Play my new mobile game!'),
  ('5', 'UI Redesign', 'Redesigned the user interface for an app.');

-- Insert data into the portfolioComments table
INSERT INTO portfolio_comments (user_id, post_id, comment)
VALUES
  ('2', 1, 'Great work!'),
  ('3', 2, 'I like your project.'),
  ('1', 3, 'Amazing analysis.'),
  ('4', 4, 'The game is fun.'),
  ('5', 5, 'Beautiful UI design.');

-- Insert data into the likes table
INSERT INTO likes (post_id, user_id)
VALUES
  (3, '2'),
  (4, '3'),
  (5, '1'),
  (1, '4'),
  (2, '2');


INSERT INTO follows (user_being_followed_id, user_following_id)
VALUES
  ('1', '2'),
  ('1', '3'),
  ('3', '1'),
  ('1', '4'),
  ('5', '2');

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

INSERT INTO skills (skill, user_id)
VALUES
  ('Java', '1'),
  ('Python', '1'),
  ('JavaScript', '2'),
  ('HTML/CSS', '2'),
  ('Data Analysis', '3'),
  ('Machine Learning', '3'),
  ('Unity', '4'),
  ('Mobile App Development', '4'),
  ('UI Design', '5'),
  ('UX Design', '5');


