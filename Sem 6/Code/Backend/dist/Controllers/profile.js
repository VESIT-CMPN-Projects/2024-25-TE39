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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFarmerProfile = exports.getFarmerProfile = void 0;
const farmer_model_1 = require("../Models/farmer.model");
const getFarmerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { farmerId } = req.body;
    try {
        console.log("farmerId", farmerId);
        const farmer = yield farmer_model_1.Farmer.findById(farmerId);
        console.log("farmer details", farmer);
        if (!farmer) {
            res.status(404).json({ message: 'Farmer not found.' });
            return;
        }
        res.status(200).json({
            message: 'Farmer profile fetched successfully',
            farmer
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        return;
    }
});
exports.getFarmerProfile = getFarmerProfile;
const updateFarmerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { farmerId } = _a, updateData = __rest(_a, ["farmerId"]); // ✅ Correct way to extract data
    console.log("farmerId in update", farmerId);
    console.log("updated data", updateData);
    try {
        const updatedFarmer = yield farmer_model_1.Farmer.findByIdAndUpdate(farmerId, updateData, { new: true });
        if (!updatedFarmer) {
            res.status(404).json({ message: 'Farmer not found.' });
            return;
        }
        console.log("updated details", updatedFarmer);
        res.status(200).json({
            message: 'Farmer profile updated successfully',
            updatedFarmer
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        return;
    }
});
exports.updateFarmerProfile = updateFarmerProfile;
