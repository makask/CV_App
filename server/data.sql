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

CREATE TABLE cv_profile (
    id INTEGER REFERENCES cvs(id) UNIQUE,
    profilePicUrl TEXT,
    fullName VARCHAR(255)
);

CREATE TABLE cv_contact (
  id INTEGER REFERENCES cvs(id) ON DELETE CASCADE,
  title VARCHAR(255),
  phone VARCHAR(255),
  email VARCHAR(255),
  user_address VARCHAR(255),
  facebook VARCHAR(255),
  linkedin VARCHAR(255),
  github VARCHAR(255)
);





INSERT INTO cvs (cv_title, user_email) VALUES ('TEST TITLE 1', 'test@test.com');

DELETE from profiles WHERE email = 'test@test.com';

