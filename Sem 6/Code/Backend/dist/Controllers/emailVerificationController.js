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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = void 0;
const auth_1 = require("aws-amplify/auth"); // Ensure correct import from 'aws-amplify'
const farmer_model_1 = require("../Models/farmer.model");
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { confirmationCode, email } = req.body;
    try {
        // Step 1: Verify email in Cognito
        yield (0, auth_1.confirmSignUp)({ username: email, confirmationCode });
        // Step 2: After successful Cognito verification, update `isVerified` in MongoDB
        const updatedFarmer = yield farmer_model_1.Farmer.findOneAndUpdate({ email }, { isVerified: true }, { new: true } // Return updated farmer document
        );
        if (!updatedFarmer) {
            return res.status(404).json({ message: "Farmer not found" });
        }
        // Return success response
        return res.status(200).json({
            message: "Email successfully verified",
            farmer: updatedFarmer,
        });
    }
    catch (error) {
        console.error("Error verifying email:", error);
        return res.status(400).json({ message: "Error verifying email" });
    }
});
exports.verifyEmail = verifyEmail;
