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

app.listen(PORT, ()=> {
    console.log(`Server running on port:${PORT}`);
});