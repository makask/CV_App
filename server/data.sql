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
    id INTEGER REFERENCES cvs(id) ON DELETE CASCADE,
    picUrl TEXT,
    fullName VARCHAR(255)
)

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

CREATE TABLE cv_education_title(
  id INTEGER REFERENCES cvs(id) ON DELETE CASCADE,
  title VARCHAR(255)
);

CREATE TABLE institution(
  id SERIAL PRIMARY KEY,
  years_of_study VARCHAR(255),
  speciality VARCHAR(255),
  school_name VARCHAR(255),
  cv_id INTEGER REFERENCES cvs(id) ON DELETE CASCADE, 
);

CREATE TABLE cv_languages_title(
  id INTEGER REFERENCES cvs(id) ON DELETE CASCADE,
  title VARCHAR(255)
);

CREATE TABLE languages(
  id SERIAL PRIMARY KEY,
  language VARCHAR(255),
  cv_id INTEGER REFERENCES cvs(id) ON DELETE CASCADE
)

CREATE TABLE cv_driving_licence_title(
  id INTEGER REFERENCES cvs(id) ON DELETE CASCADE,
  title VARCHAR(255)
);

CREATE TABLE cv_driving_licences(
  id INTEGER REFERENCES cvs(id) ON DELETE CASCADE,
  licences VARCHAR(255)
);

CREATE TABLE work_experience_title(
  id INTEGER REFERENCES cvs(id) ON DELETE CASCADE,
  title VARCHAR(255)
);

CREATE TABLE skills_title(
  id INTEGER REFERENCES cvs(id) ON DELETE CASCADE,
  title VARCHAR(255)
);

CREATE TABLE hobbies_title(
  id INTEGER REFERENCES cvs(id) ON DELETE CASCADE,
  title VARCHAR(255)
);


