import { useState } from "react";
import { Box, Button, TextField, Typography, Grid, Link, Paper } from "@mui/material";
import backgroundImage from "../assets/speak.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login attempt with:", { username, password });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", position: "relative" }}>
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      />

      {/* Left side - Login Form */}
      <Grid item xs={12} sm={4} md={3} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 2,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            padding: 4,
            borderRadius: 3,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
            <TextField
            margin="dense" // Giảm khoảng cách giữa các input
            required
            fullWidth
            id="username"
            placeholder="Enter your username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ backgroundColor: "#F0F2F5", borderRadius: "3px", fontSize: "0.9rem" }}
          />
          <TextField
            margin="dense"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ backgroundColor: "#F0F2F5", borderRadius: "3px", fontSize: "0.9rem" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1.5,
              mb: 1,
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#45a049" },
              textTransform: "none",
              borderRadius: "10px",
              padding: "8px 0", // Giảm padding
            }}
          >
            Sign in
          </Button>
            <Box sx={{ textAlign: "center", fontSize: "0.9rem" }}>
              <Link href="#" variant="body2" sx={{ color: "#4CAF50" }}>
                Forgot password?
              </Link>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" display="inline">
                  Don't have an account?
                </Typography>
                <Link onClick={() => navigate("/signup")} variant="body2" sx={{ ml: 0.5, color: "#4CAF50", cursor: "pointer" }}>
                  Sign up
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* Right side - Welcome Section */}
      <Grid
        item
        xs={false}
        sm={8}
        md={9}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 4,
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to Our Platform!
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: "60%", opacity: 0.9 }}>
          Experience seamless collaboration and productivity with our innovative tools.
          Sign in to get started.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
