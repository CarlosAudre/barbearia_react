import { TextField } from "../TextField";
import { SubmitButton } from "./SubmitButton";

export function NewServiceForm({
  title,
  handleOnSubmit,
  handleOnCancel,
  nameOnChange,
  descriptionOnChange,
  valueOnChange,
  durationOnChange,
  activeOnChange,
  nameValue,
  descriptionValue,
  priceValue,
  durationValue,
  activeValue
}) {
  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col bg-[#111111] p-10 rounded-2xl w-sm md:w-lg gap-5 font-playfair "
    >
      <h1 className="text-2xl">{title}</h1>
      <TextField
        title="Nome *"
        placeholder="Corte de cabelo"
        type="text"
        titleColor=" text-amber-300"
        titleSize="text-lg"
        font="font-montserrat "
        value={nameValue}
        onChange={nameOnChange}
      />

      <TextField
        title="Descrição"
        placeholder="Descrição do serviço"
        type="text"
        titleColor=" text-amber-300"
        titleSize="text-lg"
        font="font-montserrat "
        value={descriptionValue}
        onChange={descriptionOnChange}
      />

      <div className="flex gap-5">
        <TextField
          title="Preço *"
          placeholder="30"
          type="number"
          titleColor=" text-amber-300"
          titleSize="text-lg"
          font="font-montserrat"
          value={priceValue}
          onChange={valueOnChange}
        />
        <TextField
          title="Duração (min) *"
          placeholder="50 "
          type="number"
          titleColor=" text-amber-300"
          titleSize="text-lg"
          font="font-montserrat"
          value={durationValue}
          onChange={durationOnChange}
        />
      </div>

      <div className="flex gap-3">
        <input type="checkbox" checked={activeValue} onChange={activeOnChange} />
        <p className="font-semibold">Serviço ativo</p>
      </div>

      <div className="flex gap-3">
        <SubmitButton
          title="Cancelar"
          bg="#111111"
          textColor="text-white"
          hoverBgColor="hover:bg-gray-700"
          borderColor="border-gray-700"
          onClick={handleOnCancel}
        />
        <SubmitButton title="Salvar" />
      </div>
    </form>
  );
}
