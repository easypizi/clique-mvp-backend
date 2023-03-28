import mongoose from "mongoose";

const Space = new mongoose.Schema({
  space_id: { type: String, required: true },
  space_name: { type: String, required: true },
  space_description: { type: String, required: true },
  owner_id: { type: String, required: true },
  super_groups: [{ type: String }],
});

export default mongoose.model("Space", Space);
