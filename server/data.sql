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

CREATE TABLE profiles (
	email VARCHAR(255) REFERENCES users(email) UNIQUE,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	profilePicUrl TEXT
);



INSERT INTO cvs (cv_title, user_email) VALUES ('TEST TITLE 1', 'test@test.com');

DELETE from profiles WHERE email = 'test@test.com';

