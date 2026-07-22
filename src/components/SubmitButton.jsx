export function SubmitButton({ title, icon: Icon }) {
  return (
    <button
      type="submit"
      className="flex justify-center items-center bg-[#D4AF37] rounded-md w-full gap-2 p-2 cursor-pointer hover:bg-amber-300"
    >
      <span className="text-black font-semibold text-lg">{title}</span>

      <Icon size={18} />
     
    </button>
  );
}
