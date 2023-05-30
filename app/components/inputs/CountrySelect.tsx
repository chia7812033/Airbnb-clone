"use client";

import useCountries from "@/app/hooks/useCountries";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import Select from "react-select";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useMemo } from "react";

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
  const { getAll } = useCountries();

  const countries = useMemo(() => getAll(), [getAll]);
  const options = countries.map((item) => (
    <MenuItem value={item.value} key={item.value}>
      {item.label}, {item.region}
    </MenuItem>
  ));

  const handleChange = (event: SelectChangeEvent) => {
    const country = countries.filter(
      (item) => item.value === event.target.value
    );
    onChange(country[0] as CountrySelectValue);
  };

  return (
    <div className='my-2'>
      {/* <Select
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
      /> */}
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Countries</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={value?.value}
          label='countries'
          onChange={handleChange}
        >
          {options}
        </Select>
      </FormControl>
    </div>
  );
};

export default CountrySelect;
