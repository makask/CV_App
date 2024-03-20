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
        const cvs = await db.query("SELECT * FROM cvs WHERE user_email = $1", [userEmail]);
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

