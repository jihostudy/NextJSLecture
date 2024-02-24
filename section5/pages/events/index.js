import React from "react";
// next
import { useRouter } from "next/router";
// datas
import { getAllEvents } from "../../dummy_data";
// components
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
const EventsPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <React.Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </React.Fragment>
  );
};

export default EventsPage;
