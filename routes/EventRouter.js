import Router from "express";
import EventController from "../controllers/EventController.js";

const eventRouter = new Router();

//Get all events
eventRouter.get("/events", EventController.getAllEvents);

//Get event by ID
eventRouter.get("/event/:id", EventController.getEventById);

//Create new event
eventRouter.post("/create-event", EventController.createEvent);

//Delete event data
eventRouter.delete("/delete-event/:id", EventController.deleteEvent);

export default eventRouter;
