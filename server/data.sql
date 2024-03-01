/* CREATE TABLES */
CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

CREATE TABLE cvs (
  id SERIAL PRIMARY KEY,
  cv_title VARCHAR(255),
  user_email VARCHAR REFERENCES users(email)
);

