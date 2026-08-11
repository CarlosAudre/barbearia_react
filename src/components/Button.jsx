export function Button({
  type,
  title,
  handleOnClick,
  icon: Icon,
  bg = "bg-[#D4AF37]",
  hoverBg = "hover:bg-amber-300",
  textColor = "text-black",
  hoverText,
  rounded = "rounded-2xl",
  borderColor,
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`flex gap-1 p-2 md:px-5 ${rounded} ${bg} ${hoverText} ${hoverBg}
        border items-center ${textColor} ${borderColor}
        font-semibold cursor-pointer w-full justify-center
        disabled:opacity-40 disabled:cursor-not-allowed`}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {title}
    </button>
  );
}
