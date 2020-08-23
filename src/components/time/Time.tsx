import React, { FC, useState, useEffect } from "react";
import "./Time.scss";
import { format } from "date-fns";

const Time: FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return (): void => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="time">
      <div className="time__day">{format(time, "EEEE LLLL dd")}</div>
      <div className="time__clock">{format(time, "HH:mm:ss")}</div>
    </div>
  );
};

export default Time;
