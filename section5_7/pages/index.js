import React from "react";
// datas
import { getFeaturedEvents } from "../dummy_data";
// components
import EventList from "../components/events/EventList";
const HomePage = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
