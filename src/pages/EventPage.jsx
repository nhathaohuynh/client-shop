import React, { useEffect, useState } from "react";
import { EventCard, Footer, Header, Sponsored } from "../components";
import styles from "../styles/style";
import { useSelector } from "react-redux";

const EventPage = () => {
  const { events } = useSelector((state) => state.event);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(events);
  }, [events]);
  return (
    <div>
      <Header activeHeading={4} />
      <div className={`${styles.section} mt-10`}>
        {data?.length > 0 &&
          data.map((event) => {
            return (
              <EventCard key={crypto.randomUUID()} data={event}></EventCard>
            );
          })}
      </div>
      <Sponsored />
      <Footer />
    </div>
  );
};

export default EventPage;
