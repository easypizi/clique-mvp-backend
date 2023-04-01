import Group from "../models/Group.js";
import { uniqueArrayElements } from "../helpers/dataHelpers.js";
class GroupService {
  async createGroup(groupData) {
    const group = await Group.find({ group_id: groupData.group_id });
    if (group.length > 0) {
      return {
        error: true,
      };
    } else {
      const createdGroup = await Group.create(groupData);
      return createdGroup;
    }
  }

  async getGroupById(id) {
    if (!id) {
      throw new Error("group id was not provided");
    }
    const group = await Group.find({ group_id: id });
    return group;
  }

  async getAllGroups() {
    const allGroups = await Group.find();
    return allGroups;
  }

  async updateGroupData(groupData) {
    if (!groupData.group_id) {
      throw new Error("can't update without group id");
    }

    const group = await Group.findOne({ group_id: groupData.group_id });

    if (!group) {
      throw new Error("there is no group with such id");
    }

    let updateData = { ...groupData };

    if (groupData.group_admins_id) {
      const currentGroupAdmins = group.group_admins_id;
      const newAdmins = uniqueArrayElements(
        currentGroupAdmins,
        groupData.group_admins_id
      );
      updateData.group_admin_id = newAdmins;
    }

    const updatedGroup = await Group.findOneAndUpdate(
      { group_id: groupData.group_id },
      updateData,
      { new: true }
    );

    return updatedGroup;
  }

  async deleteGroup(id) {
    if (!id) {
      throw new Error("can't delete group without group id");
    }
    const deletedGroup = await Group.findOneAndDelete({ group_id: id });

    return deletedGroup;
  }
}

export default new GroupService();
