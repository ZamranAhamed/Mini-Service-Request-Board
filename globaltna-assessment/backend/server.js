import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mini-service-request-board-frontend-chi.vercel.app",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "API running" });
});

app.use("/api/jobs", jobRoutes);

app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
