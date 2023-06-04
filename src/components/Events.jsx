import React, { useEffect, useState } from "react";
import styles from "../styles/style";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Events = () => {
  const { events } = useSelector((state) => state.event);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(events);
  }, [events]);
  return (
    <div>
      <div className={styles.section}>
        <div className={styles.heading}>
          <h1>Popular Events</h1>
        </div>
        <div className="w-full grid">
          {data?.length > 0 &&
            data.map((event) => {
              return (
                <EventCard key={crypto.randomUUID()} data={event}></EventCard>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Events;
