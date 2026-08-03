import {
  ChevronLeft,
  ChevronRight,
  Power,
  Clock,
  X,
  Check,
  CalendarDays,
} from "lucide-react";
import { days } from "../constants/days";
import { HoursCard } from "./HoursCard";
import { useEffect, useState } from "react";
import { generateCalendar } from "../utils/generateCalendar";
import { Button } from "./Button";
import { months } from "../constants/months";
import { authFetch } from "../utils/authFetch";
import { formatTime } from "../utils/formatTime";
import { toast } from "sonner";

export function WorkScheduleCustom() {
  const [workDays, setWorkDays] = useState(
    days.map((day) => ({
      weekDay: day.enum,
      active: true,
      workTimes: [],
    })),
  );

  const [customizedDay, setCustomizedDay] = useState({
    date: null,
    active: true,
    workTimes: [],
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarTitle, setCalendarTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

  //To Customize the schedule
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  //Gets the number of days in a month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0, //Return last day of the month
  ).getDate();

  const currentDay = currentDate.getDate();

  function getMonthName(date) {
    const month = months.find((m) => m.id === date.getMonth() + 1);
    return month.name + " " + date.getFullYear();
  }

  useEffect(() => {
    const title = getMonthName(currentDate);
    setCalendarTitle(title);
  });

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

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  const selectedDate = selectedDay
    ? new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay)
    : null;

  const selectedDateString = selectedDate ? formatDate(selectedDate) : null;

  const selectedWeekDay = selectedDate ? days[selectedDate.getDay()].name : "";
  {
    /*OBS getDay() = getWeekDay, getDate() = getDay */
  }

  function addCustomizedTime() {
    if (!startTime || !endTime) return;

    setCustomizedDay((prev) => ({
      ...prev,
      workTimes: [
        ...prev.workTimes,
        {
          startTime,
          endTime,
        },
      ],
    }));
    setStartTime("");
    setEndTime("");
  }

  useEffect(() => {
    async function loadCustomizedDay() {
      try {
        // limpa o anterior imediatamente
        setCustomizedDay({
          date: selectedDateString,
          active: true,
          workTimes: [],
        });

        const response = await authFetch(
          `/customized-schedule/${selectedDateString}`,
        );

        if (response.ok) {
          const data = await response.json();

          if (data) {
            setCustomizedDay({
              date: data.date,
              active: data.active,
              workTimes: data.workTimes,
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (selectedDateString) {
      loadCustomizedDay();
    }
  }, [selectedDateString]);

  async function updateCustomizedDay(e) {
    e.preventDefault();

    try {
      const response = await authFetch("/customized-schedule/update", {
        method: "PUT",
        body: JSON.stringify({
          date: formatDate(selectedDate),
          active: customizedDay.active,
          workTimes: customizedDay.workTimes,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        toast.error(data.message);
        return;
      }

      toast.success("Disponibilidade do dia atualizada com sucesso");
    } catch (err) {
      console.log(err);
    }
  }

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);

    const newCalendarTitle = getMonthName(newDate);
    setCalendarTitle(newCalendarTitle);

    setCurrentDate(newDate);
  };

  const previousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);

    const newCalendarTitle = getMonthName(newDate);
    setCalendarTitle(newCalendarTitle);

    setCurrentDate(newDate);
  };

  //Calendar Array
  const calendarDays = generateCalendar(currentDate);

  const calendar = calendarDays.map((day) => {
    if (day === null) {
      return {
        day: null,
        active: false,
      };
    }

    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );

    const weekDay = date.getDay();

    const workDay = workDays.find((wd) => wd.weekDay === days[weekDay].enum);

    return {
      day,
      active: workDay?.active ?? false,
    };
  });

  //Slots of time
  function generateSlots(workTimes, slotMinutes = 50) {
    const slots = [];

    for (const period of workTimes) {
      //ex: 08:00 - 12:00
      let current = new Date(`1970-01-01T${period.startTime}`); // //ex: 08:00
      const end = new Date(`1970-01-01T${period.endTime}`); //ex: 12:00

      while (current < end) {
        slots.push(
          current.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        );

        current = new Date(current.getTime() + slotMinutes * 60000); //slotMitutes *  60000 -> 50 * 60000 = 50 min
      }
    }

    return slots;
  }

  const workDay = selectedDate
    ? workDays.find((wd) => wd.weekDay === days[selectedDate.getDay()].enum)
    : null;

  const timesToShow =
    customizedDay.workTimes.length > 0
      ? [...customizedDay.workTimes].sort((a, b) =>
          a.startTime.localeCompare(b.startTime),
        )
      : [...(workDay?.workTimes ?? [])].sort((a, b) =>
          a.startTime.localeCompare(b.startTime),
        );

  const workTimeSlots = generateSlots(timesToShow);

  function removeCustomizedTime(index) {
    setCustomizedDay((prev) => ({
      ...prev,
      workTimes: prev.workTimes.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full ">
      {/*Calendar*/}
      <div className="flex flex-col w-full lg:w-1/2 bg-[#131313] p-10 rounded-2xl">
        <div className="flex justify-between items-center">
          <div
            className="border rounded-full border-gray-400/40 p-3 hover:text-amber-300 hover:border-amber-300 cursor-pointer"
            onClick={previousMonth}
          >
            <ChevronLeft />
          </div>

          <p className="font-playfair text-xl">{calendarTitle}</p>

          <div
            className="border rounded-full border-gray-400/40 p-3 hover:text-amber-300 hover:border-amber-300 cursor-pointer"
            onClick={nextMonth}
          >
            <ChevronRight />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-around gap-7 p-5 w-full">
            {days.map((d) => (
              <p>{d.abreviation}</p>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-5 md:gap-3 p-3">
            {calendar.map((calendarDay, index) => (
              <div key={index} className="text-center">
                {calendarDay.day === null ? (
                  <div className="w-full lg:p-3 invisible">0</div>
                ) : (
                  <button
                    disabled={!calendarDay.active}
                    onClick={() => setSelectedDay(calendarDay.day)}
                    className={`
          w-full h-full flex items-center justify-center rounded-xl transition lg:p-3

          ${
            calendarDay.active
              ? "cursor-pointer hover:bg-[#2A2A2A]"
              : "opacity-30 cursor-not-allowed"
          }

          ${
            calendarDay.day === selectedDay
              ? "bg-amber-400 text-black font-semibold"
              : ""
          }
        `}
                  >
                    {calendarDay.day}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* business hours */}
      <form
        className="flex flex-col w-full lg:w-1/2 bg-[#131313] p-10 rounded-2xl"
        onSubmit={updateCustomizedDay}
      >
        <div className="flex flex-col md:flex-row gap-3 mb-3 justify-between items-center">
          <h1 className="text-amber-300 font-montserrat">DIA SELECIONADO</h1>

          <div
            className={`flex gap-3 p-3 border border-amber-50/50 rounded-full  
          items-center cursor-pointer transition

        ${customizedDay.active ? "bg-amber-300 text-black font-semibold border-black" : "text-gray-400"}
      `}
            onClick={() =>
              setCustomizedDay((prev) => ({
                ...prev,
                active: !prev.active,
              }))
            }
          >
            <Power className="w-5 h-5" />

            <p>{customizedDay.active ? "Dia ativo" : "Dia inativo"}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="font-playfair text-2xl">
            {selectedWeekDay}, {calendarTitle}
          </h1>

          <div className="w-full bg-linear-to-r from-amber-300/10 via-amber-300/60 to bg-amber-300/10 h-px rounded-2xl" />
        </div>

        <div className="flex justify-between mt-10 text-gray-300/80">
          <div className="flex gap-2 items-center">
            <Clock className="text-amber-300 w-5 h-5" />

            <p className="font-montserrat">HORÁRIOS</p>
          </div>

          <p>{customizedDay.workTimes.length} selecionados</p>
        </div>

        {/* Hours */}
        <div className="flex w-full justify-center items-center text-gray-300/80 mt-5 mb-5">
          {workTimeSlots.length > 0 ? (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3 p-3">
              {workTimeSlots.map((h) => (
                <HoursCard key={h} hour={h} />
              ))}
            </div>
          ) : (
            <p>Ative o dia para definir os horários de atendimento</p>
          )}
        </div>

        <div className="flex flex-col w-full mt-auto gap-3">
          <div className="flex flex-col gap-3 mb-2 mt-2">
            <p className="font-semibold">Adicionar período personalizado</p>

            <div className="flex gap-5">
              <div className="flex gap-3">
                <input
                  className="border border-gray-300/30 w-full rounded-md p-2"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />

                <input
                  className="border border-gray-300/30 w-full rounded-md p-2"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>

              <Button
                title="Adicionar"
                rounded="rounded-md"
                handleOnClick={addCustomizedTime}
                type="button"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {customizedDay.workTimes.map((time, index) => (
              <div
                key={index}
                className="flex justify-between items-center border border-gray-300/20 rounded-md p-3"
              >
                <p>
                  {formatTime(time.startTime)} - {formatTime(time.endTime)}
                </p>

                <button
                  type="button"
                  onClick={() => removeCustomizedTime(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <Button title="Salvar disponibilidade" type="submit" />
        </div>
      </form>
    </div>
  );
}
