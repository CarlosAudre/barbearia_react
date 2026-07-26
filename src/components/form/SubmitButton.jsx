export function SubmitButton({
  title,
  icon: Icon,
  bg,
  textColor,
  hoverBgColor,
  borderColor,
  onClick,
  type = "submit",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex justify-center items-center ${bg ? bg : "bg-[#D4AF37]"} border ${borderColor ? borderColor : ""} rounded-md w-full gap-2 p-2 cursor-pointer
       ${hoverBgColor ? hoverBgColor : "hover:bg-amber-300"} text-black`}
    >
      <span
        className={`text-black font-semibold text-lg ${textColor ? textColor : "text-black"}`}
      >
        {title}
      </span>

      {Icon && <Icon size={18} />}
    </button>
  );
}
