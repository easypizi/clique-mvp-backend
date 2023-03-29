import mongoose from "mongoose";

const User = new mongoose.Schema({
  //Use for authentification; Personal id.
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  user_telegram_link: { type: String, required: true },
  user_last_name: { type: String },
  user_description: { type: String },
  is_visible: { type: Boolean },
  //Use for authentification. Ability to change profile data and upload files to community
  user_bot_chat_id: { type: String },
  user_image: { type: String },
  //Add all spaces, where this user is confirmed (space was created and this user is member of one of this groups)
  //TODO: add CRON operation to match user with community;
  user_spaces: { type: [String] },
  //match groups to check that user can be in one of that communities
  //TODO: on add in any group with bot - add group_id to this field.
  user_groups: { type: [String] },
});

export default mongoose.model("User", User);
