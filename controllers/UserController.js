import User from "../models/User.js";
import UserService from "../service/UserService.js";

class UserController {
  async createUser(request, response) {
    try {
      const user = await UserService.createUser(request.body);

      if (user.error) {
        response.status(444).json({
          status: "fail",
          message: "user with such id already exists",
        });
      } else {
        return response.status(200).json({ status: "success", data: user });
      }
    } catch (error) {
      response.status(500).json({ status: "fail", message: error });
    }
  }

  async getUserById(request, response) {
    try {
      const user = await UserService.getUserById(request.params.id);
      return response.status(200).json(user ?? "No user with such ID");
    } catch (error) {
      response.status(500).json({ status: "fail", message: error });
    }
  }

  async getAllUsers(request, response) {
    try {
      const allUsers = await UserService.getAllUsers();
      return response.status(200).json(allUsers);
    } catch (error) {
      response.status(500).json({ status: "fail", message: error });
    }
  }

  async updateUserData(request, response) {
    try {
      const updatedUser = await UserService.updateUserData(request.body);
      return response
        .status(200)
        .json({ status: "success", data: updatedUser });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error });
    }
  }
}

export default new UserController();
