import { Request, Response } from 'express';
import Fine from '../models/fineModel';

// @desc    Create a new fine
// @route   POST /api/fines
export const createFine = async (req: Request, res: Response) => {
  const { userId, reason, amount, status } = req.body;

  try {
    if (!userId || !reason || !amount) {
      return res.status(400).json({ message: 'User ID, reason, and amount are required' });
    }
    const fine = await Fine.create({ userId, reason, amount, status });
    res.status(201).json(fine);
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating fine', error: error.message });
  }
};

// @desc    Get all fines
// @route   GET /api/fines
export const getAllFines = async (req: Request, res: Response) => {
  try {
    // Populate 'userId' to get student's name and adNo along with the fine
    const fines = await Fine.find({}).populate('userId', 'name adNo class');
    res.status(200).json(fines);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a fine (e.g., to mark as paid)
// @route   PUT /api/fines/:id
export const updateFine = async (req: Request, res: Response) => {
  try {
    const fine = await Fine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!fine) {
      return res.status(404).json({ message: 'Fine not found' });
    }
    res.status(200).json(fine);
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating fine', error: error.message });
  }
};

// @desc    Get a single fine by ID
// @route   GET /api/fines/:id
export const getFineById = async (req: Request, res: Response) => {
  try {
    const fine = await Fine.findById(req.params.id).populate('userId', 'name adNo');
    if (!fine) {
      return res.status(404).json({ message: 'Fine not found' });
    }
    res.status(200).json(fine);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a fine
// @route   DELETE /api/fines/:id
export const deleteFine = async (req: Request, res: Response) => {
  try {
    const fine = await Fine.findByIdAndDelete(req.params.id);
    if (!fine) {
      return res.status(404).json({ message: 'Fine not found' });
    }
    res.status(200).json({ message: 'Fine removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};