import Router from "express";
import FileController from "../controllers/FileController.js";

const fileRouter = new Router();

//upload new user Photo
fileRouter.post("/upload-photo", FileController.uploadPhoto);

export default fileRouter;
