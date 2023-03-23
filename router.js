import Router from "express";
import UserController from "./controllers/UserController.js";

const router = new Router();

//Get all users
router.get("/users", UserController.getAllUsers);

//Get user by ID
router.get("/user/:id", UserController.getUserById);

//Create new user
router.post("/create-user", UserController.createUser);

//Update user data
router.put("/update-user", UserController.updateUserData);

export default router;
