import { Clock, Trash } from "lucide-react";

export function WorkSchedulePeriodCard({ startTime, endTime }) {
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
        <p>{startTime}</p>

        <div className="w-1 h-1 rounded-full bg-white" />

        <p>{endTime}</p>
      </div>

      <Trash className="w-5 h-5 shrink-0 cursor-pointer hover:text-white transition-colors" />
    </div>
  );
}
