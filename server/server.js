import express, { response } from "express";
import { db } from "./db.js";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from 'cloudinary';


const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// get all user CVs
app.get('/cvs/:userEmail', async(req, res) => {
    const { userEmail } = req.params;
    try{
        const cvs = await db.query("SELECT * FROM cvs WHERE user_email = $1 ORDER BY id ASC", [userEmail]);
        res.json(cvs.rows);
    }catch(err){    
        console.error(err);
    }
});

// get user profile data
app.get('/profile/:userEmail', async(req, res) => {
    const { userEmail } = req.params;
    try{
        const data = await db.query("SELECT * FROM profiles WHERE email = $1", [userEmail]);
        res.json(data.rows);
    }catch(err){
        console.error(err);
    }
});

// edit user profile
app.put("/profile/:email", async(req, res) => {
    const { email } = req.params;
    const { first_name, last_name, profilepicurl } = req.body;
    try{
        const editProfile = await db.query('UPDATE profiles SET first_name = $1, last_name = $2, profilepicurl = $3 WHERE email = $4; ',
        [ first_name, last_name, profilepicurl, email ]);
        res.json(editProfile);
    }catch(err){
        console.error(err);
    }
});

// edit user profile picture
app.put('/profilepic/:email', async(req, res) => {
    const {email} = req.params;
    const {profilepicurl} = req.body;
    try{
        const editProfilePicUrl = await db.query('UPDATE profiles SET profilepicurl = $1 WHERE email = $2', [profilepicurl, email]);
        res.json(editProfilePicUrl);
    }catch(err){
        console.error(err);
    }
})

// add new default cv profile
app.post('/cv/cvprofile/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const defaultCVProfile = await db.query("INSERT INTO cv_profile(id, picurl, fullname) VALUES ($1, $2, $3)", 
        [id, "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg", "FULL NAME"]); 
        res.json(defaultCVProfile);
    }catch(err){
        console.error(err);
    }
});

// update cv profile image url to uploaded image url
app.put('/cv/cvprofilepic/:id', async(req, res) => {
    const{id} = req.params;
    const{picurl} = req.body;
    try{
        const uploadedCVProfilePic = await db.query("UPDATE cv_profile SET picurl = $1 WHERE id = $2", [picurl, id]);
        res.json(uploadedCVProfilePic); 
    }catch(err){
        console.error(err);
    }
})

// update cv profile fullname
app.put('/cv/cvfullname/:id', async(req, res) => {
    const{id} = req.params;
    const{fullname} = req.body;
    try{
        const editFullName = await db.query("UPDATE cv_profile SET fullname = $1 WHERE id = $2", [fullname, id]);
        res.json(editFullName);
    }catch(err){
        console.error(err);
    }
});

// get cv profile
app.get('/cv/cvprofile/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const cvProfile = await db.query("SELECT * FROM cv_profile WHERE id = $1", [id]);
        res.json(cvProfile.rows);
    }catch(err){
        console.error(err);
    }
});

// get cv contacts
app.get('/cv/contact/:id', async(req, res) => {
    const { id } = req.params;
    try{
        const contacts = await db.query("SELECT * FROM cv_contact WHERE id = $1", [id]);
        res.json(contacts.rows);
    }catch(err){
        console.log(error);
    }
});

// edit cv contacts
app.put('/cv/contact/:id', async(req, res) => {
    const { id } = req.params;
    const { title, phone, email, user_address, facebook, linkedin, github } = req.body;
    try{
        const editContacts = await db.query('UPDATE cv_contact SET title = $1, phone = $2, email = $3, user_address = $4, facebook = $5, linkedin = $6, github = $7 WHERE id = $8',
        [title, phone, email, user_address, facebook, linkedin, github, id]);
        res.json(editContacts);
    }catch(err){    
        console.error(err);
    }
});

// add new default cv contact
app.post('/cv/contact/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const newContact = await db.query("INSERT INTO cv_contact(id, title, phone, email, user_address, facebook, linkedin, github) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [id, "CONTACT INFO", "Phone", "Email", "Address", "Facebook", "Linkedin", "Github"]);
        res.json(newContact);
    }catch(err){    
        console.error(err);
    }
});

