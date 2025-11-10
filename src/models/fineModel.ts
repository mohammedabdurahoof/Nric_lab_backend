import mongoose, { Schema } from "mongoose";
import { IFineModel } from "../types";

const fineSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Student", // Creates a reference to the Student model
    },
    reason: {
      type: String,
      required: [true, "Please provide a reason for the fine"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide the fine amount"],
    },
    status: {
      type: String,
      required: true,
      enum: ["paid", "unpaid", "partial"],
      default: "unpaid",
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    remainingAmount: {
      type: Number,
    },
    paidDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to calculate remainingAmount before saving
fineSchema.pre<IFineModel>("save", function (next) {
  this.remainingAmount = this.amount - (this.paidAmount || 0);
  next();
});

export default mongoose.model<IFineModel>("Fine", fineSchema);
