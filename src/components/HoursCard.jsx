export function HoursCard({ hour, onCardClick, selected }) {
  return (
    <button
      type="button"
      onClick={onCardClick && onCardClick}
      className={`flex border  hover:text-white font-semibold p-3 px-5 
        items-center justify-center rounded-full cursor-pointer ${selected ? "border-amber-300" : "border-gray-300/20 hover:border-gray-300"}`}
    >
      <p>{hour}</p>
    </button>
  );
}
