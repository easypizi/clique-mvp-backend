import Router from "express";
import GroupController from "../controllers/GroupController.js";

const router = new Router();

//USERS API
//Get all users
router.get("/group", GroupController.getAllGroups);

//Get user by ID
router.get("/group/:id", GroupController.getGroupById);

//Create new user
router.post("/create-group", GroupController.createGroup);

//Update user data
router.patch("/update-group", GroupController.updateGroupData);

//Delete user data
router.delete("/delete-group/:id", GroupController.deleteGroup);

export default groupRouter;
