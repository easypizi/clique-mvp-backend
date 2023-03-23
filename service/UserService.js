import User from "../models/User.js";

class UserService {
  async createUser(userData) {
    const user = await User.find({ user_id: userData.user_id });
    if (user.length > 0) {
      return {
        error: true,
      };
    } else {
      const createdUser = User.create(userData);
      return createdUser;
    }
  }

  async getUserById(id) {
    if (!id) {
      throw new Error("user with such id already exists");
    }
    const user = await User.find({ user_id: id });
    return user;
  }

  async getAllUsers() {
    const allUsers = await User.find();
    return allUsers;
  }

  async updateUserData(user) {
    if (!user.user_id) {
      throw new Error("user with such id already exists");
    }

    const updatedUser = await User.findOneAndUpdate(
      { user_id: user.user_id },
      user,
      { new: true }
    );

    return updatedUser;
  }
}

export default new UserService();
