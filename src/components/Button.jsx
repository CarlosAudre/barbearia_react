export function Button({
  title,
  handleOnClick,
  icon: Icon,
  bg = "bg-[#D4AF37]",
  hoverBg = "hover:bg-amber-300",
  textColor = "text-black",
  hoverText,
  rounded = "rounded-2xl"
}) {
  return (
    <button
      className={`flex gap-1 p-2 md:px-5 ${rounded} ${bg} ${hoverText} ${hoverBg}  items-center ${textColor} font-semibold cursor-pointer w-full 
      items-center justify-center`}
      onClick={handleOnClick}
    >
      {Icon && <Icon className={`w-5 h-5`} />}
      <p>{title}</p>
    </button>
  );
}
