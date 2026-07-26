import {
  Scissors,
  LayoutDashboard,
  CalendarDays,
  CalendarClock,
  Settings,
  MoveLeft
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function SideBar() {
  const location = useLocation().pathname;

  const navigate = useNavigate();

  const SidebarItens = [
    {
      id: 1,
      name: "Dashboard",
      icon: <LayoutDashboard />,
      location: "/adm/dashboard",
    },
    {
      id: 2,
      name: "Agendamentos",
      icon: <CalendarDays />,
      location: "/adm/appointments",
    },

    {
      id: 3,
      name: "Serviços",
      icon: <Scissors />,
      location: "/adm/services",
    },

    {
      id: 4,
      name: "Disponibilidade",
      icon: <CalendarClock />,
      location: "/adm/availability",
    },

    {
      id: 5,
      name: "Configuração",
      icon: <Settings />,
      location: "/adm/settings",
    },
  ];

  return (
    <div className="flex flex-col gap-30 w-auto bg-[#0A0A0A] h-full py-5 px-7 border border-gray-400/8">
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 items-center">
          <Scissors className="text-amber-300" />
          <h1 className="font-playfair text-xl">Obsidian</h1>
        </div>
        <p className="ml-7 font-montserrat text-gray-400">Painel Admin</p>
      </div>

      <div className="flex flex-col gap-8 text-gray-400 w-[250px]">
        {SidebarItens.map((i) => (
          <div
            className={`cursor-pointer flex gap-3 items-center rounded-2xl p-3 
            ${i.location === location && "bg-amber-300/10 text-amber-300"}`}
            key={i.id}
            onClick={() => navigate(i.location)}
          >
            {i.icon}
            <p>{i.name}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-auto text-gray-400 cursor-pointer hover:text-gray-300">
        <MoveLeft/>
        <p className="">Voltar ao site</p>
      </div>
    </div>
  );
}
