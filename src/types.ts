// src/types.ts

// Using IStudent instead of User to represent the document in the database
export interface IStudent {
  name: string;
  email?: string;
  phone?: string;
  type: "Staff" | "Student" | "Union";
  adNo?: string;
  class?: string | null;
  createdAt?: string; // Mongoose handles this with timestamps
  updatedAt?: string; // Mongoose handles this with timestamps
}

export interface IUser {
  username: string; // Changed from email
  password?: string;
  createdAt?: string; // Mongoose handles this with timestamps
  updatedAt?: string; // Mongoose handles this with timestamps
}

export interface IUserModel extends IUser, Document {
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// You would add your other interfaces here as well
export interface ITransaction {
  id?: string;
  userId: string; // Will be mongoose.Schema.Types.ObjectId
  name: string;
  userName?: string;
  type: "print" | "credit" | "debit";
  amount: number;
  // ... and so on for all your interfaces
}
