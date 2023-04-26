export const formatEventsData = (events) => {
  if (!events || !events.length) {
    return [];
  }

  const filteredEvents = events.filter((item) => item.event_is_verified);

  return filteredEvents.map(
    ({
      event_id,
      event_name,
      event_description,
      event_date,
      event_organizer_id,
      event_organizer_credentials,
      event_is_offline,
      event_tags,
      event_location,
      event_link,
    }) => {
      return {
        eventId: event_id,
        title: event_name,
        description: event_description,
        date: event_date,
        organizerName: event_organizer_credentials,
        organizerId: event_organizer_id,
        isReal: event_is_offline,
        tags: event_tags,
        location: event_location,
        link: event_link,
      };
    }
  );
};
