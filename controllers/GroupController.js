import GroupService from "../service/GroupService.js";

class GroupController {
  async createGroup(request, response) {
    try {
      const group = await GroupService.createGroup(request.body);

      if (group.error) {
        response.status(444).json({
          status: "fail",
          message: "group with such id already exists",
        });
      } else {
        return response.status(200).json({ status: "success", data: group });
      }
    } catch (error) {
      response.status(500).json({ status: "fail", message: error });
    }
  }

  async getGroupById(request, response) {
    try {
      const group = await GroupService.getGroupById(request.params.id);
      return response.status(200).json(group ?? "No group with such ID");
    } catch (error) {
      response.status(500).json({ status: "fail", message: error });
    }
  }

  async getAllGroups(request, response) {
    try {
      const allGroups = await GroupService.getAllGroups();
      return response.status(200).json(allGroups);
    } catch (error) {
      response.status(500).json({ status: "fail", message: error });
    }
  }

  async updateGroupData(request, response) {
    try {
      const updatedGroup = await GroupService.updateGroupData(request.body);
      return response
        .status(200)
        .json({ status: "success", data: updatedGroup });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error });
    }
  }

  async deleteGroup(request, response) {
    try {
      const deletedGroup = await GroupService.deleteGroup(request.params.id);
      return response
        .status(200)
        .json({ status: "success", data: deletedGroup });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error });
    }
  }
}

export default new GroupController();
