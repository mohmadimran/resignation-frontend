import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          Resignation Portal
        </Typography>

        <Box>


          {token && role === 'employee' && (
            <>
              <Button color="inherit">Employee Dashboard</Button>
            </>
          )}

          {token && role === 'HR' && (
            <>
              <Button color="inherit" >HR Dashboard</Button>
            </>
          )}

          {token ? <>  <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </> :
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
            </>
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
