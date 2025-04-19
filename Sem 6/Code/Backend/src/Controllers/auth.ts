import { Request, Response } from "express";
import { Farmer } from "../Models/farmer.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupFarmer = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Basic validation
  console.log("fields", req.body);
  if (!name || !email || !password) {
    res.status(400).json({ message: "Please provide all required fields." });
    return;
  }

  try {
    // Check if farmer already exists (optional based on requirements)
    const existingFarmer = await Farmer.findOne({ name, email });
    if (existingFarmer) {
      res
        .status(400)
        .json({ message: "Farmer already registered in this region." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new farmer
    const newFarmer = await Farmer.create({
      name,
      email,
      password: hashedPassword,
    });
    // const newFarmer = new Farmer({
    //     name,
    //     email,
    //     password:hashedPassword
    // });

    // await newFarmer.save();

    console.log("new far", newFarmer);
    res
      .status(201)
      .json({ message: "Farmer registered successfully", farmer: newFarmer });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
    return;
  }
};

export const signinFarmer = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please provide email and password." });
    return;
  }

  try {
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      res.status(404).json({ message: "Farmer not found." });
      return;
    }

    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      res.status(401).json({ message: "Incorrect password." });
      return;
    }

    const token = jwt.sign(
      { id: farmer._id, email: farmer.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Sign-in successful",
      token,
      farmer: { id: farmer._id, name: farmer.name, email: farmer.email },
    });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
    return;
  }
};
