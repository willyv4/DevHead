\echo 'Delete and recreate TEST DevHead db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS devhead_test;
DROP TABLE users, portfolio_posts, portfolio_comments, followers, likes;
CREATE DATABASE devhead_test;
\connect devhead_test

\i schema.sql
\i seed.sql
