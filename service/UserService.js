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
      throw new Error("user id was not provided");
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
      throw new Error("can't update without user id");
    }

    const updatedUser = await User.findOneAndUpdate(
      { user_id: user.user_id },
      user,
      { new: true }
    );

    return updatedUser;
  }

  async deleteUser(id) {
    if (!id) {
      throw new Error("can't delete without user id");
    }
    const deletedUser = await User.findOneAndDelete({ user_id: id });

    return deletedUser;
  }
}

export default new UserService();
