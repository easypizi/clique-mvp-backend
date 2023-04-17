import Router from "express";
import FileController from "../controllers/FileController.js";

const fileRouter = new Router();

//upload new user Photo
fileRouter.post("/upload-photo", FileController.uploadPhoto);

//upload new space File
fileRouter.post("/upload-file", FileController.uploadFile);

//delete file from space and DB
fileRouter.delete("/delete-file/:fileId", FileController.deleteFile);

//get All files
fileRouter.get("/files", FileController.getAllFiles);

export default fileRouter;
