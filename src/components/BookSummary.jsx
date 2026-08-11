import { formatTime } from "../utils/formatTime";

export function BookSumary({ booking }) {
  const duration = booking.services.reduce(
    (total, service) => total + service.duration,
    0,
  );

  const totalValue = booking.services.reduce(
    (total, service) => total + service.value,
    0,
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center text-center items-center gap-2">
        <p className="text-amber-300 font-montserrat text-sm">ETAPA 5</p>
        <h1 className="  text-2xl">RESUMO DO AGENDAMENTO</h1>
        <p className="text-gray-300/80 ">
          Revise os detalhes antes de confirmar.
        </p>
      </div>

      <div className="flex flex-col mt-5">
        <div className="flex flex-col bg-[#1D1B15] border border-gray-300/15 p-5 gap-2 rounded-t-xl border-b-amber-300/20">
          <p className="text-gray-300/80">CLIENTE</p>
          <p className="text-xl font-semibold">{booking.clientName}</p>
        </div>
        <div className="flex flex-col bg-[#131313] p-5 border gap-2 border-gray-300/15 text-gray-300/80">
          <div className="flex justify-between">
            <p>Serviços</p>
            <p className="font-semibold text-white">
              {booking.services.map((s) => s.name).join(", ")}
            </p>
          </div>

          <div className="flex justify-between">
            <p>Data</p>
            <p className="font-semibold text-white">{booking.date}</p>
          </div>

          <div className="flex justify-between">
            <p>Horário</p>
            <p className="font-semibold text-white">
              {formatTime(booking.startTime)}
            </p>
          </div>

          <div className="flex justify-between">
            <p>Duração total</p>
            <p className="font-semibold text-white">{duration} min</p>
          </div>
        </div>
        <div className="flex justify-between bg-[#0D0D0D] p-5 border border-gray-300/15 rounded-b-xl text-gray-300/80 items-center">
          <p>VALOR TOTAL</p>
          <p className="text-amber-300 font-playfair font-semibold text-3xl">
            R$ {totalValue}
          </p>
        </div>
      </div>
    </div>
  );
}
