import mongoose from "mongoose";

const Space = new mongoose.Schema({
  space_id: { type: String, required: true },
  space_name: { type: String, required: true },
  space_description: { type: String, required: true },
  //Match with user_id to show that he is space owner
  space_owner_id: { type: String, required: true },
  space_groups_id: { type: [String] },
  //Modules for future paid function
  permissions: [
    {
      module_name: { type: String, required: true },
      is_allowed: { type: Boolean, required: true },
    },
  ],
});

export default mongoose.model("Space", Space);


