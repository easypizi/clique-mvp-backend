import SpaceService from "../service/SpaceService.js";

class SpaceController {
  async createSpace(request, response) {
    try {
      const space = await SpaceService.createSpace(request.body);

      if (space.error) {
        response.status(444).json({
          status: "fail",
          message: "space with such id already exists",
        });
      } else {
        return response.status(200).json({ status: "success", data: space });
      }
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async getSpaceById(request, response) {
    try {
      const space = await SpaceService.getSpaceById(request.params.id);
      return response.status(200).json(space);
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async getUserSpaces(request, response) {
    try {
      const userSpaces = await SpaceService.getAllUserSpaces(request.query.id);
      return response.status(200).json(userSpaces);
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async getAllSpaces(request, response) {
    try {
      const allSpaces = await SpaceService.getAllSpaces();
      return response.status(200).json(allSpaces);
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async updateSpaceData(request, response) {
    try {
      const updatedSpace = await SpaceService.updateSpaceData(request.body);
      return response
        .status(200)
        .json({ status: "success", data: updatedSpace });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async deleteSpace(request, response) {
    try {
      const deletedSpace = await SpaceService.deleteSpace(request.params.id);
      return response
        .status(200)
        .json({ status: "success", data: deletedSpace });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }
}

export default new SpaceController();
