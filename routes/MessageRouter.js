import Router from "express";
import MessageController from "../controllers/MessageController.js";

const messageRouter = new Router();

//Get All messages
messageRouter.get("/message", MessageController.getAllMessages);

//Create new group
messageRouter.post("/create-message", MessageController.createMessage);

//Update group data
messageRouter.patch("/update-message", MessageController.updateMessage);

//Delete group data
messageRouter.delete(
  "/delete-message/:group/:id",
  MessageController.deleteMessage
);

export default messageRouter;
