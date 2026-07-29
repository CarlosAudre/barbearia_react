import { Clock, Trash } from "lucide-react";
import { formatTime } from "../utils/formatTime";

export function WorkSchedulePeriodCard({
  startTime,
  endTime,
  onTrashClick,
  weekDay,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-3
        border
        border-gray-300/40
        rounded-md
        p-3
        min-h-14
      "
    >
      <Clock className="text-amber-300 shrink-0" />

      <div className="flex items-center justify-center gap-3 flex-1">
        <p>{formatTime(startTime)}</p>

        <div className="w-1 h-1 rounded-full bg-white" />

        <p>{formatTime(endTime)}</p>
      </div>

      <Trash
        onClick={() => {
          console.log("cliquei?")
          onTrashClick(weekDay, startTime, endTime);
        }}
        className="w-5 h-5 shrink-0 cursor-pointer hover:text-amber-300 transition-colors"
      />
    </div>
  );
}
