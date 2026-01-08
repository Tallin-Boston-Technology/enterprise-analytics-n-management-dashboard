import { Box, Grid, Typography, Paper } from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  FolderOpen as ProjectsIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { formatCurrency, formatNumber, formatPercentage } from "../utils";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useEffect } from "react";
import {
  fetchDashboardStats,
  fetchRevenueData,
  fetchUserActivityData,
} from "../app/slices/dashboardSlice";
import { Card, ErrorMessage, LoadingSpinner } from "../components/common";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactElement;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
}) => {
  const isPostiive = change >= 0;

  return (
    <>
      <Paper
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: `${color}20`,
            color: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isPostiive ? "success.main" : "error.main",
              mt: 0.5,
            }}
          >
            {isPostiive ? "+" : ""}
            {formatPercentage(change)} from last month
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats, isLoading, error } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchRevenueData());
    dispatch(fetchUserActivityData());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading dashboard..." />;
  }

  if (error) {
    return <ErrorMessage message={error} title="Failed to load dashboard" />;
  }

  if (!stats) {
    return <ErrorMessage message="No data available" />;
  }

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Dashboard
        </Typography>
        <Typography variant="body1" color="text,secondary" sx={{ mb: 4 }}>
          Welcom Back! Here's what's happening with you business today.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Revenue"
              value={formatCurrency(stats.totalRevenue)}
              change={stats.revenueChange}
              icon={<TrendingUpIcon />}
              color="#1976d2"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Users"
              value={formatNumber(stats.totalUsers)}
              change={stats.usersChange}
              icon={<PeopleIcon />}
              color="#2e7d32"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Active Projects"
              value={stats.activeProjects}
              change={stats.projectsChange}
              icon={<ProjectsIcon />}
              color="#ed6c02"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Completion Rate"
              value={formatPercentage(stats.completionRate)}
              change={stats.completionChange}
              icon={<CheckCircleIcon />}
              color="#9c27b0"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Card title="Revenue Overview" subtitle="Last 6 months">
              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "text.secondary",
                }}
              >
                Chart will be added here (using Recharts)
              </Box>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card title="User Activity" subtitle="Last 7 days">
              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "text.secondary",
                }}
              >
                Chart will be added here
              </Box>
            </Card>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Card title="Recent Projects" subtitle="your latest projects">
              <Box
                sx={{
                  p: 3,
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                Projects list will be added here
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
