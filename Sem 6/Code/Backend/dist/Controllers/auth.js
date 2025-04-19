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
exports.signinFarmer = exports.signupFarmer = void 0;
const farmer_model_1 = require("../Models/farmer.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupFarmer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // Basic validation
    console.log("fields", req.body);
    if (!name || !email || !password) {
        res.status(400).json({ message: "Please provide all required fields." });
        return;
    }
    try {
        // Check if farmer already exists (optional based on requirements)
        const existingFarmer = yield farmer_model_1.Farmer.findOne({ name, email });
        if (existingFarmer) {
            res
                .status(400)
                .json({ message: "Farmer already registered in this region." });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create new farmer
        const newFarmer = yield farmer_model_1.Farmer.create({
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
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Server error", error: error.message });
        return;
    }
});
exports.signupFarmer = signupFarmer;
const signinFarmer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Please provide email and password." });
        return;
    }
    try {
        const farmer = yield farmer_model_1.Farmer.findOne({ email });
        if (!farmer) {
            res.status(404).json({ message: "Farmer not found." });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, farmer.password);
        if (!isMatch) {
            res.status(401).json({ message: "Incorrect password." });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: farmer._id, email: farmer.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({
            message: "Sign-in successful",
            token,
            farmer: { id: farmer._id, name: farmer.name, email: farmer.email },
        });
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Server error", error: error.message });
        return;
    }
});
exports.signinFarmer = signinFarmer;
