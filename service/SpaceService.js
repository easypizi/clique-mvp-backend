import Space from "../models/Space.js";
import { uniqueArrayElements } from "../helpers/dataHelpers.js";
import { mergeSpacePermissions } from "../helpers/spaceDataHelpers.js";

class SpaceService {
  async createSpace(data) {
    const space = await Space.find({ space_id: data.space_id });

    if (space.length > 0) {
      return {
        error: true,
      };
    } else {
      const createdSpace = Space.create(data);
      return createdSpace;
    }
  }

  async getSpaceById(id) {
    if (!id) {
      throw new Error("space id was not provided");
    }
    const space = await Space.find({ space_id: id });
    return space;
  }

  async getAllSpaces() {
    const allSpaces = await Space.find();
    return allSpaces;
  }

  async updateSpaceData(spaceData) {
    if (!spaceData.space_id) {
      throw new Error(
        "can't update space name or description without provided id of the space"
      );
    }

    const space = await Space.findOne({ space_id: spaceData.space_id });

    if (!space) {
      throw new Error("there is no space with such id");
    }

    let updateData = { ...spaceData };

    if (spaceData.space_groups) {
      const currentSpaceGroups = space.space_groups;
      const newGroups = uniqueArrayElements(
        currentSpaceGroups,
        spaceData.space_groups
      );
      updateData.space_groups = newGroups;
    }

    if (spaceData.permissions) {
      const currentSpacePermissions = space.permissions;
      const newPermissions = mergeSpacePermissions(
        currentSpacePermissions,
        spaceData.permissions
      );
      updateData.permissions = newPermissions;
    }

    const updatedSpace = await Space.findOneAndUpdate(
      {
        space_id: spaceData.space_id,
      },
      updateData,
      { new: true }
    );

    return updatedSpace;
  }

  async deleteSpace(id) {
    if (!id) {
      throw new Error("can't delete space without provided space ID");
    }
    const deletedSpace = await Space.findOneAndDelete({ space_id: id });
    return deletedSpace;
  }
}

export default new SpaceService();
