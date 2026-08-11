import { Clock, Pencil, Power, Trash2 } from "lucide-react";
import { Button } from "./Button";
import { useState } from "react";

export function ServiceCard({
  title,
  description,
  value,
  duration,
  active,
  onEditClick,
  onTrashClick,
}) {
 

  return (
    <div
      className="flex flex-col bg-[#131313] py-10 px-8 rounded-2xl border"
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h1 className="text-xl font-playfair font-semibold">{title}</h1>
          <p
            className={`border font-montserrat  px-2 py-1 rounded-2xl ${active ? "text-amber-300 bg-black border-amber-300/50" : ""}`}
          >
            {active ? "Ativo" : "inativo"}
          </p>
        </div>
        <p className="text-gray-400">{description}</p>
      </div>

      <div className="flex justify-between mt-6">
        <div className="text-gray-400 flex gap-2 items-center">
          <Clock className="w-5 h-5" />
          <p>{duration} min</p>
        </div>
        <p className="text-amber-300 text-xl font-montserrat">R$ {value}</p>
      </div>

      <div className="flex items-cente justify-between gap-5 w-full mt-6">
        <div className="w-full">
          <Button
            handleOnClick={onEditClick}
            title="Editar"
            bg="bg-[#1F1F1F]"
            textColor="text-white"
            hoverBg="hover:bg-[#2A2A2A]"
            icon={Pencil}
          />
        </div>

        <div
          className="bg-red-900/20 p-2 rounded-2xl hover:bg-red-500/20 text-red-400 cursor-pointer "
          onClick={onTrashClick}
        >
          <Trash2 className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
