import Router from "express";
import SpaceController from "../controllers/SpaceController.js";

const spaceRouter = new Router();

//Get all spaces
spaceRouter.get("/space", SpaceController.getAllSpaces);

//Get space by ID
spaceRouter.get("/space/:id", SpaceController.getSpaceById);

//Create new space
spaceRouter.post("/create-space", SpaceController.createSpace);

//Update space data
spaceRouter.patch("/update-space", SpaceController.updateSpaceData);

//Delete space data
spaceRouter.delete("/delete-space/:id", SpaceController.deleteSpace);

export default spaceRouter;
