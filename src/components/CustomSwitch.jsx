// CustomSwitch.jsx
export default function CustomSwitch({
  checked,
  onChange,
  activeColor = "bg-yellow-400",
  inactiveColor = "bg-zinc-700",
}) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!checked)}
      className={`
        relative w-13 h-6.5 rounded-full
        transition-all duration-300 cursor-pointer
        ${checked ? activeColor : inactiveColor}
      `}
    >
      <span
        className={`
          absolute top-1 left-1
          w-4.5 h-4.5 rounded-full bg-white
          shadow-md
          transition-transform duration-300
          ${checked ? "translate-x-6" : ""}
        `}
      />
    </button>
  );
}
