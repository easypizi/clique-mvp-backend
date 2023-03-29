import mongoose from "mongoose";

const User = new mongoose.Schema({
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  user_telegram_link: { type: String, required: true },
  user_personal_id: { type: String },
  user_last_name: { type: String },
  user_image: { type: String },
  user_description: { type: String },
  user_spaces: [{ type: String }],
  user_groups: [
    {
      group_id: { type: String, required: true },
      admins: [{ type: String, required: true }],
    },
  ],
});

export default mongoose.model("User", User);
