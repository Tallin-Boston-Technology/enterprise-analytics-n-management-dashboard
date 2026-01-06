import { TextField, type TextFieldProps } from "@mui/material";

interface InputProps extends Omit<TextFieldProps, "variant"> {
  variant?: "outlined" | "filled" | "standard";
}

export const Input: React.FC<InputProps> = ({
  variant = "outlined",
  fullWidth = true,
  ...props
}) => {
  return (
    <>
      <TextField variant={variant} fullWidth={fullWidth} {...props} />
    </>
  );
};
