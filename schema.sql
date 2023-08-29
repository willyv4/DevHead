CREATE TABLE users (
  id text PRIMARY KEY NOT NULL,
  code_start text,
  first_name text,
  last_name text,
  place text,
  image_url text DEFAULT 'https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg',
  username varchar(255) UNIQUE NOT NULL,
  email varchar(255) NOT NULL,
  title text,
  about text,
  skills text,
  leetcode_username text,
  github_username text,
  followers text[],
  following text[]
);

CREATE TABLE portfolio_posts (
  id SERIAL PRIMARY KEY,
  image_url text DEFAULT 'https://th.bing.com/th/id/OIP.e9PHbpvIOy4amhGHg7FUeAHaHa?w=215&h=215&c=7&r=0&o=5&dpr=2&pid=1.7',
  user_id text NOT NULL,
  title text,
  description text,
  code_link text,
  live_link text,
  like_count int,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE portfolio_comments (
  id SERIAL PRIMARY KEY,
  user_id text NOT NULL,
  post_id int,
  comment text,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES portfolio_posts(id)
);

CREATE TABLE likes (
  id int PRIMARY KEY,
  post_id int,
  user_id text NOT NULL,
  FOREIGN KEY (post_id) REFERENCES portfolio_posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE follows (
  user_being_followed_id text,
  user_following_id text,
  FOREIGN KEY (user_being_followed_id) REFERENCES users(id),
  FOREIGN KEY (user_following_id) REFERENCES users(id)
);





