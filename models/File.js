const mongoose = require("mongoose");
const nodemailer = require("nodemailer");


const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,

    },
    tags: {
        type: String,

    },
    email: {
        type: String,
    }
},);

//post middleware
fileSchema.post("save", async function (doc) {

    try {
        console.log("Preparing to send email to ", doc);
        //create the transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        //send the email
        let info = await transporter.sendMail({
            from: `"File Upload Service" <${process.env.MAIL_USER}>`,
            to: doc.email,
            subject: "File Uploaded Successfully",
            text: `Your file ${doc.fileName} has been uploaded successfully. You can access it here: ${doc.fileUrl}`,
        });
        console.log("Email sent: ", info.messageId);



    } catch (error) {
        console.error(error);
    }
});

const File = mongoose.model("File", fileSchema);

module.exports = File;    