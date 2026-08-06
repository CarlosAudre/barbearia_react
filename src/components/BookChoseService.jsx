import { BookingServiceCard } from "./BookingServiceCard";

export function BookChoseService({ services }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center text-center items-center gap-2">
        <p className="text-amber-300 font-montserrat text-sm">ETAPA 1</p>
        <h1 className="  text-2xl">ESCOLHA OS SERVIÇOS</h1>
        <p className="text-gray-300/80 ">
          Selecione um ou mais serviços que deseja agendar.
        </p>
      </div>

      {/* Cards de serviços */}
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-3 w-full md:w-3xl">
        {services.map((s) => (
          <BookingServiceCard
            key={s.id}
            title={s.name}
            description={s.description}
            value={s.value}
            duration={s.duration}
          />
        ))}
      </div>
    </div>
  );
}
