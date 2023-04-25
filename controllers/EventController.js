import EventService from "../service/EventService.js";

class EventController {
  async getAllEvents(request, response) {
    try {
      const alLEvents = await EventService.getAllEvents();
      return response.status(200).json(alLEvents);
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async getEventById(request, response) {
    try {
      const event = await EventService.getEventById(request.params.id);
      return response.status(200).json(event);
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async createEvent(request, response) {
    try {
      const event = await EventService.createEvent(request.body);
      return response.status(200).json({ status: "success", data: event });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }

  async deleteEvent(request, response) {
    try {
      const deletedEvent = await EventService.deleteEvent(request.params.id);
      return response
        .status(200)
        .json({ status: "success", data: deletedEvent });
    } catch (error) {
      response.status(500).json({ status: "fail", message: error.message });
    }
  }
}

export default new EventController();
