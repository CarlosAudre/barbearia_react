import { ChevronLeft, ChevronRight } from "lucide-react";
import { days } from "../constants/days";
import { generateCalendar } from "../utils/generateCalendar";

export function Calendar({
  currentDate,
  setCurrentDate,
  calendarTitle,
  setCalendarTitle,
  getMonthName,
  workDays,
  customizedDays,
  selectedDay,
  setSelectedDay,
  width = "w-1/2",
  isAdmin,
  setBooking,
}) {
  function formatDate(date) {
    return date.toISOString().split("T")[0];
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

    const customizedDay = customizedDays.find(
      (cd) => cd.date === formatDate(date),
    );

    const workDay = workDays.find((wd) => wd.weekDay === days[weekDay].enum);

    const isActive = customizedDay
      ? customizedDay.active
      : (workDay?.active ?? false);

    return {
      day,
      active: customizedDay ? customizedDay.active : (workDay?.active ?? false),
      isCustomized: !!customizedDay,
    };
  });

  const onDayClick = (calendarDay) => {
    if (isAdmin) {
      setSelectedDay(calendarDay.day);
    } else {
      setSelectedDay(calendarDay.day);
      setBooking((prev) => ({
        ...prev,
        date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).
          padStart(2, "0")}-${String(calendarDay.day).padStart(2, "0")}`,
      }));
    }
  };

  return (
    <div
      className={`flex flex-col w-full lg:${width} bg-[#131313] p-10 rounded-2xl`}
    >
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

        <div className="grid grid-cols-7 gap-5 md:gap-3 lg:gap-0 p-3">
          {calendar.map((calendarDay, index) => {
            const canClick =
              calendarDay.active || (isAdmin && calendarDay.isCustomized);

            return (
              <div key={index} className="text-center">
                {calendarDay.day === null ? (
                  <div className="w-full lg:p-3 invisible">0</div>
                ) : (
                  <button
                    disabled={!canClick}
                    type="button"
                    onClick={() => onDayClick(calendarDay)}
                    className={`
            w-full h-full flex items-center justify-center rounded-xl transition lg:p-3
            ${
              canClick
                ? "cursor-pointer hover:bg-[#2A2A2A]"
                : "opacity-30 cursor-not-allowed"
            }

            ${
              calendarDay.day === selectedDay
                ? "bg-amber-400 text-black font-semibold"
                : ""
            }
             ${
               isAdmin && calendarDay.isCustomized
                 ? "border border-amber-300 text-amber-300"
                 : ""
             }

          `}
                  >
                    {calendarDay.day}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
