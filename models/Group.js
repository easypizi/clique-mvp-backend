import mongoose from "mongoose";

import Space from "./Space.js";
import User from "./User.js";

// this model is handle data for chat lists
const Group = new mongoose.Schema({
  group_id: { type: String, required: true },
  group_admins_id: { type: [String], required: true },
  group_link: { type: String },
  group_name: { type: String },
  group_type: { type: String },
  group_hidden_spaces: { type: [String] },
});

Group.post(["save", "findOneAndUpdate"], async function (group) {
  try {
    const groupId = group.group_id;
    const groupAdmins = group.group_admins_id;
    const spaces = await Space.find({ space_owner_id: { $in: groupAdmins } });
    const spaceIds = spaces.map((space) => space.space_id);

    await Space.updateMany(
      { space_id: { $in: spaceIds } },
      { $addToSet: { space_groups_id: groupId } }
    );

    const users = await User.find({ user_groups: { $in: [groupId] } });
    const userUpdates = users.map((user) =>
      User.updateOne(
        { _id: user._id },
        { $addToSet: { user_spaces: { $each: spaceIds } } }
      )
    );
    await Promise.all(userUpdates);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

export default mongoose.model("Group", Group);
