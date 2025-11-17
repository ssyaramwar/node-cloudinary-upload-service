const express = require("express");
const router = express.Router();

const { imageUpload, localFileUpload,VideoUpload,imageSizeReducer } = require("../controllers/FileUpload");

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/VideoUpload", VideoUpload);
router.post('/imageSizeReducer', imageSizeReducer);

module.exports = router;
