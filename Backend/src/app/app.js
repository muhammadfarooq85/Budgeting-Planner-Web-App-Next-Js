// Libraries Imports
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
// Local Imports
import connectDB from "../../db/db.js";

const app = express();

// Global Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Db Connection
connectDB();

export default app;
