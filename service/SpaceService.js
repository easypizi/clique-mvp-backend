import Space from "../models/Space.js";

class SpaceService {
  async createSpace(data) {
    const space = await Space.find({ space_id: data.space_id });

    if (space.length > 0) {
      return {
        error: true,
      };
    } else {
      //TODO: additional check is it possible or not and get Search from other tables such as groups and etc.
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

  async updateSpaceData(data) {
    if (!data.space_id) {
      throw new Error(
        "can't update space name or description without provided id of the space"
      );
    }

    // let updateData = data;

    // if (data.space_groups) {
    //   const space = await Space.findOne({ space_id: data.space_id });
    //   const currentSpaceGroups = space.space_groups;

    //   if (!currentSpaceGroups.includes(data.space_groups)) {
    //     updateData.space_groups = [
    //       ...updateData.space_groups,
    //       data.space_groups,
    //     ];
    //   }
    // }

    // console.log(updateData);

    const updatedSpace = await Space.findOneAndUpdate(
      {
        space_id: data.space_id,
      },
      data,
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