// add new default cv education title
app.post('/cv/educationtitle/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const defEdTitle = await db.query("INSERT INTO cv_education_title(id, title) VALUES ($1, $2)", [id, "EDUCATION"]);
        res.json(defEdTitle);
    }catch(err){
        console.error(err);
    }
})

// get cv education title
app.get('/cv/educationtitle/:id', async(req, res) => {
    const{id} = req.params;
    try{    
        const response = await db.query("SELECT * FROM cv_education_title WHERE id = $1", [id]);
        res.json(response.rows);
    }catch(err){
        console.error(err);
    }
});

// edit cv education title
app.put('/cv/educationtitle/:id', async(req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try{
        const editEducationTitle = await db.query('UPDATE cv_education_title SET title = $1 WHERE id = $2',
        [title,id]);
        res.json(editEducationTitle);
    }catch(err){    
        console.error(err);
    }
});

// get all educational institutions
app.get('/cv/institution/:cvId', async(req, res) => {
    const{cvId} = req.params;
    try{
        const institutions = await db.query("SELECT * FROM institution WHERE cv_id = $1 ORDER BY id DESC", [cvId]);
        res.json(institutions.rows);
    }catch(err){
        console.error(err);
    }
});

// add new education facility
app.post('/cv/institution/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const response = await db.query("INSERT INTO institution(years_of_study, speciality, school_name, cv_id) VALUES ($1, $2, $3, $4)", 
        ["Years of study", "Speciality", "Educational Institution", id]);
        res.json(response);
    }catch(err){
        console.error(err);
    }
});

// Edit institution
app.put('/cv/institution/:id', async(req, res) => {
    const{id} = req.params;
    const{years_of_study, speciality, school_name } = req.body;
    try{
        const editInstitution = await db.query('UPDATE institution SET years_of_study = $1, speciality = $2, school_name = $3 WHERE id = $4', 
        [years_of_study, speciality, school_name, id]);
        res.json(editInstitution);
    }catch(err){
        console.error(err);
    }
});

// delete educational institution
app.delete('/cv/institution/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const deleteInstitution = await db.query('DELETE FROM institution WHERE id = $1', [id]);
        res.json(deleteInstitution);
    }catch(err){
        console.error(err);
    }
});

// get cv language title
app.get('/cv/languagestitle/:id', async(req, res) => {
    const{id} = req.params;
    try{    
        const response = await db.query("SELECT * FROM cv_languages_title WHERE id = $1", [id]);
        res.json(response.rows);
    }catch(err){
        console.error(err);
    }
});

// edit cv languages title
app.put('/cv/languagestitle/:id', async(req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try{
        const editEducationTitle = await db.query('UPDATE cv_languages_title SET title = $1 WHERE id = $2',
        [title,id]);
        res.json(editEducationTitle);
    }catch(err){    
        console.error(err);
    }
});

// add new default cv languages title
app.post('/cv/languagestitle/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const defLangTitle = await db.query("INSERT INTO cv_languages_title(id, title) VALUES ($1, $2)", [id, "LANGUAGES"]);
        res.json(defLangTitle);
    }catch(err){
        console.error(err);
    }
})

// get all language items
app.get('/cv/languages/:cvId', async(req, res) => {
    const{cvId} = req.params;
    try{
        const response = await db.query("SELECT * FROM languages WHERE cv_id = $1 ORDER BY id DESC", [cvId]);
        res.json(response.rows);
    }catch(err){
        console.error(err);
    }
})

// add language item
app.post('/cv/languages/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const langItem = await db.query("INSERT INTO languages(language, cv_id) VALUES ($1, $2)", ["Language", id]);
        res.json(langItem);
    }catch(err){
        console.error(err);
    }
})

