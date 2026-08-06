import { ChevronLeft, ChevronRight } from "lucide-react";
import { days } from "../constants/days";
import { generateCalendar } from "../utils/generateCalendar";


export function Calendar({ currentDate, calendarTitle, workDays, selectedDay, setSelectedDay, width = "w-1/2"}) {
    
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

    const workDay = workDays.find((wd) => wd.weekDay === days[weekDay].enum);

    return {
      day,
      active: workDay?.active ?? false,
    };
  });

  return (
    <div className={`flex flex-col w-full lg:${width} bg-[#131313] p-10 rounded-2xl`}>
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
  );
}
