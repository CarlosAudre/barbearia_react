import { useLocation, useNavigate } from "react-router-dom";

import {
  Scissors,
  LayoutDashboard,
  CalendarDays,
  CalendarClock,
  Settings,
} from "lucide-react";

export function BottomBar() {
  const location = useLocation().pathname;

  const navigate = useNavigate();

  const BottombarItens = [
    {
      id: 1,
      name: "Dashboard",
      icon: <LayoutDashboard className="w-8 h-8" />,
      location: "/adm/dashboard",
    },
    {
      id: 2,
      name: "Agendamentos",
      icon: <CalendarDays className="w-8 h-8" />,
      location: "/adm/appointments",
    },

    {
      id: 3,
      name: "Serviços",
      icon: <Scissors className="w-8 h-8" />,
      location: "/adm/services",
    },

    {
      id: 4,
      name: "Disponibilidade",
      icon: <CalendarClock className="w-8 h-8" />,
      location: "/adm/availability",
    },

    {
      id: 5,
      name: "Configuração",
      icon: <Settings className="w-8 h-8" />,
      location: "/adm/settings",
    },
  ];

  return (
    <div className="flex text-gray-400 bg-[#0A0A0A] border-t border-gray-700 justify-around ">
      {BottombarItens.map((i) => (
        <div
          className={`cursor-pointer flex  gap-1 items-center rounded-full p-3  
            ${i.location === location && "bg-amber-300/10 text-amber-300"}`}
          key={i.id}
          onClick={() => navigate(i.location)}
        >
          {i.icon}
        </div>
      ))}
    </div>
  );
}
