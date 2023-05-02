"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  wFull?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  wFull,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex
        justify-center
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        ${wFull ? "w-full" : "px-2"}
        border-[2px]
        mt-2
        mb-1
        ${outline ? `bg-black` : "bg-rose-400"}
        ${outline ? "border-black" : "border-rose-400"}
        text-white
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "font-light" : "font-semibold"}
        `}
    >
      {Icon && <Icon size={24} className='absolute left-3 top-3' />}
      <div>{label}</div>
    </button>
  );
};

export default Button;
