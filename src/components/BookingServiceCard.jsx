import { Clock } from "lucide-react";
import { useState } from "react";

export function BookingServiceCard({
  title,
  description,
  value,
  duration,
  selected,
  onCardClick,
}) {
  return (
    <div
      className={`flex flex-col bg-[#131313] py-5 px-8 rounded-2xl cursor-pointer
        border ${
          selected
            ? "border-amber-300"
            : "border-gray-300/30 hover:border-gray-300/50"
        }`}
      onClick={onCardClick}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h1 className="text-xl font-playfair font-semibold">{title}</h1>
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      <div className="flex justify-between mt-6">
        <div className="text-gray-400 flex gap-2 items-center">
          <Clock className="w-5 h-5" />
          <p>{duration} min</p>
        </div>
        <p className="text-amber-300 text-lg font-montserrat">R$ {value}</p>
      </div>
    </div>
  );
}
