import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Link,
  Paper,
} from "@mui/material";
import backgroundImage from "../assets/speak.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const clientId = process.env.REACT_APP_FACEBOOK_CLIENT_ID;
  console.log("Facebook Client ID:", clientId);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login attempt with:", { username, password });
  };

  const handleGoogle = async (credentialReponse) => {
    try {
      const response = await fetch(
        "http://localhost:8080/v1/api/user/loginGoogle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tokenId: credentialReponse.credential }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.userData));
        const decodedToken = jwtDecode(data.accessToken);
        const userRole = decodedToken.role;

        // Automatically navigate to home after 3 seconds
        setTimeout(() => {
          if (userRole === 1) {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        }, 3000);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  const handleFacebok = async (response) => {
    try {
      console.log("Facebook login data:", response);
      const res = await fetch(
        "http://localhost:8080/v1/api/user/loginFacebook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: response.userID,
            TokenId: response.accessToken,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.userData));
        const decodedToken = jwtDecode(data.accessToken);
        const userRole = decodedToken.role;

        // Automatically navigate to home after 3 seconds
        setTimeout(() => {
          if (userRole === 1) {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        }, 3000);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", position: "relative" }}
    >
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
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
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
              sx={{
                backgroundColor: "#F0F2F5",
                borderRadius: "3px",
                fontSize: "0.9rem",
              }}
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
              sx={{
                backgroundColor: "#F0F2F5",
                borderRadius: "3px",
                fontSize: "0.9rem",
              }}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column", // Sắp xếp các phần tử theo chiều dọc
                alignItems: "center", // Căn giữa theo chiều ngang
                gap: 2, // Khoảng cách giữa các nút
                mt: 2, // Khoảng cách trên
              }}
            >
              <GoogleLogin
                onSuccess={handleGoogle}
                onError={() => {
                  setError("Login Failed");
                }}
                style={{ width: "100%" }} // Đặt chiều rộng của nút GoogleLogin
              />
              <FacebookLogin
                appId="1088597931155576"
                autoLoad={false}
                fields="name,email,picture"
                callback={handleFacebok}
                scope="public_profile,user_friends,user_actions.books"
                cssClass="my-facebook-button-class"
                icon="fa-facebook" // Thay thế bằng icon của bạn
                textButton="Login with Facebook" // Thay thế bằng văn bản nút của bạn
                style={{ width: "100%" }} // Đặt chiều rộng của nút FacebookLogin
              />
            </Box>
            <Box sx={{ textAlign: "center", fontSize: "0.9rem", mt: 2 }}>
              <Link href="#" variant="body2" sx={{ color: "#4CAF50" }}>
                Forgot password?
              </Link>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" display="inline">
                  Don't have an account?
                </Typography>
                <Link
                  onClick={() => navigate("/signup")}
                  variant="body2"
                  sx={{ ml: 0.5, color: "#4CAF50", cursor: "pointer" }}
                >
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
          Experience seamless collaboration and productivity with our innovative
          tools. Sign in to get started.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
