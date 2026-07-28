import { useState } from "react";
import CustomSwitch from "./CustomSwitch";
import { WorkSchedulePeriodCard } from "./WorkSchedulePeriodCard";
import { SubmitButton } from "./form/SubmitButton";
import { Plus } from "lucide-react";

export function WorkScheduleCard({ WeekDay }) {
  const [active, setActive] = useState(true);

  return (
    <div className="flex flex-col xl:flex-row gap-4 bg-[#171717] rounded-xl p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 xl:w-72 ">
        <p className="text-lg font-semibold">{WeekDay}</p>

        <div className="flex items-center gap-3">
          <CustomSwitch checked={active} onChange={setActive} />
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
          <WorkSchedulePeriodCard startTime="08:00" endTime="12:00" />

          <WorkSchedulePeriodCard startTime="14:00" endTime="18:00" />
        </div>

        <div className="flex justify-center lg:justify-end">
          <SubmitButton
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
