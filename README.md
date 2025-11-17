🚀 Node Cloudinary Upload Service

A complete Node.js backend for uploading images, videos, and compressed images using:

Express.js

Cloudinary

MongoDB (Mongoose)

express-fileupload

This project supports:

✔ Image Upload
✔ Video Upload
✔ Image Compression (Reducer)
✔ Local File Upload
✔ Cloudinary Storage
✔ File Metadata Save in MongoDB


📁 Project Structure
FileUpload/
│
├── controllers/
│   └── FileUpload.js
│
├── routes/
│   └── FileUpload.js
│
├── models/
│   └── File.js
│
├── config/
│   ├── cloudinary.js
│   └── database.js
│
├── .env
├── index.js



🔧 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/ssyaramwar/node-cloudinary-upload-service.git
cd node-cloudinary-upload-service


2️⃣ Install dependencies
npm install

3️⃣ Create .env file
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

MONGODB_URL=your_mongodb_connection_string
PORT=4000

4️⃣ Start the server
npm run dev

🔌 API Endpoints
📤 1. Upload Image

POST
/api/v1/upload/imageUpload

Form-data:

Key	Type	Value
name	text	
tags	text	
email	text	
image	file	
🎥 2. Upload Video

POST
/api/v1/upload/VideoUpload

Form-data:

Key	Type	Value
name	text	
tags	text	
email	text	
videoFile	file	
🖼 3. Upload Reduced (Compressed) Image

POST
/api/v1/upload/imageSizeReducer

Form-data:

Key	Type	Value
name	text	
tags	text	
email	text	
imageSizeReducer	file	

📌 Max size limit: 2MB
📌 Uses Cloudinary compression: quality: auto:low

📁 4. Local File Upload

POST
/api/v1/upload/localFileUpload

Form-data:

Key	Type	Value
file	file	
🗄 Database Schema (MongoDB)
{
  fileName: String,
  fileUrl: String,
  tags: String,
  email: String
}


About me:
🔗 GitHub: ssyaramwar
🔗 Portfolio (optional): add if you have

├── package.json
└── README.md
