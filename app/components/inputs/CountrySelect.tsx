"use client";

import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll} = useCountries();

  return (
    <div className='my-2'>
      <Select
        options={getAll()}
        placeholder={"Any Country"}
        isClearable
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className='flex flex-row gap-2'>
            <div className='font-semibold'>{option.label}, </div>
            <div className='text-gray-400'>{option.region}</div>
          </div>
        )}
        classNames={{
          control: () => "p-2 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
      />
    </div>
  );
};

export default CountrySelect;
