// src/routes/userRoutes.ts
import express from "express";
import {
  getStudents,
  getStudent,
  createUser,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getStudents).post(protect, createUser);

router.route("/:id").get(protect, getStudent).put(protect, updateStudent).delete(protect, deleteStudent);

export default router;
