import {
  Alert,
  AlertTitle,
  Box,
  type SxProps,
  type Theme,
} from "@mui/material";

interface ErrorMessageProps {
  message: string;
  title?: string;
  severity?: "error" | "warning" | "info" | "success";
  onClose?: () => void;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title,
  severity = "error",
  onClose,
  fullWidth = false,
  sx,
}) => {
  const alert = (
    <Alert severity={severity} onClose={onClose} sx={sx}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );

  if (fullWidth) {
    return <Box width="100%">{alert}</Box>;
  }

  return alert;
};
