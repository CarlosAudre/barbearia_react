export function SubmitButton({
  title,
  icon: Icon,
  bg,
  textColor,
  hoverBgColor,
  borderColor,
  hoverText,
  onClick,
  type = "submit",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex justify-center items-center ${bg ? bg : "bg-[#D4AF37]"} border ${borderColor ? borderColor : ""} rounded-md w-full gap-2 p-2 cursor-pointer
       ${hoverBgColor ? hoverBgColor : "hover:bg-amber-300"}  ${textColor ? textColor : "text-black"} ${hoverText ? hoverText : ""}`}
    >
      <span
        className={`font-semibold text-lg `}
      >
        {title}
      </span>

      {Icon && <Icon size={18} />}
    </button>
  );
}
