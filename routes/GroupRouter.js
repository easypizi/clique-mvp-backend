import Router from "express";
import GroupController from "../controllers/GroupController.js";

const groupRouter = new Router();

//Get all groups
groupRouter.get("/group", GroupController.getAllGroups);

//Get group by ID
groupRouter.get("/group/:id", GroupController.getGroupById);

//Create new group
groupRouter.post("/create-group", GroupController.createGroup);

//Update group data
groupRouter.patch("/update-group", GroupController.updateGroupData);

//Delete group data
groupRouter.delete("/delete-group/:id", GroupController.deleteGroup);

export default groupRouter;
