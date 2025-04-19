import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { signUp } from "aws-amplify/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // useNavigate hook correctly used here

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Step 1: Sign up with AWS Cognito
      const response = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            name: formData.name,
          },
        },
      });

      toast({
        title: "Account created",
        description: "A verification email has been sent.",
      });

      // Store email for later use in verification
      localStorage.setItem("email", formData.email);

      // Step 2: Immediately navigate to the verify-email page
      navigate("/verify-email"); // Direct navigation without waiting for the backend

      // Step 3: Send user data to the backend (MongoDB) asynchronously
      const backendResponse = await axios.post(
        "http://localhost:8080/signup",
        formData
      );

      if (backendResponse.status !== 200) {
        toast({
          title: "Error",
          description: "Failed to send data to backend.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Error during sign up.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
};

export default SignupForm;