// edit language item
app.put('/cv/languages/:id', async(req, res) => {
    const{id} = req.params;
    const{ language } = req.body;
    try{
        const editLanguage = await db.query('UPDATE languages SET language = $1 WHERE id = $2', 
        [language, id]);
        res.json(editLanguage);
    }catch(err){
        console.error(err);
    }
});

// delete language item
app.delete('/cv/languages/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const deleteLanguage = await db.query('DELETE FROM languages WHERE id = $1', [id]);
        res.json(deleteLanguage);
    }catch(err){
        console.error(err);
    }
});

// Add default driving licence title
app.post('/cv/drivinglicencetitle/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const defLicenceTitle = await db.query("INSERT INTO cv_driving_licence_title(id, title) VALUES ($1, $2)", [id, "DRIVING LICENCE"]);
        res.json(defLicenceTitle);
    }catch(err){
        console.error(err);
    }
});

// Get driving licence title
app.get('/cv/drivinglicencetitle/:id', async(req, res) => {
    const{id} = req.params;
    try{    
        const response = await db.query("SELECT * FROM cv_driving_licence_title WHERE id = $1", [id]);
        res.json(response.rows);
    }catch(err){
        console.error(err);
    }
});

// Edit driving licence title
app.put('/cv/drivinglicencetitle/:id', async(req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try{
        const editLicenceTitle = await db.query('UPDATE cv_driving_licence_title SET title = $1 WHERE id = $2',
        [title,id]);
        res.json(editLicenceTitle);
    }catch(err){    
        console.error(err);
    }
});

// Add default driving licence
app.post('/cv/drivinglicence/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const defLicence = await db.query("INSERT INTO cv_driving_licences(id, licences) VALUES ($1, $2)", [id, "None"]);
        res.json(defLicence);
    }catch(err){
        console.error(err);
    }
});

// Get driving licence
app.get('/cv/drivinglicence/:id', async(req, res) => {
    const{id} = req.params;
    try{    
        const response = await db.query("SELECT * FROM cv_driving_licences WHERE id = $1", [id]);
        res.json(response.rows);
    }catch(err){
        console.error(err);
    }
});

// Edit driving licence
app.put('/cv/drivinglicence/:id', async(req, res) => {
    const { id } = req.params;
    const { licences } = req.body;
    try{
        const editLicences = await db.query('UPDATE cv_driving_licences SET licences = $1 WHERE id = $2',
        [licences,id]);
        res.json(editLicences);
    }catch(err){    
        console.error(err);
    }
});

// Add default about me title
app.post('/cv/aboutmetitle/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const defAboutMeTitle = await db.query("INSERT INTO cv_about_me_title(id, title) VALUES ($1, $2)", [id, "ABOUT ME"]);
        res.json(defAboutMeTitle);
    }catch(err){
        console.error(err);
    }
})

// Get about me title
app.get('/cv/aboutmetitle/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const response = await db.query("SELECT * FROM cv_about_me_title WHERE id = $1", [id]);
        res.json(response.rows);
    }catch(err){
        console.error(err);
    }
});
// Edit about me title
app.put('/cv/aboutmetitle/:id', async(req, res) =>{
    const{id} = req.params;
    const{title} = req.body;
    try{
        const response = await db.query("UPDATE cv_about_me_title SET title = $1 WHERE id = $2", [title, id]);
        res.json(response);
    }catch(err){
        console.error(err);
    }
});

// Add default about me
app.post('/cv/aboutme/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const defAboutMe = await db.query("INSERT INTO cv_about_me(id, about_text) VALUES ($1, $2)", [id, "Write something about yourself..."]);
        res.json(defAboutMe);
    }catch(err){
        console.error(err);
    }
})

// Get about me text
app.get('/cv/aboutme/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const response = await db.query("SELECT * FROM cv_about_me WHERE id = $1", [id]);
        res.json(response.rows);
    }catch(err){
        console.error(err);
    }
});

// Edit about me text
app.put('/cv/aboutme/:id', async(req, res) =>{
    const{id} = req.params;
    const{about_text} = req.body;
    try{
        const response = await db.query("UPDATE cv_about_me SET about_text = $1 WHERE id = $2", [about_text, id]);
        res.json(response);
    }catch(err){
        console.error(err);
    }
});

