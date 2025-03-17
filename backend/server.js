import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

connectDB();
app.use(cookieParser());
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
