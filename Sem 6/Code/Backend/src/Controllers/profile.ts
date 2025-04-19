import { Request, Response } from 'express';
import { Farmer } from '../Models/farmer.model';


export const getFarmerProfile = async (req: Request, res: Response) => {
    const { farmerId } = req.body;

    try {
        console.log("farmerId",farmerId)
        const farmer = await Farmer.findById(farmerId);

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
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
        return;
    }
};



export const updateFarmerProfile = async (req: Request, res: Response) => {
    const { farmerId, ...updateData } = req.body;  // ✅ Correct way to extract data
    console.log("farmerId in update", farmerId);
    console.log("updated data", updateData);

    try {
        const updatedFarmer = await Farmer.findByIdAndUpdate(farmerId, updateData, { new: true });

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
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
        return;
    }
};
