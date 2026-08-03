import { MoveLeft, Scissors } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingServiceCard } from "../../components/BookingServiceCard";
import { authFetch } from "../../utils/authFetch";
import { Button } from "../../components/Button";

export function BookAppointment() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);

  const steps = [
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

  useEffect(() => {
    async function getServices() {
      const response = await authFetch("/services");
      const data = await response.json();
      setServices(data);
      console.log(data);
    }
    getServices();
  }, []);

  console.log(services);

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
        <div className="flex text-gray-300/80 justify-between  w-full md:w-3xl p-10">
          {steps.map((s) => (
            <div className="flex flex-col gap-1 items-center">
              <div className="flex rounded-full p-2 w-10 h-10 border justify-center items-center border-gray-300/40">
                <p cl>{s.id}</p>
              </div>
              <p className="text-[13px]">{s.name}</p>
            </div>
          ))}
        </div>

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

        <div className="flex mt-10 justify-center gap-2">
          <div className="w-1/2">
            <Button
              title="Voltar"
              textColor="text-gray-300"
              borderColor="border-gray-300/40"
              bg="bg-[#080808]"
              hoverBg="hover:bg-[#080808]"
              hoverText="hover:text-white"
            />
          </div>
          <div className="w-1/2">
            <Button title="Continuar" />
          </div>
        </div>
      </main>
    </div>
  );
}
