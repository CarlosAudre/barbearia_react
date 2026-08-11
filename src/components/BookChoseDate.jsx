import { useState, useEffect } from "react";
import { months } from "../constants/months";
import { Calendar } from "./Calendar";
import { days } from "../constants/days";
import { authFetch } from "../utils/authFetch";

export function BookChoseDate({ setBooking}) {
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
  const [customizedDays, setCustomizedDays] = useState([]);
  const [formatedDate, setFormatedDate] = useState();

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

  useEffect(() => {
    async function loadCustomizedDays() {
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;

        const response = await authFetch(
          `/customized-schedule/${year}/${month}`,
        );

        const data = await response.json();

        setCustomizedDays(data);
      } catch (err) {
        console.log(err);
      }
    }

    loadCustomizedDays();
  }, [currentDate]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center text-center items-center gap-2 mb-5">
        <p className="text-amber-300 font-montserrat text-sm">ETAPA 2</p>
        <h1 className="  text-2xl">ESCOLHA A DATA</h1>
        <p className="text-gray-300/80 ">
          Selecione a sua melhor data para atendimento
        </p>
      </div>

      <Calendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        customizedDays={customizedDays}
        calendarTitle={calendarTitle}
        setCalendarTitle={setCalendarTitle}
        getMonthName={getMonthName}
        workDays={workDays}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        width="w-full"
        setBooking={setBooking}
        setFormatedDate={setFormatedDate}
        formatedDate={formatedDate}
      />
    </div>
  );
}
