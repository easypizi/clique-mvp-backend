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
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async getUserById(request, response) {
    try {
      const user = await UserService.getUserById(request.params.id);
      return response.status(200).json(user);
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async getAllUsers(request, response) {
    try {
      const allUsers = await UserService.getAllUsers();
      return response.status(200).json(allUsers);
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async updateUserData(request, response) {
    try {
      const updatedUser = await UserService.updateUserData(request.body);
      return response
        .status(200)
        .json({ status: "success", data: updatedUser });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async deleteUser(request, response) {
    try {
      const deletedUser = await UserService.deleteUser(request.params.id);
      return response
        .status(200)
        .json({ status: "success", data: deletedUser });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }
}

export default new UserController();
