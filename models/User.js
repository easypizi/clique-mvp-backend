import mongoose from "mongoose";
import Space from "./Space.js";
import Group from "./Group.js";
import { flatten } from "../helpers/common.js";

const User = new mongoose.Schema({
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  user_telegram_link: { type: String, required: true },
  user_last_name: { type: String },
  user_description: { type: String },
  is_visible: { type: Boolean },
  user_bot_chat_id: { type: String },
  user_last_chosen_space: { type: String },
  user_image: { type: String },
  user_spaces: { type: [String] },
  user_groups: { type: [String] },
  user_badges: { type: [String] },
  user_links: { type: [String] },
  user_hidden_spaces: { type: [String] },
});

User.post(["save", "findOneAndUpdate"], async function (user) {
  try {
    const userGroupsId = user.user_groups;
    const userId = user.user_id;
    const groups = await Group.find({ group_id: { $in: userGroupsId } });

    if (groups && groups.length) {
      const groupAdmins = [
        ...new Set(flatten(groups.map((group) => group.group_admins_id))),
      ];

      const userToUpdate = await mongoose
        .model("User")
        .findOne({ user_id: userId }, { user_spaces: 1 });

      const spaces = await Space.find({ space_owner_id: { $in: groupAdmins } });
      const spacesIds = spaces.map((space) => space.space_id);
      await userToUpdate.updateOne({ $set: { user_spaces: spacesIds } });
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

export default mongoose.model("User", User);
