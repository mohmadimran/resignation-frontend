import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {registerUser} from "../../services/api"
const Register = () => {
  const [formData, setFormData] = useState({ username: '',email:'', password: '', role: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('/api/auth/register', formData)
      // ;
      // const { data } = await registerUser(formData);

      // toast.success(data.message || 'Registration successful!');
      // navigate('/login');
      const {data} = await registerUser(formData)
      setMessage(data.message);
      navigate('/login');

    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Employee Registration
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
            label="email"
            name="email"
            type='email'
            fullWidth
            margin="normal"
            required
            value={formData.email}
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
          {/* New Role Field */}
          <TextField
            select
            label="Role"
            name="role"
            fullWidth
            margin="normal"
            required
            value={formData.role}
            onChange={handleChange}
            helperText="Please select your role"
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>

        {message && (
          <Typography color="secondary" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Register;
