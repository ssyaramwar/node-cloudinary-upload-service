# 🚀 Node Cloudinary Upload Service

A complete **Node.js** backend service built with **Express.js** for handling file uploads (images, videos, and compressed images) using **Cloudinary** for cloud storage and **MongoDB (Mongoose)** for metadata management.

---

## ✨ Features

* ✔ **Image Upload** to Cloudinary.
* ✔ **Video Upload** to Cloudinary.
* ✔ **Image Compression (Reducer)** using a specific quality setting (`quality: auto:low`, max size: 2MB).
* ✔ **Local File Upload** (using `express-fileupload`).
* ✔ **Cloudinary Storage** integration.
* ✔ **File Metadata Save** in MongoDB.

---

## 📂 Project Structure

| Directory/File | Description |
| :--- | :--- |
| `controllers/FileUpload.js` | Business logic for handling different file upload types. |
| `routes/FileUpload.js` | Defines the API routes for file upload operations. |
| `models/File.js` | Mongoose schema definition for storing file metadata. |
| `config/cloudinary.js` | Cloudinary configuration setup. |
| `config/database.js` | MongoDB connection setup. |
| `.env` | Environment variables for configuration. |
| `index.js` | Main application entry point (server initialization). |
| `package.json` | Project dependencies and scripts. |

---

## 🔧 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ssyaramwar/node-cloudinary-upload-service.git](https://github.com/ssyaramwar/node-cloudinary-upload-service.git)
    cd node-cloudinary-upload-service
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create `.env` file:**
    Create a file named `.env` in the root directory and populate it with your configuration keys:
    ```
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    MONGODB_URL=your_mongodb_connection_string
    PORT=4000
    ```
4.  **Start the server:**
    ```bash
    npm run dev
    ```

---

## 🔌 API Endpoints

The base URL for all endpoints is `/api/v1/upload/`. All endpoints expect **`multipart/form-data`** for file uploads.

| Method | Endpoint | Description | Expected Form-data Fields |
| :--- | :--- | :--- | :--- |
| **POST** | `/imageUpload` | Uploads an **Image** to Cloudinary. | `name`, `tags`, `email` (text), `image` (file) |
| **POST** | `/videoUpload` | Uploads a **Video** to Cloudinary. | `name`, `tags`, `email` (text), `videoFile` (file) |
| **POST** | `/imageSizeReducer` | Uploads and compresses an **Image** (Max 2MB, `quality: auto:low`). | `name`, `tags`, `email` (text), `imageSizeReducer` (file) |
| **POST** | `/localFileUpload` | Uploads a file **locally** to the server. | `file` (file) |

---

## 🗄 MongoDB Schema (`models/File.js`)

The structure for file metadata saved in the database:

```json
{
  "fileName": "String",
  "fileUrl": "String",
  "tags": "String",
  "email": "String"
}


## 👤 About the Developer

* **Developer:** Sushant Yeramwar
* **GitHub:** [https://github.com/ssyaramwar](https://github.com/ssyaramwar)
