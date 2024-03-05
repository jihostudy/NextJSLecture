import React from "react";
// datas
// import { getFeaturedEvents } from "../dummy_data";
import { getFeaturedEvents } from "../helpers/api-util";
// components
import EventList from "../components/events/EventList";

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

const HomePage = (props) => {
  // const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
};

export default HomePage;
