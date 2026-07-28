import { SubmitButton } from "./form/SubmitButton";
import { WorkScheduleCard } from "./WorkScheduleCard";

export function WorkSchedule() {
  return (
    <form className="flex flex-col w-full bg-[#131313] p-5 md:p-8 lg:p-10 rounded-2xl">
      <div className="flex flex-col gap-2">
        <h1 className="font-playfair text-xl md:text-2xl">
          Horário padrão semanal
        </h1>

        <p className="text-gray-300 text-sm md:text-base">
          Defina seus horários de atendimento para cada dia da semana.
        </p>
      </div>

      <div className="mt-6 space-y-4 mb-3">
        <WorkScheduleCard WeekDay="Segunda-feira" />
        <WorkScheduleCard WeekDay="Terça-feira" />
        <WorkScheduleCard WeekDay="Quarta-feira" />
        <WorkScheduleCard WeekDay="Quinta-feira" />
        <WorkScheduleCard WeekDay="Sexta-feira" />
        <WorkScheduleCard WeekDay="Sábado" />
        <WorkScheduleCard WeekDay="Domingo" />
      </div>

      <SubmitButton title="Salvar horário padrão"/>
    </form>
  );
}