// Add default work experience title
app.post('/cv/workexperiencetitle/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const defWorkExpTitle = await db.query("INSERT INTO cv_work_experience_title(id, title) VALUES ($1, $2)", [id, "WORK EXPERIENCE"]);
        res.json(defWorkExpTitle);
    }catch(err){
        console.error(err);
    }
})

// Get work experience title
app.get('/cv/workexperiencetitle/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const response = await db.query("SELECT * FROM cv_work_experience_title WHERE id = $1", [id]);
        res.json(response.rows);
    }catch(err){
        console.error(err);
    }
});

// Edit work experience title
app.put('/cv/workexperiencetitle/:id', async(req, res) =>{
    const{id} = req.params;
    const{title} = req.body;
    try{
        const response = await db.query("UPDATE cv_work_experience_title SET title = $1 WHERE id = $2", [title, id]);
        res.json(response);
    }catch(err){
        console.error(err);
    }
});

// Get all work experience items
app.get('/cv/workexperience/:cvId', async(req, res) => {
    const{cvId} = req.params;
    try{
        const response = await db.query("SELECT * FROM cv_work_experience WHERE cv_id = $1 ORDER BY id DESC", [cvId]);
        res.json(response.rows);
    }catch(err){
        console.error(err);
    }
})

// Add new work experience item
app.post('/cv/workexperience/:cvId', async(req, res) => {
    const{cvId} = req.params;
    try{
        const response = await db.query("INSERT INTO cv_work_experience(working_period, profession, company, job_description, cv_id) VALUES ($1, $2, $3, $4, $5)",
        ["Working period", "Profession", "Company", "Job description", cvId]);
        res.json(response);
    }catch(err){
        console.error(err);
    }
});

// Edit work experience item
app.put('/cv/workexperience/:id', async(req, res) => {
    const{id} = req.params;
    const{working_period, profession, company, job_description} = req.body;
    try{
        const editWorkExpItem = await db.query('UPDATE cv_work_experience SET working_period = $1, profession = $2, company = $3, job_description = $4 WHERE id = $5', 
        [working_period, profession, company, job_description, id]);
        res.json(editWorkExpItem);
    }catch(err){
        console.error(err);
    }
});

// Delete work experience item
app.delete('/cv/workexperience/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const deleteWorkItem = await db.query('DELETE FROM cv_work_experience WHERE id = $1', [id]);
        res.json(deleteWorkItem);
    }catch(err){
        console.error(err);
    }
});

// Add default cv skills title
app.post('/cv/skillstitle/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const defSkillsTitle = await db.query("INSERT INTO cv_skills_title(id, title) VALUES ($1, $2)", [id, "SKILLS"]);
        res.json(defSkillsTitle);
    }catch(err){
        console.error(err);
    }
})

// Get cv skills title
app.get('/cv/skillstitle/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const response = await db.query("SELECT * FROM cv_skills_title WHERE id = $1", [id]);
        res.json(response.rows);
    }catch(err){
        console.error(err);
    }
});

// Edit cv skills title
app.put('/cv/skillstitle/:id', async(req, res) =>{
    const{id} = req.params;
    const{title} = req.body;
    try{
        const response = await db.query("UPDATE cv_skills_title SET title = $1 WHERE id = $2", [title, id]);
        res.json(response);
    }catch(err){
        console.error(err);
    }
});

// Add default cv skills
app.post('/cv/skills/:id', async(req, res) => {
    const{id} = req.params;
    try{    
        const defSkills = await db.query("INSERT INTO cv_skills(id, skills) VALUES ($1, $2)", [id, "Write your skills here..."]);
        res.json(defSkills);
    }catch(err){
        console.error(err);
    }
})

// Get cv skills
app.get('/cv/skills/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const response = await db.query("SELECT * FROM cv_skills WHERE id = $1", [id]);
        res.json(response.rows);
    }catch(err){
        console.error(err);
    }
});

