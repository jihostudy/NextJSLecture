import React, { use } from "react";
// next
import { useRouter } from "next/router";
// data
// import { getFilteredEvents } from "../../dummy_data";
import { getFilteredEvents } from "../../helpers/api-util";
// components
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/UI/ErrorAlert";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  // 처음 로딩될때
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const [filteredYear, filteredMonth] = filterData;
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect : {
      //   destination : "/error"
      // }
    };
  }
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
const FilteredEventsPage = (props) => {
  const filterData = props.events;

  if (props.hasError) {
    return (
      <React.Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your value!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="events">Show All Events</Button>
        </div>
      </React.Fragment>
    );
  }
  const filteredEvents = props.events;
  if (!filterData || filterData.length === 0) {
    return (
      <React.Fragment>
        <ErrorAlert>
          <p>No Events Found for the Chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </React.Fragment>
    );
  }
  console.log(props.date);
  const date = new Date(props.date.year, props.date.month - 1);
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
};

export default FilteredEventsPage;
