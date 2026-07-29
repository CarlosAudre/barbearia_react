import { useState } from "react";
import { TextField } from "../TextField";
import { Button } from "../Button";

export function NewPeriodTimeForm({ onCancel, onConfirm }) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  function handleConfirm() {
    if (!startTime || !endTime) return;

    onConfirm(startTime, endTime);

    setStartTime("");
    setEndTime("");
  }

  return (
    <div className="flex flex-col gap-6 bg-[#111111] border border-gray-300/20 rounded-xl p-5">
      <h2 className="text-lg font-semibold font-playfair">
        Adicionar período
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          title="Horário de início"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required={false}
        />

        <TextField
          title="Horário de fim"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required={false}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          title="Cancelar"
          bg="bg-transparent"
          borderColor="border-gray-500"
          textColor="text-gray-300"
          handleOnClick={onCancel}
        />

        <Button
          type="button"
          title="Adicionar"
          bg="bg-amber-300"
          textColor="text-black"
          handleOnClick={handleConfirm}
        />
      </div>
    </div>
  );
}