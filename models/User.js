import mongoose from "mongoose";

const User = new mongoose.Schema({
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  is_admin: { type: Boolean, required: true },
  user_telegram_link: { type: String, required: true },
  user_last_name: { type: String },
  user_image: { type: String },
  user_description: { type: String },
});

export default mongoose.model("User", User);
