import { useState, useEffect } from "react";
import { months } from "../constants/months";
import { Calendar } from "./Calendar";
import { days } from "../constants/days";
import { authFetch } from "../utils/authFetch";

export function BookChoseDate() {
  const [workDays, setWorkDays] = useState(
    days.map((day) => ({
      weekDay: day.enum,
      active: true,
      workTimes: [],
    })),
  );

  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarTitle, setCalendarTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

  const getMonthName = (date) => {
    const month = months.find((m) => m.id === date.getMonth() + 1);
    return month.name + " " + date.getFullYear();
  };

  useEffect(() => {
    setCalendarTitle(getMonthName(currentDate));
  }, [currentDate]);

  useEffect(() => {
    async function loadSchedule() {
      try {
        const response = await authFetch("/schedule");

        const data = await response.json();

        if (data.workDays.length > 0) {
          setWorkDays(data.workDays);
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadSchedule();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center text-center items-center gap-2 mb-5">
        <p className="text-amber-300 font-montserrat text-sm">ETAPA 1</p>
        <h1 className="  text-2xl">ESCOLHA A DATA</h1>
        <p className="text-gray-300/80 ">
          Selecione a sua melhor data para atendimento
        </p>
      </div>

      <Calendar
        currentDate={currentDate}
        calendarTitle={calendarTitle}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        workDays={workDays}
        width="w-full"
      />
    </div>
  );
}
