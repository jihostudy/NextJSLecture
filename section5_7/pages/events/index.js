import React from "react";
// next
import { useRouter } from "next/router";
// datas
// import { getAllEvents } from "../../dummy_data";
import { getAllEvents } from "../../helpers/api-util";
// components
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
const EventsPage = (props) => {
  const { events } = props;
  const router = useRouter();

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
