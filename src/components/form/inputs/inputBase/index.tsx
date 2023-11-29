import { TextFieldProps } from "@mui/material/TextField";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import * as Styled from "./styles";

export interface InputBaseProps<T extends FieldValues> {
  label?: string;
  control: Control<T>;
  name: FieldPath<T>;
  defaultValue?: T[keyof T];
  type?: TextFieldProps["type"];
  InputProps?: TextFieldProps["InputProps"];
}

function InputBase<T extends FieldValues>({
  InputProps,
  type = "text",
  label,
  ...props
}: InputBaseProps<T>) {
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <Styled.TextInput
          variant="outlined"
          inputProps={field}
          InputProps={InputProps}
          type={type}
          label={label}
        />
      )}
    />
  );
}

export default InputBase;
