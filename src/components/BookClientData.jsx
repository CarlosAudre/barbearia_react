import { TextField } from "./TextField";

export function BookClientData({ booking, setBooking }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center text-center items-center gap-2">
        <p className="text-amber-300 font-montserrat text-sm">ETAPA 4</p>
        <h1 className="  text-2xl">SEUS DADOS</h1>
        <p className="text-gray-300/80 ">Preencha seus dados abaixo.</p>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <TextField
          title="NOME *"
          titleColor="text-amber-300"
          placeholder="Seu nome completo"
          value={booking.clientName}
          onChange={(e) =>
            setBooking((prev) => ({ ...prev, clientName: e.target.value }))
          }
        />

        <TextField
          title="TELEFONE *"
          titleColor="text-amber-300"
          placeholder="(00) 00000-0000"
          type="tel"
          value={booking.clientPhone}
          onChange={(e) =>
            setBooking((prev) => ({ ...prev, clientPhone: e.target.value }))
          }
        />

        <TextField
          title="E-MAIL (OPCIONAL)"
          titleColor="text-amber-300"
          placeholder="seu@email.com"
          type="mail"
          required={false}
          value={booking.clientEmail}
          onChange={(e) =>
            setBooking((prev) => ({ ...prev, clientEmail: e.target.value }))
          }
        />
      </div>
    </div>
  );
}
