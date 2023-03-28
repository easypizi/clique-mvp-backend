import mongoose from "mongoose";

const Space = new mongoose.Schema({
  group_id: { type: String, required: true },
  owner_id: [{ type: String, required: true }],
  spaces: [
    {
      space_id: { type: String, required: true },
      owner_id: { type: String, required: true },
    },
  ],
});

export default mongoose.model("Space", Space);
