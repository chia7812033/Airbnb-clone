"use client";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface ClientProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  rows?: number;
}

const Input: React.FC<ClientProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
  rows,
}) => {
  return (
    <div className='w-full my-2'>
      {formatPrice ? (
        <TextField
          fullWidth
          label={label}
          id={id}
          disabled={disabled}
          error={!!errors[id]}
          type={type}
          {...register(id, { required })}
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
        />
      ) : (
        <TextField
          fullWidth
          label={label}
          id={id}
          disabled={disabled}
          error={!!errors[id]}
          type={type}
          {...register(id, { required })}
          multiline
          rows={rows}
        />
      )}
    </div>
  );
};

export default Input;
