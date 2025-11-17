const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// -------------------- Helper: Check file type --------------------
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

// -------------------- Helper: Upload to Cloudinary --------------------
async function uploadToCloudinary(file, folder) {
    const options = { folder };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// -------------------- Local File Upload --------------------
exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("File received:", file);

        const path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        file.mv(path);

        return res.json({
            success: true,
            message: "Local file uploaded successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Local file upload failed",
            error
        });
    }
};

// -------------------- Cloudinary Upload --------------------
exports.imageUpload = async (req, res) => {
    try {
        console.log("FILES RECEIVED:", req.files);  
        const { name, tags, email } = req.body;

        const file = req.files.image;
        console.log("File received:", file);

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".").pop().toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            });
        }

        // Upload to Cloudinary
        const response = await uploadToCloudinary(file, "FileUpload");
        console.log("Uploaded:", response.secure_url);

        // Save DB
        const savedFile = await File.create({
            fileName: name,
            fileUrl: response.secure_url,
            tags,
            email
        });

        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            data: savedFile
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Cloudinary upload failed",
            error
        });
    }
};


exports.VideoUpload = async (req, res) => {
    try {
        const { name, email, tags } = req.body;

        console.log("Request Body:", req.body);

        // using key videoFile
        const file = req.files.videoFile;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No video file uploaded"
            });
        }

        const supportedTypes = ["mp4", "mov", "avi", "mkv"];
        const fileType = file.name.split(".").pop().toLowerCase();

        if (!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: "Video type not supported"
            });
        }

        // Upload video to Cloudinary
        const response = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "video",   // <-- THIS FIXES YOUR ERROR
            folder: "VideoUpload"
        });

        console.log("Uploaded Video:", response.secure_url);

        const savedFile = await File.create({
            fileName: name,
            fileUrl: response.secure_url,
            tags,
            email
        });

        return res.status(200).json({
            success: true,
            message: "Video uploaded successfully",
            data: savedFile
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Cloudinary video upload failed",
            error
        });
    }
};

//image size reducer
exports.imageSizeReducer = async (req, res) => {
    try {
        const { name, email, tags } = req.body;

        console.log("Request Body:", req.body);

        // using key imageSizeReducer
        const file = req.files.imageSizeReducer;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded"
            });
        }

        // ------------ IMAGE SIZE LIMIT (2MB) ------------
        const MAX_SIZE = 2 * 1024 * 1024;  // 2 MB
        if (file.size > MAX_SIZE) {
            return res.status(400).json({
                success: false,
                message: "Image too large! Max allowed = 2MB"
            });
        }
        // -------------------------------------------------

        // ------------ IMAGE TYPE VALIDATION ------------
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".").pop().toLowerCase();

        if (!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: "Image type not supported"
            });
        }
        //-------------------------------------------------

        // ------------- CLOUDINARY IMAGE COMPRESSION--------------
        const response = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "image",
            folder: "ReducedImages",
            quality: "auto:low",  // <-- Cloudinary reduces file size
            fetch_format: "auto", // <-- Convert to optimized format
        });
        //----------------------------------------------------------

        console.log("Uploaded Reduced Image:", response.secure_url);

        // Save to DB
        const savedFile = await File.create({
            fileName: name,
            fileUrl: response.secure_url,
            tags,
            email
        });

        return res.status(200).json({
            success: true,
            message: "Image reduced and uploaded successfully",
            data: savedFile
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Image reducer failed",
            error
        });
    }
};
