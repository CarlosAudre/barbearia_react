import { useEffect, useState } from "react";
import { Sunrise, Sun, Moon } from "lucide-react";
import { authFetch } from "../utils/authFetch";
import { HoursCard } from "../components/HoursCard";
import { formatTime } from "../utils/formatTime";

export function BookChoseTime({ setBooking, booking }) {
  const [availableTime, setAvailableTime] = useState([]);

  const duration = booking.services.reduce(
    (total, service) => total + service.duration,
    0,
  );

  useEffect(() => {
    async function loadSlots() {
      const duration = booking.services.reduce(
        (total, service) => total + service.duration,
        0,
      );

      const response = await authFetch(
        `/appointment/${booking.date}?duration=${duration}`,
      );

      const data = await response.json();
      setAvailableTime(data);
    }

    loadSlots();
  }, [booking.date, booking.services]);

  const onCardClick = (availableTime) => {
    setBooking((prev) => ({
      ...prev,
      startTime: availableTime.startTime,
    }));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center text-center items-center gap-2">
        <p className="text-amber-300 font-montserrat text-sm">ETAPA 3</p>
        <h1 className="  text-2xl">ESCOLHA O HORÁRIO</h1>
        <p className="text-gray-300/80 ">
          Selecione um dos horários disponíveis abaixo.
        </p>
      </div>

      <div className="flex flex-col mt-20 gap-8 ">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <Sunrise className="text-amber-300" />
            <p className="text-gray-300/90">MANHÃ</p>
            <div className="h-px w-full bg-gray-300/10" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {availableTime
              .filter((at) => at.period === "MORNING")
              .map((at) => (
                <HoursCard
                  key={at.startTime}
                  hour={formatTime(at.startTime)}
                  onCardClick={() => onCardClick(at)}
                  selected={booking.startTime === at.startTime}
                />
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <Sun className="text-amber-300" />
            <p className="text-gray-300/90">TARDE</p>
            <div className="h-px w-full bg-gray-300/10" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {availableTime
              .filter((at) => at.period === "AFTERNOON")
              .map((at) => (
                <HoursCard
                  key={at.startTime}
                  hour={formatTime(at.startTime)}
                  onCardClick={() => onCardClick(at)}
                  selected={booking.startTime === at.startTime}
                />
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <Moon className="text-amber-300" />
            <p className="text-gray-300/90">NOITE</p>
            <div className="h-px w-full bg-gray-300/10" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {availableTime
              .filter((at) => at.period === "NIGHT")
              .map((at) => (
                <HoursCard
                  key={at.startTime}
                  hour={formatTime(at.startTime)}
                  onCardClick={() => onCardClick(at)}
                  selected={booking.startTime === at.startTime}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
