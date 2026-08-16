import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { AppointmentCard } from "../../components/AppointmentCard";
import { authFetch } from "../../utils/authFetch";
import { formatTime } from "../../utils/formatTime";
import { days } from "../../constants/days";
import { months } from "../../constants/months";
import { useRef } from "react";
import { AlertMessage } from "../../components/AlertMessage";
import { toast } from "sonner";

export function Appointment() {
  const type = [
    { name: "Todos", id: 1 },
    { name: "Confirmados", id: 2 },
    { name: "Concluidos", id: 3 },
    { name: "Cancelados", id: 4 },
  ];

  const statusEnumTransform = [
    { enum: "SCHEDULED", name: "Confirmado" },
    { enum: "COMPLETED", name: "Finalizado" },
    { enum: "CANCELED", name: "Cancelado" },
  ];

  const [dateTitle, setDateTitle] = useState("");

  const [search, setSearch] = useState("");

  const services = ["Cabelo", "Barba"];
  const [typeOption, setTypeOption] = useState(1);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  const [completeAppointmentAlert, setCompleteAppointmentAlert] =
    useState(false);

  const [cancelAppointmentAlert, setCancelAppointmentAlert] = useState(false);

  const dateInputRef = useRef(null);

  const [appointmentClickedId, setAppointmentClickedId] = useState("");

  const nextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const previousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + -1);
    setCurrentDate(newDate);
  };

  useEffect(() => {
    async function getAllAppointmentsOfDay() {
      const date = currentDate.toLocaleDateString("en-CA");
      console.log(date);
      try {
        const response = await authFetch(`/adm/appointment/${date}`);
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllAppointmentsOfDay();
  }, [currentDate]);

  useEffect(() => {
    const weekDay = days.find((d) => d.id === currentDate.getDay() + 1);
    const month = months.find((m) => m.id === currentDate.getMonth() + 1);
    setDateTitle(
      weekDay.name + ", " + currentDate.getDate() + " de " + month.name,
    );
  }, [currentDate]);

  async function completeAppointment(id) {
    try {
      const response = await authFetch(`/adm/appointment/${id}/complete`, {
        method: "PATCH",
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        toast.error(data.message);
        return false;
      }

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async function cancelAppointment(id) {
    try {
      const response = await authFetch(`/adm/appointment/${id}/cancel`, {
        method: "PATCH",
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        toast.error(data.message);
        return false;
      }

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async function handleCompleteAppointment(e, id) {
    e.preventDefault();
    const success = await completeAppointment(id);

    if (!success) return;

    setAppointments((appointments) =>
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "COMPLETED" }
          : appointment,
      ),
    );
    setCompleteAppointmentAlert(false);
  }

  async function handleCancelAppointment(e, id) {
    e.preventDefault();
    const success = await cancelAppointment(id);

    if (!success) return;

    setAppointments((appointments) =>
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "CANCELED" }
          : appointment,
      ),
    );
    setCancelAppointmentAlert(false);
  }

  return (
    <div className="flex flex-col w-full p-10">
      <header className="flex flex-col gap-10">
        <div className="flex flex-col gap-1 justify-center ">
          <p className="text-amber-300 font-montserrat font-semibold text-lg">
            Gestão
          </p>
          <h1 className="text-4xl font-playfair font-semibold">Agendamentos</h1>
          <p className="text-gray-400">Gerencie todos os agendamentos.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-3">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-6" />

            <input
              type="text"
              placeholder="Buscar por cliente"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300/30 rounded-lg"
            />
          </div>
          <div className="flex gap-3">
            {type.map((t) => (
              <p
                className={`p-2  flex items-center cursor-pointer border rounded-md ${
                  t.id === typeOption
                    ? "bg-amber-300 text-black font-semibold border-amber-300"
                    : "border-gray-300/30 text-gray-400"
                }`}
                onClick={() => setTypeOption(t.id)}
              >
                {t.name}
              </p>
            ))}
          </div>
        </div>
      </header>

      <main className="flex flex-col mt-10 -mx-8 lg:mx-0">
        <div className="bg-[#0F1010] p-10 flex gap-5 xl:gap-0 flex-col xl:flex-row justify-center rounded-lg ">
          <div className="flex flex-col items-center  gap-2 w-full xl:w-3/4">
            <div className="flex items-center justify-center cursor-pointer select-none">
              <ChevronLeft
                className="p-2 h-10 w-10 border border-gray-300/30 rounded-full hover:border-white"
                onClick={previousDay}
              />
              <h2 className="text-lg xl:text-2xl w-80 text-center">
                {dateTitle}
              </h2>
              <ChevronRight
                className="p-2 h-10 w-10 border border-gray-300/30 rounded-full cursor-pointer hover:border-white"
                onClick={nextDay}
              />
            </div>
            <p className="text-gray-400">{appointments.length} agendamentos</p>
          </div>

          <div className="flex justify-center md:justify-items-start">
            {/*xxx------------------------------------------------------------------------------------ */}
            <div
              className="flex border border-gray-300/30 w-fit h-fit p-3 rounded-2xl gap-3 cursor-pointer hover:border-white select-none"
              onClick={() => dateInputRef.current?.showPicker()}
            >
              <Calendar />
              <input
                ref={dateInputRef}
                type="date"
                value={currentDate.toLocaleDateString("en-CA")}
                onChange={(e) => {
                  const [year, month, day] = e.target.value.split("-");
                  setCurrentDate(new Date(year, month - 1, day));
                }}
              />
            </div>
          </div>
        </div>

        {/* Confirm Choice */}
        {completeAppointmentAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <AlertMessage
              title="Deseja finalizar esse agendamento? Essa operação não poderá ser desfeita"
              handleOnCancel={() =>
                setCompleteAppointmentAlert((prev) => !prev)
              }
              handleOnSubmit={(e) =>
                handleCompleteAppointment(e, appointmentClickedId)
              }
            />
          </div>
        )}

        {cancelAppointmentAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <AlertMessage
              title="Deseja cancelar esse agendamento? Essa operação não poderá ser desfeita"
              handleOnCancel={() => setCancelAppointmentAlert((prev) => !prev)}
              handleOnSubmit={(e) =>
                handleCancelAppointment(e, appointmentClickedId)
              }
            />
          </div>
        )}

        {/* APPOINTMENT CARDS */}
        <div className="mt-10 flex flex-col gap-5 mb-10">
          {appointments
            .filter((app) =>
              app.clientName.toLowerCase().includes(search.toLowerCase()),
            )
            .filter((app) => {
              if (typeOption === 1) return true;
              if (typeOption === 2) return app.status === "SCHEDULED";
              if (typeOption === 3) return app.status === "COMPLETED";
              if (typeOption === 4) return app.status === "CANCELED";

              return true
            })
            .map((app) => (
              <AppointmentCard
                key={app.id}
                time={formatTime(app.startTime)}
                weekDay={app.weekDay}
                clientName={app.clientName}
                clientPhone={app.clientPhone}
                servicesName={app.scheduledItems.map((sh) => sh.name)}
                duration={app.totalTime}
                totalValue={app.totalValue}
                status={
                  statusEnumTransform.find(
                    (status) => status.enum === app.status,
                  )?.name
                }
                onConfirmClick={() => {
                  setAppointmentClickedId(app.id);
                  setCompleteAppointmentAlert((prev) => !prev);
                }}
                onCancelClick={() => {
                  setAppointmentClickedId(app.id);
                  setCancelAppointmentAlert((prev) => !prev);
                }}
              />
            ))}
        </div>
      </main>
    </div>
  );
}
