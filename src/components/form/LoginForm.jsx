import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SubmitButton } from "./SubmitButton";

export function LoginForm() {
  //API URL----------------------------------------------------------------------------------------------------------------------------------
  const url = "http://localhost:8081";

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error.message);
       return toast.error(error.message ?? "Erro ao fazer login.");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/")
      return;
    } catch (err) {
      console.log(err);
      toast.error("Erro ao fazer login.");
    }
  }

  return (
    <div className="relative z-10 flex flex-col gap-8 w-full lg:w-1/2 p-10 my-5 border border-gray-700/50 rounded-md bg-[#08080890] md:mt-20 lg:mt-0">
      <div className="flex flex-col gap-2 justify-center items-center text-white md:mt-20">
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 justify-center items-center w-full xl:mx-auto xl:w-xl ">
        <TextField
          title="Email"
          placeholder="Digite seu e-mail"
          type="email"
          icon1={Mail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          title="Senha"
          placeholder="Digite sua senha"
          type="password"
          icon1={LockKeyhole}
          icon2={EyeOff}
          icon3={Eye}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton title="Entrar" icon={MoveRight} />
        <div className="flex text-white gap-2 justify-center items-center">
          <p>Não tem uma conta?</p>
          <a className="text-amber-300" href="/register">
            Crie sua conta
          </a>
        </div>
      </form>
    </div>
  );
}
