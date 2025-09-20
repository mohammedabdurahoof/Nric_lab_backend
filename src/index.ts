import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";

// Import routes
import studentsRoutes from "./routes/studentsRoutes";
import authRoutes from "./routes/authRoutes";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize app
const app: Application = express();
const PORT: string | number = process.env.PORT || 5001;

// Middleware
const corsOptions = {
  origin: "http://localhost:8080", // Your client's origin
  credentials: true, // Allow cookies and authorization headers
};

app.use(cors(corsOptions));
app.use(express.json());

// Home Route
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Nric Lab API (TypeScript)</h1><p>Status: Running</p>");
});

// Mount Routers
app.use("/api/students", studentsRoutes);
app.use("/api/users", authRoutes);
// ... other routes

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