// Edit cv skills
app.put('/cv/skills/:id', async(req, res) =>{
    const{id} = req.params;
    const{skills} = req.body;
    try{
        const response = await db.query("UPDATE cv_skills SET skills = $1 WHERE id = $2", [skills, id]);
        res.json(response);
    }catch(err){
        console.error(err);
    }
});


// Add default cv hobbies title
app.post('/cv/hobbiestitle/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const defHobbiesTitle = await db.query("INSERT INTO cv_hobbies_title(id, title) VALUES ($1, $2)", [id, "HOBBIES"]);
        res.json(defHobbiesTitle);
    }catch(err){
        console.error(err);
    }
})

// Get cv hobbies title
app.get('/cv/hobbiestitle/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const response = await db.query("SELECT * FROM cv_hobbies_title WHERE id = $1", [id]);
        res.json(response.rows);
    }catch(err){
        console.error(err);
    }
});

// Edit cv hobbies title
app.put('/cv/hobbiestitle/:id', async(req, res) =>{
    const{id} = req.params;
    const{title} = req.body;
    try{
        const response = await db.query("UPDATE cv_hobbies_title SET title = $1 WHERE id = $2", [title, id]);
        res.json(response);
    }catch(err){
        console.error(err);
    }
});

// Get all hobbie items
app.get('/cv/hobbies/:cvId', async(req, res) => {
    const{cvId} = req.params;
    try{
        const response = await db.query("SELECT * FROM cv_hobbies WHERE cv_id = $1 ORDER BY id ASC", [cvId]);
        res.json(response.rows);
    }catch(err){
        console.error(err);
    }
});

// Add new hobbie item
app.post('/cv/hobbies/:cvId', async(req, res) => {
    const{cvId} = req.params;
    try{
        const response = await db.query("INSERT INTO cv_hobbies(hobbie, cv_id) VALUES ($1, $2)",
        ["Sample hobbie", cvId]);
        res.json(response);
    }catch(err){
        console.error(err);
    }
});

// Edit hobbie item
app.put('/cv/hobbies/:id', async(req, res) => {
    const{id} = req.params;
    const{hobbie} = req.body;
    try{
        const editHobbieItem = await db.query('UPDATE cv_hobbies SET hobbie = $1 WHERE id = $2', 
        [hobbie, id]);
        res.json(editHobbieItem);
    }catch(err){
        console.error(err);
    }
});

// Delete hobbie item
app.delete('/cv/hobbies/:id', async(req, res) => {
    const{id} = req.params;
    try{
        const deleteHobbieItem = await db.query('DELETE FROM cv_hobbies WHERE id = $1', [id]);
        res.json(deleteHobbieItem);
    }catch(err){
        console.error(err);
    }
});

let lastInsertedCvId = null;
// add new cv
app.post('/cvs', async(req, res) => {
    const { cv_title, user_email } = req.body;
    try {
        const newCV = await db.query("INSERT INTO cvs(cv_title, user_email) VALUES($1, $2) RETURNING id", [cv_title, user_email]);
        lastInsertedCvId = newCV.rows[0].id;
        res.json(newCV);
    }catch(err){
        console.error(err);
    }
});

// edit cv item title
app.put('/cvs/:cvId', async(req, res) => {
    const { cvId } = req.params;
    const {cvTitle} = req.body;
    try{
        const editCVTitle = await db.query('UPDATE cvs SET cv_title = $1 WHERE id = $2', [cvTitle, cvId]);
        res.json(editCVTitle);
    }catch(err){
        console.error(err);
    }
});

// get id of last inserted cv
app.get('/getCvId', async(req, res) => {
    res.json({id: lastInsertedCvId });
});

// delete cv
app.delete("/cvs/:id", async(req, res) => {
    const { id } = req.params;
    try{
        const deleteCV = await db.query('DELETE FROM cvs WHERE id = $1', [id]);
        res.json(deleteCV);
    }catch(err){
        console.error(err);
    }
});

