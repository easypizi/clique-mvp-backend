import mongoose from "mongoose";

const Event = new mongoose.Schema({
  event_id: { type: String, required: true },
  event_space_id: { type: String, required: true },
  event_name: { type: String, required: true },
  event_description: { type: String, required: true },
  event_date: { type: String, required: true },
  event_organizer_id: { type: String, required: true },
  event_organizer_telegram_link: { type: String, required: true },
  event_organizer_credentials: { type: String, required: true },
  event_is_offline: { type: Boolean, required: true },
  event_is_verified: { type: Boolean, required: true },
  event_tags: { type: String },
  event_location: {
    country: { type: String },
    city: { type: String },
    address: { type: String },
    geo: { type: String },
  },
  event_link: { type: String },
});

export default mongoose.model("Event", Event);
