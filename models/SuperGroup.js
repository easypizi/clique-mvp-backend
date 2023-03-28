import mongoose from "mongoose";

const SuperGroup = new mongoose.Schema({
  group_id: { type: String, required: true },
  group_admins_id: [{ type: String, required: true }],
  group_spaces: [
    {
      space_id: { type: String, required: true },
      owner_id: { type: String, required: true },
    },
  ],
});

export default mongoose.model("SuperGroup", SuperGroup);
