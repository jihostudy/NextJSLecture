import React, { Fragment } from "react";
// next
import { useRouter } from "next/router";
// data
// import { getEventById } from "../../dummy_data";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
// components
import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import ErrorAlert from "../../components/UI/ErrorAlert";

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((event) => ({
    params: { eventId: event.id },
  }));
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // useRouter로 url의 params를 보던거를 context로 한다.
  console.log(context);
  const eventId = context.params.eventId;
  const selectedEvent = await getEventById(eventId);
  return {
    props: {
      selectedEvent,
    },
    revalidate: 30,
  };
}

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetailPage;
