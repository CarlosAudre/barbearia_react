import { MoveLeft, Scissors, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingServiceCard } from "../../components/BookingServiceCard";
import { authFetch } from "../../utils/authFetch";
import { Button } from "../../components/Button";
import { BookChoseService } from "../../components/BookChoseService";
import { BookChoseDate } from "../../components/BookChoseDate";
import { BookChoseTime } from "../../components/BookChoseTime";
import { BookClientData } from "../../components/BookClientData";
import { BookSumary } from "../../components/BookSummary";
import { SubmitButton } from "../../components/form/SubmitButton";
import { toast } from "sonner";

export function BookAppointment() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);

  const [booking, setBooking] = useState({
    services: [],
    date: null,
    startTime: null,
    clientName: "",
    clientPhone: "",
    clientEmail: "",
  });

  async function createAppointment(e) {
    e.preventDefault();

    const appointment = {
      clientName: booking.clientName,
      clientPhone: booking.clientPhone,
      clientEmail: booking.clientEmail,
      date: booking.date,
      startTime: booking.startTime,
      scheduledItems: booking.services.map((service) => service.id),
    };

    try {
      const response = await authFetch(`/appointment/create/${booking.date}`, {
        method: "POST",
        body: JSON.stringify(appointment),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        toast.error(data.message);
        return;
      }

      toast.success("Agendamento realizado com sucesso");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  console.log(booking.services);

  const [step, setStep] = useState(1);

  const stepsItems = [
    {
      name: "SERVIÇOS",
      id: 1,
    },
    {
      name: "DATA",
      id: 2,
    },
    {
      name: "HORÁRIOS",
      id: 3,
    },
    {
      name: "DADOS",
      id: 4,
    },
    {
      name: "RESUMO",
      id: 5,
    },
  ];

  const nextStep = () => {
    if (step === 5) {
      return;
    }
    setStep((prev) => prev + 1);
  };

  const previousStep = () => {
    if (step === 1) {
      return;
    }
    setStep((prev) => prev - 1);
  };

  const canContinue =
    step === 1
      ? booking.services.length > 0
      : step === 2
        ? booking.date !== null
        : step === 3
          ? booking.startTime !== null
          : step === 4
            ? booking.clientName !== "" && booking.clientPhone !== ""
            : true;

  useEffect(() => {
    async function getServices() {
      const response = await authFetch("/services");
      const data = await response.json();
      setServices(data);
    }
    getServices();
  }, []);

  return (
    <form
      onSubmit={createAppointment}
      className="flex flex-col items-center justify-center mx-auto w-full p-5 py-10"
    >
      <header className="flex justify-between w-full md:w-3xl">
        <div
          className="flex gap-2 text-gray-300 cursor-pointer hover:text-amber-300"
          onClick={() => navigate("/")}
        >
          <MoveLeft />
          <p>Inicio</p>
        </div>
        <div className="flex gap-1">
          <Scissors className="text-amber-300" />
          <p className="font-montserrat font-semibold">Kingsman</p>
        </div>
      </header>

      <main className="flex flex-col mt-2">
        <div className="flex text-gray-300/80 justify-between  w-full md:w-3xl p-10 md:ml-20 ">
          {stepsItems.map((s) => (
            <div className="flex w-[60px] md:flex-1 text-center items-center">
              <div className="flex flex-col text-center">
                <div
                  className={`flex rounded-full p-2 w-10 h-10 border-2 justify-center items-center shrink-0
                    ${step >= s.id ? "border-amber-300" : "border-gray-300/40"}`}
                >
                  <p
                    className={`${step > s.id && "text-amber-300"} ${step === s.id && "text-white"}`}
                  >
                    {s.id}
                  </p>
                </div>
              </div>
              {step > s.id && step > 1 && step < 6 && (
                <div className="h-1  flex w-full bg-amber-300" />
              )}
            </div>
          ))}
        </div>

        {/* Principal */}
        <div className="w-full p-2 px-3">
          {step === 1 && (
            <BookChoseService
              availableServices={services}
              setBooking={setBooking}
              booking={booking}
            />
          )}
          {step === 2 && <BookChoseDate setBooking={setBooking} />}
          {step === 3 && (
            <BookChoseTime booking={booking} setBooking={setBooking} />
          )}
          {step === 4 && (
            <BookClientData booking={booking} setBooking={setBooking} />
          )}
          {step === 5 && <BookSumary booking={booking} />}
        </div>

        {/* Buttons */}
        <div className="flex mt-8 justify-center gap-2 items-center">
          <div className="w-1/2">
            <Button
              title="Voltar"
              textColor="text-gray-300"
              borderColor="border-gray-300/40"
              bg="bg-[#080808]"
              hoverBg="hover:bg-[#080808]"
              hoverText="hover:text-white"
              handleOnClick={step == 1 ? () => navigate("/") : previousStep}
              type="button"
            />
          </div>
          <div className="w-1/2">
            {step < 5 ? (
              <Button
                title="Continuar"
                type="button"
                handleOnClick={nextStep}
                disabled={!canContinue}
              />
            ) : (
              <SubmitButton
                title="Agendar"
                rounded="rounded-2xl"
                icon={Check}
              />
            )}
          </div>
        </div>
      </main>
    </form>
  );
}
