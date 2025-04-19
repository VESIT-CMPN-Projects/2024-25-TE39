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
exports.getAllSensorData = void 0;
const liveData_1 = require("../Models/liveData");
const getAllSensorData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield liveData_1.sensorData.find()
            .sort({ timestamp: -1 }) // Sort by latest
            .limit(1000) // Limit to prevent overload
            .exec(); // Ensures query execution
        if (!data.length) {
            res.status(404).json({ message: 'No sensor data found' });
            return;
        }
        console.log("data of iot in backend", data);
        res.status(200).json(data);
        return;
    }
    catch (error) {
        res.status(500).json({ error: '❌ Error fetching data', details: error.message });
        return;
    }
});
exports.getAllSensorData = getAllSensorData;
