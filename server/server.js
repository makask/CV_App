import express from "express";
import { db } from "./db.js";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

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

app.listen(PORT, ()=> {
    console.log(`Server running on port:${PORT}`);
});