// post user profile data
app.post('/profile/:userEmail', async(req, res) => {
    const { userEmail } = req.params;
    const { picUrl, fName, lName } = req.body;

    try{
        await db.query(`INSERT INTO profiles (email, first_name, last_name, profilepicurl) VALUES ($1, $2, $3, $4)`, [
            userEmail, fName, lName, picUrl
        ]);
    }catch(err){
        res.json(err.detail);
    }
});

// get all advertisements
app.get('/advertisements/:userEmail', async(req, res) => {
    const{userEmail} = req.params;
    try{
        const advertisements = await db.query("SELECT * FROM advertisements WHERE user_email = $1 ORDER BY id ASC", [userEmail]);
        res.json(advertisements.rows);
    }catch(err){
        console.error(err);
    }
});

// add new advertisement
app.post('/advertisements', async(req, res) => {
    const { link, user_email } = req.body;
    try {
        const newAdvertisements = await db.query("INSERT INTO advertisements(link, user_email) VALUES($1, $2)", [link, user_email]);
        res.json(newAdvertisements);
    }catch(err){
        console.error(err);
    }
});

// update advertisement
app.put('/advertisements/:id', async(req, res) => {
    const { id } = req.params;
    const {link} = req.body;
    try{
        const editAdvertisement = await db.query('UPDATE advertisements SET link = $1 WHERE id = $2', [link, id]);
        res.json(editAdvertisement);
    }catch(err){
        console.error(err);
    }
});

// delete advertisement
app.delete('/advertisements/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const deleteAdvertisement = await db.query("DELETE FROM advertisements WHERE id = $1", [id]);
        res.json(deleteAdvertisement);
    }catch(err){
        console.error(err);
    }
})

// get all tasks
app.get('/tasks/:userEmail', async(req, res) => {
    const{userEmail} = req.params;
    try{
        const tasks = await db.query("SELECT * FROM tasks WHERE user_email = $1 ORDER BY id ASC", [userEmail]);
        res.json(tasks.rows);
    }catch(err){
        console.error(err);
    }
});

// add new task
app.post('/tasks', async(req, res) => {
    const { task, user_email } = req.body;
    try {
        const newTask = await db.query("INSERT INTO tasks(task, user_email) VALUES($1, $2)", [task, user_email]);
        res.json(newTask);
    }catch(err){
        console.error(err);
    }
});

// update task
app.put('/tasks/:id', async(req, res) => {
    const { id } = req.params;
    const {task} = req.body;
    try{
        const editTask = await db.query('UPDATE tasks SET task = $1 WHERE id = $2', [task, id]);
        res.json(editTask);
    }catch(err){
        console.error(err);
    }
});

// delete task
app.delete('/tasks/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const deleteTask = await db.query("DELETE FROM tasks WHERE id = $1", [id]);
        res.json(deleteTask);
    }catch(err){
        console.error(err);
    }
})

// Sign up
app.post('/signup', async(req, res) => {

    const { email, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try{
        await db.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`, [email, hashedPassword]);
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
        res.json({ email, token });
    }catch(err){
        console.error(err);
        if(err){
            res.json({ detail: err.detail });
        }
    }
});

// Log in
app.post('/login', async(req, res) => {
    const { email, password} = req.body;
    try{
        const users = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        
        if(!users.rows.length) return res.json({ detail: 'User does not exist! '});

        const success = await bcrypt.compare(password, users.rows[0].hashed_password);
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
        if(success){
            res.json({ 'email' : users.rows[0].email, token });
        }else{
            res.json({ detail : 'Login failed'});
        }
    }catch(err){
        console.error(err);
    }
});


app.post("/uploadImage", async(req, res) => {
   try {
    // Upload the image
        const response = await uploadImage(req.body.result);
        res.json({ 'url' : response.url });
    } catch (error) {
        console.error(error);
    }
});

cloudinary.config({
    secure: true,
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET,
});

const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      return result;
    } catch (error) {
      console.error(error);
    }
};


app.listen(PORT, ()=> {
    console.log(`Server running on port:${PORT}`);
});

