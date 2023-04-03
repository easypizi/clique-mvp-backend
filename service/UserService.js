import User from "../models/User.js";

import { uniqueArrayElements } from "../helpers/common.js";

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

  async updateUserData(userData) {
    if (!userData.user_id) {
      throw new Error("can't update without user id");
    }

    const user = await User.findOne({ user_id: userData.user_id });

    if (!user) {
      throw new Error("there is no user with such id");
    }

    let updateData = { ...userData };

    if (userData.user_groups) {
      const currentUserGroups = user.user_groups;
      const newGroups = uniqueArrayElements(
        currentUserGroups,
        userData.user_groups
      );

      updateData.user_groups = newGroups;
    }

    const updatedUser = await User.findOneAndUpdate(
      { user_id: userData.user_id },
      updateData,
      { new: true }
    );

    return updatedUser;
  }

  async deleteUser(id) {
    if (!id) {
      throw new Error("can't delete user without user id");
    }
    const deletedUser = await User.findOneAndDelete({ user_id: id });

    return deletedUser;
  }
}

export default new UserService();
