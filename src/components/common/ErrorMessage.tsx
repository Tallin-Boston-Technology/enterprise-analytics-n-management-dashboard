import { Alert, AlertTitle, Box } from "@mui/material";

interface ErrorMessageProps {
  message: string;
  title?: string;
  severity?: "error" | "warning" | "info" | "success";
  onClose?: () => void;
  fullWidth?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title,
  severity = "error",
  onClose,
  fullWidth = false,
}) => {
  const alert = (
    <Alert severity={severity} onClose={onClose}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );

  if (fullWidth) {
    return <Box width="100%">{alert}</Box>;
  }

  return alert;
};
