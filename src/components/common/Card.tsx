import {
  Card as MuiCard,
  type CardProps as MuiCardProps,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Divider,
} from "@mui/material";

interface CardProps extends MuiCardProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  actions,
  children,
  noPadding = false,
  ...props
}) => {
  return (
    <>
      <MuiCard {...props}>
        {(title || subtitle) && (
          <>
            <CardHeader
              title={title && <Typography variant="h6">{title}</Typography>}
              subheader={subtitle}
            />
            <Divider />
          </>
        )}

        <CardContent sx={{ padding: noPadding ? 0 : undefined }}>
          {children}
        </CardContent>
        {actions && (
          <>
            <Divider />
            <CardActions>{actions}</CardActions>
          </>
        )}
      </MuiCard>
    </>
  );
};
