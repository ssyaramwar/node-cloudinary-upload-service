//app create
const express = require("express");
const app = express();

//PORT find krnaa hai
require("dotenv").config();
const PORT = process.env.PORT || 3000;
console.log("Cloud Name =", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key =", process.env.CLOUDINARY_API_KEY);
console.log("API Secret =", process.env.CLOUDINARY_API_SECRET);


// ----------------------------------------------------
// 1️⃣ FILEUPLOAD MUST COME FIRST (IMPORTANT)
// ----------------------------------------------------
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "./tmp"        // <-- FIXED WINDOWS PATH
}));

// ----------------------------------------------------
// 2️⃣ EXPRESS.JSON SHOULD COME AFTER FILEUPLOAD
// ----------------------------------------------------
app.use(express.json());


//db se connect
const db = require('./config/database');
db.connect();


//cloud se connect krnaa 
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();


//api route mount krnaa hai 
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);


//activate the server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
