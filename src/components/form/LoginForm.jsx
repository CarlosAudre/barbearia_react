import { SubmitButton } from "../SubmitButton";
import { TextField } from "../TextField";
import {
  UserRound,
  MoveRight,
  EyeOff,
  Mail,
  LockKeyhole,
  Eye,
  Scissors,
} from "lucide-react";

export function LoginForm() {
  return (
    <div className="relative z-10 flex flex-col gap-8 w-full lg:w-1/2 p-10 my-5 border border-gray-700/50 rounded-md bg-[#08080890] md:mt-20 lg:mt-0">
      <div className="flex flex-col gap-2 justify-center items-center text-white md:mt-20 lg:mt-20">
        <div className="rounded-full border-2 w-fit border-amber-300 p-4">
          <Scissors className="text-amber-300 w-8 h-8" />
        </div>
        <h1 className="text-3xl">
          Bem vindo de <span className="text-amber-300">volta</span>
        </h1>
        <p className="text-gray-400 text-center">
          Entre com suas credenciais para continuar
        </p>
      </div>
      <div className="flex flex-col gap-8 justify-center items-center w-full xl:mx-auto xl:w-xl ">
        
        <TextField
          title="Email"
          placeholder="Digite seu e-mail"
          type="email"
          icon1={Mail}
        />  
        <TextField
          title="Senha"
          placeholder="Digite sua senha"
          type="password"
          icon1={LockKeyhole}
          icon2={EyeOff}
          icon3={Eye}
        />
        <SubmitButton title="Cadastrar" icon={MoveRight} />
        <div className="flex text-white gap-2 justify-center items-center">
          <p>Não tem uma conta?</p>
          <a className="text-amber-300" href="/register">
            Crie sua conta
          </a>
        </div>
      </div>
    </div>
  );
}
