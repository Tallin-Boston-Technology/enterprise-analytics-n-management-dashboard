import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
  CircularProgress,
} from "@mui/material";

interface ButtonPage extends MuiButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export const Button: React.FC<ButtonPage> = ({
  children,
  loading = false,
  loadingText,
  disabled,
  startIcon,
  ...props
}) => {
  return (
    <>
      <MuiButton
        {...props}
        disabled={disabled || loading}
        startIcon={
          loading ? <CircularProgress size={16} color="inherit" /> : startIcon
        }
      >
        {loading ? loadingText || "Loading..." : children}
      </MuiButton>
    </>
  );
};
