import { createContext, useEffect, useState } from "react";

export const DateContext = createContext();

export function DateContextProvider({ children }) {
    const startDefault = new Date();
    startDefault.setHours(startDefault.getHours() + 1);
    startDefault.setMinutes(0);
    const endDefault = new Date();
    endDefault.setHours(endDefault.getHours() + 2);
    endDefault.setMinutes(0);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(startDefault);
  const [endTime, setEndTime] = useState(endDefault);

  useEffect(() => {
    const start = new Date(startTime);
    start.setDate(selectedDate.getDate());
    const end = new Date(endTime);
    end.setDate(selectedDate.getDate());

    setStartTime(start);
    setEndTime(end);
  }, [selectedDate])


  return (
    <DateContext.Provider
      value={
        {selectedDate,
        setSelectedDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime}
      }
    >
      {children}
    </DateContext.Provider>
  );
}
