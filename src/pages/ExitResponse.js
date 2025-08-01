import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';

const ExitResponses = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get('/api/admin/exit_responses', {
          headers: { Authorization: token },
        });
        setResponses(res.data.data);
      } catch (err) {
        console.error('Fetching responses failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [token]);

  if (loading) return <CircularProgress />;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Exit Questionnaire Responses
      </Typography>
      <Grid container spacing={2}>
        {responses.map((item, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card>
              <CardContent>
                <Typography variant="h6">Employee ID: {item.employeeId}</Typography>
                {item.responses.map((r, j) => (
                  <Box key={j} mt={2}>
                    <Typography><strong>Q:</strong> {r.questionText}</Typography>
                    <Typography><strong>A:</strong> {r.response}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExitResponses;
