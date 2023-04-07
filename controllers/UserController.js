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

  async deleteUser(request, response) {
    try {
      const deletedUser = await UserService.deleteUser(request.params.id);
      return response
        .status(200)
        .json({ status: "success", data: deletedUser });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error });
    }
  }

  //TODO: add method to change visibility of the user in tinder mechanics.
  //TODO: add method to save private_chat_id to the group for verification
  //TODO: add method for verification user inside the TWA - provide private_chat_id and user_id from query params and match it with user Data in DB
}

export default new UserController();
