DROP TABLE if EXISTS todos;
CREATE TABLE IF NOT EXISTS todos(
  id SERIAL PRIMARY KEY,
  name VARCHAR(24) NOT NULL,
  description TEXT NOT NULL UNIQUE
);
