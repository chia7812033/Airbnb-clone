"use client";

import React from "react";

interface MenuOptionProps {
  onClick: () => void;
  label: string;
  isBold?: boolean;
}

const MenuOption: React.FC<MenuOptionProps> = ({ onClick, label, isBold }) => {
  return (
    <div
      onClick={onClick}
      className={`hover:bg-gray-200 px-4 py-2 my-1 cursor-pointer ${
        isBold && "font-bold"
      }`}
    >
      {label}
    </div>
  );
};

export default MenuOption;
