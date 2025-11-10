// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import {loginUser} from "../../services/api"
// const Login = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const response = await loginUser(formData);
//       const { token, user } = response.data;

//       // Save authentication data
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("username", user.username);

//       setMessage("Login successful!");

//       if (user.role === "employee") {
//         navigate("/employee-dashboard");
//       } else if (user.role === "HR") {
//         navigate("/hr-dashboard");
//       } else {
//         navigate("/"); 
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <Box display="flex" justifyContent="center" mt={5}>
//       <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
//         <Typography variant="h5" gutterBottom>
//           Login
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Username"
//             name="username"
//             fullWidth
//             margin="normal"
//             required
//             value={formData.username}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             fullWidth
//             margin="normal"
//             required
//             value={formData.password}
//             onChange={handleChange}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Login
//           </Button>
//         </form>

//         {message && (
//           <Typography
//             sx={{ mt: 2 }}
//             color={message.includes("successful") ? "green" : "error"}
//           >
//             {message}
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login} = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await loginUser(formData);
      login(response.data); // ✅ updates context + localStorage instantly

      const role = response.data.user.role;
      setMessage("Login successful!");

      if (role === "employee") navigate("/employee-dashboard");
      else if (role === "HR") navigate("/hr-dashboard");
      else navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            required
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        {message && (
          <Typography
            sx={{ mt: 2 }}
            color={message.includes("successful") ? "green" : "error"}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Login;
