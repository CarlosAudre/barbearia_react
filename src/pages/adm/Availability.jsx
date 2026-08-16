import {
  ChevronLeft,
  ChevronRight,
  Power,
  Clock,
  X,
  Check,
  CalendarDays,
} from "lucide-react";
import { useEffect, useState } from "react";
import { generateCalendar } from "../../utils/generateCalendar";
import { months } from "../../constants/months";
import { days } from "../../constants/days";
import { Button } from "../../components/Button";
import { HoursCard } from "../../components/HoursCard";
import { WorkSchedule } from "../../components/WorkSchedule";
import { WorkScheduleCustom } from "../../components/WorkScheduleCustom";
export function Availability() {
  const [calendarTabSwitch, setCalendarTabSwitch] = useState(true);

  return (
    <div className="flex flex-col w-full p-10">
      <header className="flex flex-col">
        <p className="text-amber-300 font-montserrat text-lg font-semibold">
          Agenda
        </p>
        <h1 className="font-playfair font-semibold text-4xl">
          Disponibilidade
        </h1>
        <p className="text-gray-400 mt-2">
          Defina os dias e horários disponíveis
        </p>
      </header>

      <main className="flex flex-col mt-10 -mx-5 lg:mx-0">
        <div className="flex w-screen md:w-full mb-5">
          <button
            className={`flex border-b-2 w-full md:w-auto  items-center justify-center ${calendarTabSwitch ? "text-amber-400 font-semibold border-amber-400" : "text-gray-300 border-gray-300/20"}
           gap-3 p-3 cursor-pointer`}
            onClick={() => setCalendarTabSwitch(true)}
          >
            <CalendarDays />
            <p>Exceções</p>
          </button>

          <button
            className={`flex border-b-2 w-full  md:w-auto items-center justify-center ${!calendarTabSwitch ? "text-amber-400 font-semibold border-amber-400" : "text-gray-300 border-gray-300/20"}
            gap-3 p-3 cursor-pointer`}
            onClick={() => setCalendarTabSwitch(false)}
          >
            <CalendarDays />
            <p>Horário padrão</p>
          </button>
        </div>
        {/* SWITCH OPTIONS */}
        {calendarTabSwitch ? <WorkScheduleCustom /> : <WorkSchedule />}
      </main>
    </div>
  );
}
