import { use, useEffect, useState } from "react";
import { SubmitButton } from "./form/SubmitButton";
import { WorkScheduleCard } from "./WorkScheduleCard";
import { authFetch } from "../utils/authFetch";
import { days } from "../constants/days";
import { toast } from "sonner";
import { NewPeriodTimeForm } from "./form/NewPeriodTimeForm";

export function WorkSchedule() {
  const [workDays, setWorkDays] = useState(
    days.map((day) => ({
      weekDay: day.enum,
      active: true,
      workTimes: [],
    })),
  );

  function handleToggle(weekDay) {
    setWorkDays((prev) =>
      prev.map((day) =>
        day.weekDay === weekDay ? { ...day, active: !day.active } : day,
      ),
    );
  }

  function createPeriodTime(weekDay, startTime, endTime) {
    setWorkDays((prev) =>
      prev.map((day) =>
        day.weekDay === weekDay
          ? {
              ...day,
              workTimes: [
                ...day.workTimes,
                {
                  startTime,
                  endTime,
                },
              ],
            }
          : day,
      ),
    );
  }

  function deletePeriodTime(weekDay, startTime, endTime) {
    console.log(startTime, endTime);

    setWorkDays((prev) =>
      prev.map((day) => {
        if (day.weekDay !== weekDay) return day;

        console.log(day.workTimes);

        return {
          ...day,
          workTimes: day.workTimes.filter((time) => {
            console.log(time.startTime, startTime);
            return !(time.startTime === startTime && time.endTime === endTime);
          }),
        };
      }),
    );
  }

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

  async function updateWeeklySchedule(e) {
    e.preventDefault();
    try {
      const response = await authFetch("/schedule/update", {
        method: "PUT",
        body: JSON.stringify({ workDays }),
      });
      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        toast.error(data.message);
        return;
      }
      toast.success("Horário da semana atualizado com sucesso");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={updateWeeklySchedule}
      className="relative flex flex-col w-full bg-[#131313] p-5 md:p-8 lg:p-10 rounded-2xl"
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-playfair text-xl md:text-2xl">
          Horário padrão semanal
        </h1>

        <p className="text-gray-300 text-sm md:text-base">
          Defina seus horários de atendimento para cada dia da semana.
        </p>
      </div>

      <div className="mt-6 space-y-4 mb-3">
        {workDays.map((day) => (
          <WorkScheduleCard
            key={day.weekDay}
            day={day}
            onToggle={() => handleToggle(day.weekDay)}
            onCreatePeriodTime={createPeriodTime}
            onDeletePeriodTime={deletePeriodTime}
          />
        ))}
      </div>

      <SubmitButton title="Salvar horário padrão" />
    </form>
  );
}
