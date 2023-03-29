import Router from "express";
import SpaceController from "../controllers/SpaceController.js";

const router = new Router();

//USERS API
//Get all users
router.get("/space", SpaceController.getAllSpaces);

//Get user by ID
router.get("/space/:id", SpaceController.getSpaceById);

//Create new user
router.post("/create-space", SpaceController.createSpace);

//Update user data
router.patch("/update-space", SpaceController.updateSpaceData);

//Delete user data
router.delete("/delete-space/:id", SpaceController.deleteSpace);

export default spaceRouter;
