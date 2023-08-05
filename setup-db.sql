\echo 'Delete and recreate DevHead db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE devhead;
CREATE DATABASE devhead;
\connect devhead

\i schema.sql
\i seed.sql

-- \echo 'Delete and recreate devhead_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE devhead_test;
-- CREATE DATABASE devhead_test;
-- \connect devhead_test

-- \i schema.sql