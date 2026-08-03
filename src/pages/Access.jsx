import { TextField } from "../components/TextField";
import LoginImg from "../assets/img/login_img.png";
import LoginImgMobile from "../assets/img/login_img_mobile.png";

import { useLocation } from "react-router-dom";

import {
  UserRound,
  MoveRight,
  EyeOff,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  UserRoundPlus,
  Scissors,
} from "lucide-react";
import { RegisterForm } from "../components/form/RegisterForm";
import { LoginForm } from "../components/form/LoginForm";

export function Access() {
  const location = useLocation().pathname;

  return (
    <div className="relative flex flex-col lg:flex-row w-full min-h-screen p-2 ">
      <img
        src={LoginImgMobile}
        className="lg:hidden absolute inset-0 w-full h-full object-cover"
      />

       <div className="lg:hidden absolute inset-0 bg-black/70" />

      <div className="hidden lg:flex relative w-1/2">
        <img src={LoginImg} className="h-full object-cover" />

        <div className="absolute top-0  flex items-center px-15 py-8 z-20 gap-4 ">
          <Scissors className="w-7 h-7 text-amber-300" />
          <p className="font-montserrat text-4xl text-white">Kingsman</p>
        </div>

        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/30 to-transparent z-10 flex p-15 flex-col justify-center text-white gap-5 ">
          <div className="flex items-center gap-3 bg-black h-8 w-fit rounded-md ">
            <div className="w-15  h-px bg-amber-300" />
            <p className="text-amber-300 text-lg font-montserrat ">
              Barbearia Premium
            </p>
          </div>

          {location === "/register" ? (
            <div className="flex flex-col text-white text-[55px] font-playfair ">
              <p>Faça parte da</p>
              <p className="text-amber-300">experiência</p>
              <p>Obsidian</p>
            </div>
          ) : (
            <div className="flex flex-col  text-white text-[55px] font-playfair ">
              <p>Confiança</p>
              <p>estilo e </p>
              <p className="text-amber-300">excelência</p>
            </div>
          )}

          {location === "/register" ? (
            <div className="flex flex-col gap-1 text-gray-400 text-lg">
              <p>Crie sua conta e tenha acesso</p>
              <p>aos nossos serviços, agendamentos</p>
              <p>e beneficios exclusivos</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 text-gray-400 text-lg">
              <p>Faça login para acessar o sistema</p>
              <p>da barbearia e gerenciar seus </p>
              <p>agendamentos</p>
            </div>
          )}
        </div>
      </div>

      {/*Form*/}
      {location === "/register" ? <RegisterForm /> : <LoginForm />}
    </div>
  );
}
