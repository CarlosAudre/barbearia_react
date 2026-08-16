import { Clock, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { days } from "../constants/days";

export function AppointmentCard({
  time,
  weekDay,
  clientName,
  clientPhone,
  servicesName,
  duration,
  totalValue,
  status,
  onConfirmClick,
  onCancelClick,
}) {
  const weekDayFormated = days.find((d) => d.enum === weekDay).name;

  const statusColors = {
    Confirmado: "bg-amber-300/20 text-amber-300",
    Finalizado: "bg-green-800/30 text-emerald-400",
    Cancelado: "bg-red-800/30 text-red-400",
  };

  return (
    <div className="flex w-full mx-auto gap-5  bg-[#0F1010] p-3 rounded-lg">
      <div className="flex flex-col gap-1 w-20 justify-center items-center">
        <p className="text-amber-300 font-montserrat text-xl">{time}</p>
        <p className="text-gray-400">{weekDayFormated}</p>
      </div>

      <div className="h-10px bg-gray-300/20 mx-5 md:mx-10 w-px " />

      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">{clientName}</p>
          <p className="text-gray-400">{clientPhone}</p>
        </div>
        <div className="flex text-gray-400">
          <p>{servicesName.join(", ")}</p>
        </div>
        <div className="flex text-gray-400 gap-2">
          <Clock />
          <p>{duration} min</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-2 md:gap-5 md:ml-auto md:items-center lg:mr-10">
        <p
          className={`flex p-2 h-fit ${statusColors[status]} rounded-lg font-semibold`}
        >
          {status}
        </p>

        {status === "Confirmado" && (
          <div className="flex justify-between md:gap-5">
            <Check
              className="bg-green-800/80 rounded-full p-2 w-9 h-9 cursor-pointer hover:bg-green-700"
              onClick={onConfirmClick}
            />
            <X
              className="bg-red-800/80 rounded-full p-2 w-9 h-9 cursor-pointer hover:bg-red-700"
              onClick={onCancelClick}
            />
          </div>
        )}

        <p className="text-amber-300 font-montserrat text-xl flex justify-center">
          R$ {totalValue}
        </p>
      </div>
    </div>
  );
}
