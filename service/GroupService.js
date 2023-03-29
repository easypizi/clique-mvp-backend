import Group from "../models/Group.js";

class GroupService {
  async createGroup(groupData) {
    const group = await Group.find({ group_id: groupData.group_id });
    if (group.length > 0) {
      return {
        error: true,
      };
    } else {
      const createdGroup = Group.create(groupData);
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

    const updatedGroup = await Group.findOneAndUpdate(
      { group_id: groupData.group_id },
      groupData,
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
