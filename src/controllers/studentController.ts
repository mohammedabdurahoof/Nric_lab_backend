// src/controllers/userController.ts
import { Request, Response } from 'express';
import Student from '../models/studentModel';
import { IStudent } from '../types';

// @desc    Get all students
export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single user
export const getStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    // The request body is typed using our IStudent interface
    const { name, email, type, adNo, class: studentClass } = req.body as IStudent;
    if (!name || !type) {
      return res.status(400).json({ message: 'Name and type are required' });
    }

    const student = await Student.create({ name, email, type, adNo, class: studentClass });
    res.status(201).json(student);
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating student', error: error.message });
  }
};

// @desc    Update a student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating student', error: error.message });
  }
};

// @desc    Delete a student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};