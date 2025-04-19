import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { confirmSignUp } from "aws-amplify/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmail: React.FC = () => {
  const { toast } = useToast();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // useNavigate hook to handle navigation

  const handleVerifyEmail = async () => {
    try {
      const email = localStorage.getItem("email");

      if (!email || !confirmationCode) {
        toast({
          title: "Error",
          description: "Please enter the confirmation code.",
          variant: "destructive",
        });
        return;
      }

      // Step 1: Verify email with AWS Cognito
      const cognitoResponse = await confirmSignUp({
        username: email,
        confirmationCode,
      });

      // Step 2: After successful verification, update `isVerified` status in MongoDB
      const verifyResponse = await axios.post(
        "http://localhost:8080/verify-email",
        {
          email,
          confirmationCode,
        }
      );
      navigate("/login");
      if (verifyResponse.status === 200) {
        toast({
          title: "Verification successful",
          description: "Your email has been verified. You can now log in.",
        });
        // Redirect to login page after successful verification
      } else {
        toast({
          title: "Error",
          description: "Failed to verify the email.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to verify the email.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-primary/20 to-agri-green/20">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">
          Verify Your Email
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Please check your email for the verification code and enter it below.
        </p>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter verification code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            required
          />
          <Button type="button" onClick={handleVerifyEmail}>
            Verify Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
