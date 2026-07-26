import {
  ChevronLeft,
  ChevronRight,
  Power,
  Clock,
  X,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import { generateCalendar } from "../../utils/generateCalendar";
import { months } from "../../constants/months";
import { days } from "../../constants/days";
import { Button } from "../../components/Button";
import { HoursCard } from "../../components/HoursCard";
export function Availability() {
  const hours = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarTitle, setCalendarTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

  //Gets the number of days in a month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  const currentDay = currentDate.getDate();

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  async function getMonthName(date) {
    const month = months.find((m) => m.id === date.getMonth() + 1);
    return month.name + " " + date.getFullYear();
  }

  useEffect(() => {
    const title = getMonthName(currentDate);
    setCalendarTitle(title);
  });

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

  const selectedDate = selectedDay
    ? new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay)
    : null;

  const selectedWeekDay = selectedDate ? days[selectedDate.getDay()].name : "";
  {
    /*OBS getDay() = getWeekDay, getDate() = getDay */
  }

  //Calendar Array
  const calendarDays = generateCalendar(currentDate);

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

      <main className="flex flex-col mt-10">
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
                {calendarDays.map((day, index) => (
                  <div key={index} className="text-center">
                    <button
                      onClick={() => setSelectedDay(day)}
                      className={`w-full h-full flex items-center justify-center transition cursor-pointer  lg:p-3 rounded-xl                  
                        ${day !== selectedDay && "hover:bg-[#2A2A2A]"}
                        ${day === selectedDay && selectedDay !== null && "bg-amber-400 text-black font-semibold"}  
                       `}
                    >
                      {day}
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col md:flex-row w-full gap-5 mt-8 text-sm ">
                  <div className="flex gap-2 items-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"/>
                      <p>Dia ativo</p>
                  </div>

                  <div className="flex gap-2 items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500"/>
                      <p>Dia inativo/fechado</p>
                  </div>

                  <div className="flex gap-2 items-center">
                      <div className="w-3 h-3  bg-amber-500"/>
                      <p>Dia inativo/fechado (permanente)</p>
                  </div>
              </div>
            </div>
          </div>

          {/* business hours*/}
          <div className="flex flex-col w-full lg:w-1/2 bg-[#131313] p-10 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-3 mb-3 justify-between items-center">
              <h1 className="text-amber-300 font-montserrat">
                DIA SELECIONADO
              </h1>

              <div className="flex gap-3 p-3 border border-amber-50/50 rounded-full items-center text-gray-400 cursor-pointer">
                <Power className="w-5 h-5" />
                <p>Dia inativo</p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="font-playfair text-2xl">
                {selectedWeekDay}, {calendarTitle}
              </h1>

              <div className="w-full bg-linear-to-r from-amber-300/10 via-amber-300/60 to bg-amber-300/10 h-px rounded-2xl" />
            </div>
            <div className="flex justify-between mt-10 text-gray-300/80 ">
              <div className="flex gap-2 items-center">
                <Clock className="text-amber-300 w-5 h-5" />
                <p className="font-montserrat">HORÁRIOS</p>
              </div>
              <p>0 selecionados</p>
            </div>
            {/* Hours */}
            <div className="flex w-full justify-center items-center text-gray-300/80 mt-5 mb-5">
              {hours !== "" ? (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3 p-3">
                  {hours.map((h) => (
                    <HoursCard hour={h} />
                  ))}
                </div>
              ) : (
                <p>Ative o dia para definir os horários de atendimento</p>
              )}
            </div>

            <div className="flex flex-col w-full mt-auto gap-3">
              <div className="flex flex-col md:flex-row w-full text-gray-300 gap-2 ">
                <button
                  className="flex p-2 w-full md:w-1/2 border border-gray-300/40 hover:border-gray-300  hover:text-white font-semibold
                rounded-full justify-center cursor-pointer items-center gap-2"
                >
                  <Check className="text-amber-300" />
                  <p>Selecionar todos</p>
                </button>

                <button
                  className="flex p-2 w-full md:w-1/2 border border-gray-300/40 hover:border-gray-300 hover:text-white font-semibold
                 rounded-full justify-center  cursor-pointer  items-center gap-2"
                >
                  <X className="text-amber-300" />
                  <p>Limpar Seleção</p>
                </button>
              </div>
              <div className="flex flex-col gap-3 mb-2 mt-2">
                <p className="font-semibold">Adicionar horário personalizado</p>
                <div className="flex gap-10">
                  <input
                    className="border border-gray-300/30 w-5/2 rounded-md p-2"
                    type="text"
                    placeholder="07:00"
                  ></input>
                  <Button
                    title="Adicionar"
                    rounded="rounded-md"
                    bg="bg-amber-300/50"
                  />
                </div>
              </div>
              <Button title="Salvar disponibilidade" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
