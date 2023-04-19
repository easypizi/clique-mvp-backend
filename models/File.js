import mongoose from "mongoose";

const File = new mongoose.Schema({
  space_id: { type: String, required: true },
  file_id: { type: String, required: true },
  file_name: { type: String, requred: true },
  file_size: { type: String, required: true },
  file_type: { type: String, required: true },
  file_url: { type: String, required: true },
  file_date: { type: Number, required: true },
  file_mime: { type: String },
});

export default mongoose.model("File", File);
