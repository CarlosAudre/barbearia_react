import { useEffect, useState } from "react";
import CustomSwitch from "./CustomSwitch";
import { WorkSchedulePeriodCard } from "./WorkSchedulePeriodCard";
import { SubmitButton } from "./form/SubmitButton";
import { Plus } from "lucide-react";
import { Button } from "./Button";
import { days } from "../constants/days";
import { NewPeriodTimeForm } from "./form/NewPeriodTimeForm";

export function WorkScheduleCard({
  day,
  onToggle,
  onCreatePeriodTime,
  onDeletePeriodTime,
}) {
  const [weekDay, setWeekDay] = useState();
  const [newPeriodTimeFormVisibility, setNewPeriodTimeFormVisibility] =
    useState(false);

  const dayInfo = days.find((d) => d.enum === day.weekDay);

  return (
    <div className="flex flex-col xl:flex-row gap-4 bg-[#1f1d1d] rounded-xl p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 xl:w-72 ">
        <p className="text-lg font-semibold">{dayInfo.name}</p>

        <div className="flex items-center gap-3">
          <CustomSwitch checked={day.active} onChange={onToggle} />
          <p>Ativo</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full bg-black border border-gray-300/40 rounded-lg p-4">
        <div
          className="
      grid
      grid-cols-1
      lg:grid-cols-2
      gap-3
    "
        >
          {day.workTimes.length > 0 &&
            day.workTimes.map((period, index) => (
              <WorkSchedulePeriodCard
                weekDay={day.weekDay}
                key={`${period.startTime}-${period.endTime}`}
                startTime={period.startTime}
                endTime={period.endTime}
                onTrashClick={onDeletePeriodTime}
              />
            ))}
        </div>

        {newPeriodTimeFormVisibility && (
          <NewPeriodTimeForm
            weekDay={day.weekDay}
            onCancel={() => setNewPeriodTimeFormVisibility((prev) => !prev)}
            onConfirm={(startTime, endTime) =>
              onCreatePeriodTime(day.weekDay, startTime, endTime)
            }
          />
        )}

        <div className="flex justify-center lg:justify-end">
          <Button
            handleOnClick={() =>
              setNewPeriodTimeFormVisibility((prev) => !prev)
            }
            type="button"
            title="Adicionar período"
            icon={Plus}
            hoverText="hover:text-black"
            bg="bg-black"
            borderColor="border-amber-300"
            textColor="text-amber-300"
          />
        </div>
      </div>
    </div>
  );
}
