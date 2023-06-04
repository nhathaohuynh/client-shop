import React, { useEffect, useState } from "react";

const CountDown = ({endDate }) => {
  const [timeLeft, settimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      settimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(endDate) - +new Date(Date.now());
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }
  const timerComponents = Object.keys(timeLeft).map((interval) => {
    return (
      <div key={crypto.randomUUID()} className="items-center hidden 800px:flex">
        <span
          className="text-[25px] text-[#475ad2] bg-[rgba(0,0,0,0.1)] mx-2 font-[600] w-[40px] h-[40px] inline-block text-center rounded-md"
          key={crypto.randomUUID()}
        >
          {timeLeft[interval] ? timeLeft[interval] : "0"}
        </span>
        <span className="font-[500] text-[16px] text-center">{interval}</span>
      </div>
    );
  });
  return (
    <div className="flex">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-red-500 text-[25px]">Time is up</span>
      )}
    </div>
  );
};

export default CountDown;
