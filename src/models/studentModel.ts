// src/models/studentModel.ts
import mongoose, { Schema, Document } from "mongoose";
import { IStudent } from "../types"; // Import the interface

// We extend Mongoose's Document to get properties like _id, etc.
export interface IStudentModel extends IStudent, Document {}

const studentSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["Staff", "Student", "Union"],
    },
    adNo: {
      type: String,
      required: [true, "Please add an admission number"],
      unique: true,
    },
    class: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStudentModel>("Student", studentSchema);
