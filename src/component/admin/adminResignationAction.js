import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import axios from 'axios';

const AdminResignationAction = ({ resignation, token, onActionComplete }) => {
  const [approved, setApproved] = useState(true);
  const [lwd, setLwd] = useState(resignation.lwd || '');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.put(
        '/api/admin/conclude_resignation',
        {
          resignationId: resignation._id,
          approved,
          lwd,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSnackbar({ open: true, message: `Resignation ${approved ? 'approved' : 'rejected'} successfully` });
      onActionComplete();
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Error processing resignation' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6">Resignation Action</Typography>

        <TextField
          label="Last Working Day"
          type="date"
          value={lwd}
          onChange={(e) => setLwd(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          select
          label="Decision"
          value={approved}
          onChange={(e) => setApproved(e.target.value === 'true')}
          fullWidth
          margin="normal"
        >
          <MenuItem value="true">Approve</MenuItem>
          <MenuItem value="false">Reject</MenuItem>
        </TextField>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading || !lwd}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </CardContent>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
      />
    </Card>
  );
};

export default AdminResignationAction;
