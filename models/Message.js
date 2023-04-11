import mongoose from "mongoose";

const Message = new mongoose.Schema({
  message_id: { type: String, required: true },
  message_group_id: { type: String, required: true },
  message_date: { type: Number, required: true },
  message_text: { type: String, required: true },
  message_tags: { type: [String], required: true },
  message_link: { type: String, required: true },
  message_user_photo: { type: String, requred: true },
  message_user_name: { type: String, required: true },
  message_user_id: { type: String, required: true },
  message_space: { type: [String] },
});

export default mongoose.model("Message", Message);
