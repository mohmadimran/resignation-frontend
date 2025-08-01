import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const ExitForm = () => {
  const [lwd, setLwd] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    try {
      await axios.post(
        '/api/user/resign',
        { lwd },
        { headers: { Authorization: token } }
      );
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Submit Resignation
      </Typography>
      {submitted ? (
        <Typography color="success.main">Resignation submitted successfully!</Typography>
      ) : (
        <>
          <TextField
            label="Last Working Day"
            type="date"
            value={lwd}
            onChange={(e) => setLwd(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ my: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </>
      )}
    </Box>
  );
};

export default ExitForm;

