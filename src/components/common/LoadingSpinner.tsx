import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
  fullScreen?: boolean;
  colour?: "primary" | "secondary" | "inherit";
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  text,
  fullScreen = false,
  colour = "primary",
}) => {
  const content = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <CircularProgress size={size} color={colour} />
      {text && (
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        width="100%"
      >
        {content}
      </Box>
    );
  }

  return content;
};
