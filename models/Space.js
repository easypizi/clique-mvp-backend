import mongoose from "mongoose";
import User from "./User.js";

const Space = new mongoose.Schema({
  space_id: { type: String, required: true },
  space_name: { type: String, required: true },
  space_description: { type: String, required: true },
  space_owner_id: { type: String, required: true },
  space_groups_id: { type: [String] },
  space_message_hashtags: { type: [String] },
  permissions: [
    {
      module_name: { type: String, required: true },
      is_allowed: { type: Boolean, required: true },
    },
  ],
});

Space.post(["findOneAndDelete"], async function (space) {
  try {
    const spaceId = space.space_id;
    const users = await User.find({ user_spaces: { $in: [spaceId] } });
    const userUpdates = users.map((user) => {
      const filteredSpacesIds = user?.user_spaces.filter(
        (space) => space !== spaceId
      );

      const updateData = {
        user_spaces: filteredSpacesIds,
      };

      if (user?.user_last_chosen_space === spaceId) {
        updateData["user_last_chosen_space"] = "";
      }

      return User.updateOne({ _id: user._id }, updateData);
    });
    await Promise.all(userUpdates);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

export default mongoose.model("Space", Space);
