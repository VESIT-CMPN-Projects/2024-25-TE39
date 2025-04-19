"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (userEmail, workspaceName, addedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD, // ⚠️ Use environment variables instead!
            },
        });
        // Verify transporter configuration
        transporter.verify((error, success) => {
            if (error) {
                console.error("Error configuring transporter:", error);
            }
            else {
                console.log("Transporter is ready to send emails");
            }
        });
        const mailOptions = {
            from: process.env.EMAIL, // Use a valid email
            to: userEmail,
            subject: `You've been added to a new workspace: ${workspaceName}`,
            html: `
                <h2>Welcome to ${workspaceName}!</h2>
                <p>You have been added to the workspace <b>${workspaceName}</b> by <b>${addedBy}</b>.</p>
                <p>Click below to access your workspace:</p>
                <a href="#" style="background:#4CAF50; color:white; padding:10px 15px; text-decoration:none; border-radius:5px;">Go to Workspace</a>
                <p>Happy collaborating! 🚀</p>
            `,
        };
        yield transporter.sendMail(mailOptions);
        console.log(`📧 Email sent to ${userEmail}`);
    }
    catch (error) {
        console.error("❌ Error sending email:", error);
    }
});
// ✅ Export using ES Module syntax (Recommended for TS)
exports.default = sendEmail;
