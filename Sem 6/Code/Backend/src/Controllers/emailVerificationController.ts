import { Request, Response } from "express";
import { confirmSignUp } from "aws-amplify/auth"; // Ensure correct import from 'aws-amplify'
import { Farmer } from "../Models/farmer.model";

interface VerificationRequestBody {
  email: string;
  confirmationCode: string;
}

export const verifyEmail = async (
  req: Request<{}, {}, VerificationRequestBody>,
  res: Response
): Promise<Response> => {
  const { confirmationCode, email } = req.body;

  try {
    // Step 1: Verify email in Cognito
    await confirmSignUp({ username: email, confirmationCode });

    // Step 2: After successful Cognito verification, update `isVerified` in MongoDB
    const updatedFarmer = await Farmer.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true } // Return updated farmer document
    );

    if (!updatedFarmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // Return success response
    return res.status(200).json({
      message: "Email successfully verified",
      farmer: updatedFarmer,
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(400).json({ message: "Error verifying email" });
  }
};
