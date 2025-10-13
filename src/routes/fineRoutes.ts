import express from "express";
import {
  createFine,
  deleteFine,
  getAllFines,
  getFineById,
  updateFine,
} from "../controllers/fineController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// All routes here are protected
router.use(protect);

router.route("/").post(createFine).get(getAllFines);

router.route("/:id").put(updateFine);

router.route("/:id").get(getFineById).put(updateFine).delete(deleteFine);

export default router;
