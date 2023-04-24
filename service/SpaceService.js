import Space from "../models/Space.js";
import Group from "../models/Group.js";
import User from "../models/User.js";

import { uniqueArrayElements } from "../helpers/common.js";
import { mergeSpacePermissions } from "../helpers/spaceDataHelpers.js";
import { formatGroupsData } from "../helpers/groupDataHelpers.js";
import { formatUsersData } from "../helpers/userDataHelpers.js";
import { formatMessagesData } from "../helpers/messageDataHelpers.js";
import { formatFilesData } from "../helpers/fileDataHelpers.js";
import { sortUsers } from "../helpers/usersSorting.js";
import Message from "../models/Message.js";
import File from "../models/File.js";

class SpaceService {
  async createSpace(data) {
    try {
      const space = await Space.find({ space_id: data.space_id });

      if (space.length > 0) {
        return {
          error: true,
        };
      } else {
        const createdData = data;
        const groups = await Group.find({
          group_admins_id: { $in: [createdData.space_owner_id] },
        });

        if (groups && groups.length) {
          const groupsIds = groups.map((group) => group.group_id);
          createdData["space_groups_id"] = groupsIds;
        }

        const createdSpace = Space.create(createdData);
        return createdSpace;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getSpaceById(id) {
    try {
      if (!id) {
        throw new Error("space id was not provided");
      }
      const space = await Space.find({ space_id: id });

      if (space && space.length > 0) {
        const currentSpace = space[0];
        const ownerId = currentSpace.space_owner_id;
        const spaceId = currentSpace.space_id;

        const currentSpaceGroups = await Group.find({
          group_admins_id: { $in: [ownerId] },
        });
        const currentSpaceUsers = await User.find({
          user_spaces: { $in: [spaceId] },
        });
        const spaceMessages = await Message.find({
          message_space: { $in: [spaceId] },
        });
        const spaceFiles = await File.find({
          space_id: id,
        });

        const result = {
          spaceId: spaceId,
          spaceName: currentSpace.space_name,
          spaceDescription: currentSpace.space_description,
          spaceOwner: currentSpace.space_owner_id,
          spaceGroups: formatGroupsData(currentSpaceGroups),
          spaceUsers: sortUsers(formatUsersData(currentSpaceUsers)),
          spaceMessages: formatMessagesData(spaceMessages),
          spaceFiles: formatFilesData(spaceFiles),
          spacePermissions: currentSpace.space_permissions,
          spaceHashtags: currentSpace.space_message_hashtags,
        };

        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Space error: ", error);
    }
  }

  async getAllUserSpaces(id) {
    try {
      const parsedIds = id.split(",");
      const userSpaces = await Space.find({ space_id: { $in: parsedIds } });
      return userSpaces;
    } catch (error) {
      console.log(error);
    }
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

    if (spaceData.space_groups_id) {
      const currentSpaceGroups = space.space_groups_id;
      const newGroups = uniqueArrayElements(
        currentSpaceGroups,
        spaceData.space_groups_id
      );
      updateData.space_groups_id = newGroups;
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
