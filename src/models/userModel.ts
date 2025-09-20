import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUserModel } from "../types";

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Ensure username is stored in lowercase
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to hash password before saving (no changes needed here)
userSchema.pre("save", async function (next) {
  // 'this' now correctly refers to an IUserModel document
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    // Since password is required in the schema, we can be sure it exists here.
    this.password = await bcrypt.hash(this.password as string, salt);
    next();
  } catch (error) {
    // It's good practice to handle potential errors during hashing
    if (error instanceof Error) {
      return next(error);
    }
    return next(new Error("Password hashing failed"));
  }
});

// Method to compare entered password with hashed password (no changes needed here)
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUserModel>("User", userSchema);
