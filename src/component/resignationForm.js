import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import {getUserData,submitResignation} from "../services/api";

const ResignationForm = ({ onSubmitted }) => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [role,setRole] = useState('')
  const [reason, setReason] = useState('');
  const [lwd, setLwd] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch logged-in user info
    const fetchUser = async () => {
      try {
        const res = await getUserData();
        setName(res.data.data?.username);
        setEmail(res.data.data?.email)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitResignation(
        {
          name:name,
          email:email,
          jobRole:role,
          reason:reason,
          lwd:lwd, 
        }
      );
      onSubmitted();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit resignation');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>Submit Resignation</Typography>

      <TextField
        label="Name"
        value={name}
              onChange={(e) => setName(e.target.value)}

        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />

      <TextField
        label="Email"
        value={email}
              onChange={(e) => setEmail(e.target.value)}

        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />

      <TextField
        label="Job Role"
        value={role}
      onChange={(e) => setRole(e.target.value)}

        fullWidth
        margin="normal"
      />

      <TextField
        label="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        required
      />

      <TextField
        label="Last Working Day"
        type="date"
        value={lwd}
        onChange={(e) => setLwd(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Submit Resignation
      </Button>
    </Box>
  );
};

export default ResignationForm;
