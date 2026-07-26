import { useState } from "react";
import { TextField } from "../TextField";
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
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "./SubmitButton";

export function RegisterForm() {
  //API URL----------------------------------------------------------------------------------------------------------------------------------
  const url = "http://localhost:8081";

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  //handleSubmit()---------------------------------------------------------------------------------------------------------------------------
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      phone.trim() === ""
    ) {
      return toast.error("Preencha todos os campos");
    }

    const nameRegex = /^[A-Za-zÀ-ÿ\s]{4,}$/;
    if (!nameRegex.test(name.trim())) {
      return toast.error(
        "Nome deve ter pelo menos 4 letras e conter apenas letras",
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Email inválido");
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return toast.info(
        "Senha deve ter 8 caracteres, letra, número e especial",
      );
    }

    const phoneRegex = /^(?:\(?\d{2}\)?[\s-]?)?(?:9\d{4}|\d{4})-?\d{4}$/;
    if (!phoneRegex.test(phone)) {
      return toast.error("Telefone inválido");
    }
    try {
      const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error.message);
        return toast.error(error.message ?? "Erro ao fazer login.");
      }
      toast.success("Cadastro realizado com sucesso");
      navigate("/login");
      return;
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <div className="relative z-10 flex flex-col gap-8 w-full lg:w-1/2 p-10 my-5 border border-gray-700/50 rounded-md bg-[#08080890] md:mt-20 lg:mt-0">
      <div className="flex flex-col gap-2 justify-center items-center text-white md:mt-20">
        <div className="rounded-full border-2 w-fit border-amber-300 p-4">
          <UserRoundPlus className="text-amber-300 w-8 h-8" />
        </div>
        <h1 className="text-3xl">
          Crie sua <span className="text-amber-300">conta</span>
        </h1>
        <p className="text-gray-400 text-center">
          Preencha os dados abaixo para se cadastrar
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 justify-center items-center w-full xl:mx-auto xl:w-xl "
      >
        <TextField
          title="Nome"
          placeholder="Digite seu nome completo"
          type="text"
          icon1={UserRound}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          title="Email"
          placeholder="Digite seu e-mail"
          type="email"
          icon1={Mail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          title="Telefone"
          placeholder="(11) 99999-9999"
          type="tel"
          icon1={Phone}
          onChange={(e) => setPhone(e.target.value)}
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
        <SubmitButton title="Cadastrar" icon={MoveRight} />
        <div className="flex text-white gap-2 justify-center items-center">
          <p>Já tem uma conta?</p>
          <a className="text-amber-300" href="/login">
            Fazer Login
          </a>
        </div>
      </form>
    </div>
  );
}
