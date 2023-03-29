import Router from "express";
import UserController from "../controllers/UserController.js";

const userRouter = new Router();

//Get all users
userRouter.get("/users", UserController.getAllUsers);

//Get user by ID
userRouter.get("/user/:id", UserController.getUserById);

//Create new user
userRouter.post("/create-user", UserController.createUser);

//Update user data
userRouter.patch("/update-user", UserController.updateUserData);

//Delete user data
userRouter.delete("/delete-user/:id", UserController.deleteUser);

export default userRouter;
