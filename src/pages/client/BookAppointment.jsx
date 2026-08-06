import { MoveLeft, Scissors } from "lucide-react";
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

export function BookAppointment() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
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

  useEffect(() => {
    async function getServices() {
      const response = await authFetch("/services");
      const data = await response.json();
      setServices(data);
    }
    getServices();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mx-auto w-full p-5 py-10">
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

      <main className="flex flex-col mt-5">
        <div className="flex text-gray-300/80 justify-between  w-full md:w-3xl p-10 ">
          {stepsItems.map((s) => (
            <div className="flex w-[60px] md:flex-1 text-center items-center">
              <div className="flex flex-col text-center">
                <div
                  className={`flex rounded-full p-2 w-10 h-10 border-2 justify-center items-center shrink-0
                    ${step >= s.id ? "border-amber-300" : "border-gray-300/40"}`}
                >
                  <p className={`${step > s.id && "text-amber-300"}`}>{s.id}</p>
                </div>
              </div>
              {step > s.id && step > 1 && step < 6 && (
                <div className="h-1  flex w-full bg-amber-300" />
              )}
            </div>
          ))}
        </div>

        {/* Principal */}
        {step === 1 && <BookChoseService services={services} />}
        {step === 2 && <BookChoseDate />}
        {step === 3 && <BookChoseTime />}
        {step === 4 && <BookClientData />}
        {step === 5 && <BookSumary/>}

        {/* Buttons */}
        <div className="flex mt-10 justify-center gap-2">
          <div className="w-1/2">
            <Button
              title="Voltar"
              textColor="text-gray-300"
              borderColor="border-gray-300/40"
              bg="bg-[#080808]"
              hoverBg="hover:bg-[#080808]"
              hoverText="hover:text-white"
              handleOnClick={previousStep}
            />
          </div>
          <div className="w-1/2">
            <Button title="Continuar" handleOnClick={nextStep} />
          </div>
        </div>
      </main>
    </div>
  );
}
