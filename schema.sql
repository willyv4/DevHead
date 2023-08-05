CREATE TABLE users (
  id int PRIMARY KEY NOT NULL,
  image_url text DEFAULT 'https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg',
  username varchar(255) UNIQUE NOT NULL,
  email varchar(255) NOT NULL,
  title text,
  about text,
  skills text
);

CREATE TABLE portfolio_posts (
  id int PRIMARY KEY,
  image_url text DEFAULT 'https://th.bing.com/th/id/OIP.e9PHbpvIOy4amhGHg7FUeAHaHa?w=215&h=215&c=7&r=0&o=5&dpr=2&pid=1.7',
  user_id int,
  title text,
  description text,
  like_count int,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE portfolio_comments (
  id int PRIMARY KEY,
  user_id int,
  post_id int,
  comment text,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES portfolio_posts(id)
);

CREATE TABLE followers (
  follower_id int,
  followed_user_id int,
  FOREIGN KEY (follower_id) REFERENCES users(id),
  FOREIGN KEY (followed_user_id) REFERENCES users(id)
);

CREATE TABLE likes (
  id int PRIMARY KEY,
  post_id int,
  user_id int,
  FOREIGN KEY (post_id) REFERENCES portfolio_posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
