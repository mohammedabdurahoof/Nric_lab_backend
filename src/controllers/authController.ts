import { Request, Response } from "express";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

// @desc    Register a new user
// @route   POST /api/users/register
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body; // Changed from email

  try {
    const userExists = await User.findOne({ username }); // Changed from email
    if (userExists) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const user = await User.create({ username, password }); // Changed from email

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username, // Changed from email
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body; // Changed from email

  try {
    const user = await User.findOne({ username }); // Changed from email

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username, // Changed from email
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" }); // Updated error message
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  // The 'protect' middleware has already found the user and attached it to the request.
  const user = req.user;

  if (user) {
    res.json({
      username: user.username,
      createdAt: user.createdAt,
    });
  } else {
    // This case should ideally not be reached if 'protect' middleware is used correctly
    res.status(404).json({ message: "User not found" });
  }
};
