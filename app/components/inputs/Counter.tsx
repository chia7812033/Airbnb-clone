"use client";

import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

interface CounterProps {
  value: number;
  title: string;
  subtitle?: string;
  onChange: (value: number) => void;
  noBorder?: boolean;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
  noBorder,
}) => {
  const onAdd = () => {
    onChange(value + 1);
  };
  const onMinus = () => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  };

  return (
    <div
      className={` grid
        grid-cols-2
        my-4
        ${noBorder ? "border-none" : "border-b-2"}
        border-gray-300
        items-center
        gap-2
        py-4`}
    >
      <div className='flex flex-col'>
        <div className='text-lg font-semibold'>{title}</div>
        <div className='text-sm text-gray-400'>{subtitle}</div>
      </div>
      <div
        className='
          flex
          flex-row
          items-center
          gap-2'
      >
        <div onClick={onMinus}>
          <AiOutlineMinusCircle
            size={32}
            className={`${value <= 1 ? "text-gray-300" : "text-black"}`}
          />
        </div>
        <div>{value}</div>
        <div onClick={onAdd}>
          <AiOutlinePlusCircle size={32} />
        </div>
      </div>
    </div>
  );
};

export default Counter;
