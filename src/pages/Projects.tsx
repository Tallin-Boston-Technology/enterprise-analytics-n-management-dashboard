import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useEffect } from "react";
import { fetchProjects, setCurrentPage } from "../app/slices/projectsSlice";
import {
  Button,
  Card,
  ErrorMessage,
  LoadingSpinner,
} from "../components/common";
import {
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { formatCurrency, formatDate } from "../utils";

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { projects, isLoading, error, pagination } = useAppSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(fetchProjects({ page: pagination.currentPage, limit: 10 }));
  }, [dispatch, pagination.currentPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(setCurrentPage(newPage + 1));
  };

  const handleChangeRowPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      fetchProjects({ page: 1, limit: parseInt(event.target.value, 10) })
    );
    dispatch(setCurrentPage(1));
  };

  const getStatusColour = (
    status: string
  ): "success" | "primary" | "warning" | "error" | "default" => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "primary";
      case "on-hold":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getPriorityColour = (
    priority: string
  ): "error" | "warning" | "info" | "success" | "default" => {
    switch (priority) {
      case "critical":
        return "error";
      case "high":
        return "warning";
      case "medium":
        return "info";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  if (isLoading && projects.length === 0) {
    return <LoadingSpinner fullScreen text="Loading projects..." />;
  }

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Projects
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and track all your projects
            </Typography>
          </Box>
          <Button variant="contained" onClick={() => navigate("/projects/new")}>
            Create Project
          </Button>
        </Box>

        {error && (
          <ErrorMessage
            message={error}
            title="Failed to load projects"
            sx={{ mb: 3 }}
          />
        )}

        <Card noPadding>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Budget</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>Manager</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 5 }}>
                      <Typography color="text.secondary">
                        No Projects found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((project) => (
                    <TableRow key={project.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {project.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={project.status}
                          color={getStatusColour(project.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={project.priority}
                          color={getPriorityColour(project.priority)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{formatCurrency(project.budget)}</TableCell>
                      <TableCell>{project.progress}</TableCell>
                      <TableCell>{formatDate(project.startDate)}</TableCell>
                      <TableCell>{formatCurrency(project.budget)}</TableCell>
                      <TableCell>{project.manager.fullName}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/projects/${project.id}`)}
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate(`/projects/${project.id}/edit`)
                          }
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={pagination.totalItems}
            page={pagination.currentPage - 1}
            onPageChange={handleChangePage}
            rowsPerPage={10}
            onRowsPerPageChange={handleChangeRowPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Card>
      </Box>
    </>
  );
};
