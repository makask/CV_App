import express from "express";
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

/* Cloudinary */ 

cloudinary.config({
    secure: true,
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET,
});

/*
 Uploads an image file
*/


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
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};

//const publicId = await uploadImage(imagePath);
//console.log(await "PublicID: "+ publicId);

/* Gets details of an uploaded image */
const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
      colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log(result);
        return result.url;
        } catch (error) {
        console.error(error);
    }
};

//////////////////////////////////////////////////////////////
// Creates an HTML image tag with a transformation that
// results in a circular thumbnail crop of the image  
// focused on the faces, applying an outline of the  
// first color, and setting a background of the second color.
//////////////////////////////////////////////////////////////
const createImageTag = (publicId, ...colors) => {
    
    // Set the effect color and background color
    const [effectColor, backgroundColor] = colors;

    // Create an image tag with transformations applied to the src URL
    let imageTag = cloudinary.image(publicId, {
      transformation: [
        { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
        { radius: 'max' },
        { effect: 'outline:10', color: effectColor },
        { background: backgroundColor },
      ],
    });

    return imageTag;
};

//////////////////
//
// Main function
//
//////////////////
/*(async () => {

    // Set the image to upload
    const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';

    // Upload the image
    const publicId = await uploadImage(imagePath);

    // Get the colors in the image
    const colors = await getAssetInfo(publicId);

    // Create an image tag, using two of the colors in a transformation
    const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

    // Log the image tag to the console
    console.log(imageTag);

})();*/


app.listen(PORT, ()=> {
    console.log(`Server running on port:${PORT}`);
});

