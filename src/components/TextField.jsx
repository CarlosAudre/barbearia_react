import { useState } from "react";

export function TextField({
  title,
  placeholder,
  icon1: Icon1,
  icon2: Icon2,
  icon3: Icon3,
  type,
}) {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const inputType = type === "password" && visiblePassword ? "text" : type;

  return (
    <div className="flex flex-col w-full text-white">
      <label>{title}</label>
      <div className="relative">
        <Icon1
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        {Icon3 && visiblePassword && (
          <Icon3
            onClick={() => setVisiblePassword(!visiblePassword)}
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37] cursor-pointer "
          />
        )}
        {Icon2 && !visiblePassword && (
          <Icon2
            onClick={() => setVisiblePassword(!visiblePassword)}
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 "
          />
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          className="border rounded-md
       border-gray-100/15 p-2 text-white w-full pl-10"
        />
      </div>
    </div>
  );
}
