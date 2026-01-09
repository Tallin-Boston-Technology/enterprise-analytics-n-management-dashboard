import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Container, Paper, Typography, Link, Alert } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import type { LoginFormValues } from "../types";
import { useAuth } from "../hooks";
import { useState } from "react";
import { Button, Input } from "../components/common";

const ValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

const initialValue: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setError("");
      const result = await login(values);

      if (result.meta.requestStatus === "fulfilled") {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("An error has occurred. Please try again.");
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom>
              Enterprise Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Sign in to you account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {error}
              </Alert>
            )}

            <Formik
              initialValues={initialValue}
              validationSchema={ValidationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <Form style={{ width: "100%" }}>
                  <Input
                    fullWidth
                    id="email"
                    name="email"
                    label="email address"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ mb: 2 }}
                  />

                  <Input
                    fullWidth
                    id="password"
                    name="password"
                    label="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ mb: 3 }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    loading={isSubmitting}
                    sx={{ mb: 2 }}
                  >
                    Sign In
                  </Button>

                  <Box sx={{ textAlign: "center" }}>
                    <Link
                      component={RouterLink}
                      to="/forgot-password"
                      variant="body2"
                      underline="hover"
                    >
                      Forgot Password?
                    </Link>
                  </Box>

                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Don't have an account?{" "}
                      <Link
                        component={RouterLink}
                        to="/register"
                        variant="body2"
                        underline="hover"
                      >
                        Sign up
                      </Link>
                    </Typography>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Container>
      </Box>
    </>
  );
};
