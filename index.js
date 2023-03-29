import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/UserRouter.js";
import spaceRouter from "./routes/SpaceRouter.js";
import groupRouter from "./routes/groupRouter.js";

dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.MONGO_DB_URL;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", userRouter);
app.use("/api", spaceRouter);
app.use("/api", groupRouter);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log(`SERVER STARTED ON PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();
