import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import addBooks from "./routes/addBooks.js";
import bookSearch from "./routes/bookSearch.js";

dotenv.config();
const app = express();

connectDB();
app.use(cookieParser());
app.use(express.json());

// Configure CORS correctly (only one cors middleware needed)
app.use(cors({ 
  origin: 'http://localhost:3000', 
  credentials: true 
}));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/books", addBooks);
app.use("/api/book/search", bookSearch);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));