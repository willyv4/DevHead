\echo 'Delete and recreate DevHead db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS devhead;
DROP TABLE users, portfolio_posts, portfolio_comments, followers, likes;
CREATE DATABASE devhead;
\connect devhead

\i schema.sql
\i seed.sql
