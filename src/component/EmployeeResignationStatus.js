import { Card, CardContent, Typography } from '@mui/material';

const EmployeeResignStatus = ({ data }) => (
  <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
    <CardContent>
      <Typography variant="h6">Resignation Status</Typography>
      <Typography>Name: {data.name}</Typography>
      <Typography>Email: {data.email}</Typography>
      <Typography>Job Role: {data.jobRole}</Typography>
      <Typography>Reason: {data.reason}</Typography>
      <Typography>Status: {data.status}</Typography>
      <Typography>LWD: {data.lwd || 'Not set yet'}</Typography>
    </CardContent>
  </Card>
);

export default EmployeeResignStatus;
