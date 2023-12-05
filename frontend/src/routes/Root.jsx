import { Outlet as Children, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { Button, Box, Grid, ThemeProvider, createTheme, Container } from "@mui/material"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: '#00A7E1',
    },
    secondary: {
      main: '#FFC72C',
    },
  },
});


function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
};

function PageRoot() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const { user } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <div className='botones'>
        <Box sx={{
          marginTop: 2,
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Box>
            <Button sx={{ ml: 2 }} variant="contained" onClick={() => navigate('/')}>Home</Button>
            <Button sx={{ ml: 2 }} variant="contained" onClick={() => navigate('/citas')}>Ver citas</Button>
          </Box>
          <Button sx={{ marginRight: 2 }} variant="contained" onClick={handleLogout}>Cerrar sesión</Button>
        </Box>
        <Children />
      </div>
    </ThemeProvider >
  );
}

export default Root;
