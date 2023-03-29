import mongoose from "mongoose";

// this model is handle data for chat lists
const Group = new mongoose.Schema({
  group_id: { type: String, required: true },
  group_link: { type: String, required: true },
  //Show groups for community - get space owner in this array, if yes - show in community space.
  group_admins_id: { type: [String], required: true },
});

export default mongoose.model("Group", Group);
