import React, { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function User() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    age: null,
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleChange = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log(values);
      const { email, username, age } = values;
      axios
        .post("http://localhost:8081/userDetails", {
          username,
          email,
          age,
        })
        .then((res) => {
          console.log("Line 64, ", res);
          console.log("Registered Successfully !!");
        })
        .catch((err) => {
          console.log("Line 67", err);
        });
    }
  };
  const handleValidation = () => {
    const { username, email, age } = values;
    if (!age || age[0].trim() === "") {
      // Check for undefined or empty username
      toast.error("Age cannot be empty.", toastOptions);
      return false;
    } else if (age < 18 || age > 60) {
      toast.error(
        "Age should be above 18 and below 60 to enroll",
        toastOptions
      );
      return false;
    } else if (!email || email[0].trim() === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (username[0].length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (username[0].trim() === "") {
      // Check for empty username
      toast.error("Username cannot be empty.", toastOptions);
      return false;
    } else if (!isValidEmail(email[0])) {
      // Check for valid email format
      toast.error("Invalid email format.", toastOptions);
      return false;
    }

    return true;
  };
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
          }}
        >
          <Typography component="h1" variant="h5">
            Yoga Classes Form
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="age"
                  label="age"
                  type="age"
                  id="age"
                  autoComplete="age"
                  onChange={(e) => setValues({ ...values, age: parseInt(e.target.value, 10) || 0 })}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}

export default User;
