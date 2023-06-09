import Event from "../models/Event.js";

class EventService {
  async getAllEvents() {
    const allEvents = await Event.find();
    return allEvents;
  }

  async getEventById(id) {
    if (!id) {
      throw new Error("event Id was not provided");
    }
    const event = await Event.find({ event_id: id });
    return event;
  }

  async createEvent(eventData) {
    try {
      const createdEvent = Event.create(eventData);
      return createdEvent;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateEvent(eventData) {
    if (!eventData.event_id) {
      throw new Error("can't update without event id");
    }
    const updatedEvent = Event.findOneAndUpdate(
      { event_id: eventData.event_id },
      eventData,
      { new: true }
    );
    return updatedEvent;
  }

  async deleteEvent(id) {
    if (!id) {
      throw new Error("can't delete event without provided event Id");
    }

    const deletedEvent = await Event.findOneAndDelete({ event_id: id });
    return deletedEvent;
  }
}

export default new EventService();
