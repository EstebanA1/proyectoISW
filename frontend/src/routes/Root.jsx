import { Outlet as Children, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider } from '../context/AuthContext';
import { Button, Box, ThemeProvider, createTheme } from "@mui/material"
import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';

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

  const [homeButtonStyle, setHomeButtonStyle] = useState({
    backgroundColor: 'transparent',
    color: 'black',
    border: 'none',
  });

  const [citasButtonStyle, setCitasButtonStyle] = useState({
    backgroundColor: 'transparent',
    color: 'black',
    border: 'none',
  });

  const [logoutButtonStyle, setLogoutButtonStyle] = useState({
    backgroundColor: 'transparent',
    color: 'black',
  });

  const handleMouseOver = (setButtonStyle) => {
    setButtonStyle({
      backgroundColor: 'transparent',
      color: 'black',
    });
  };

  const handleMouseOut = (setButtonStyle) => {
    setButtonStyle({
      backgroundColor: 'transparent',
      color: 'black',
      border: 'none',
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='botones'>
        <Box sx={{
          marginTop: 2,
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #EEEEEE',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: 'white',
        }}>
          <Box>
            <Button
              sx={{ ml: 2 }}
              style={homeButtonStyle}
              onMouseOver={() => handleMouseOver(setHomeButtonStyle)}
              onMouseOut={() => handleMouseOut(setHomeButtonStyle)}
              onClick={() => navigate('/')}
            >
              <HomeIcon />
            </Button>
            <Button
              sx={{ ml: 2 }}
              style={citasButtonStyle}
              onMouseOver={() => handleMouseOver(setCitasButtonStyle)}
              onMouseOut={() => handleMouseOut(setCitasButtonStyle)}
              onClick={() => navigate('/citas')}
            >
              Citas
            </Button>

            <Button
              sx={{ ml: 2 }}
              style={citasButtonStyle}
              onMouseOver={() => handleMouseOver(setCitasButtonStyle)}
              onMouseOut={() => handleMouseOut(setCitasButtonStyle)}
              onClick={() => navigate('/feedback')}
            >
              Retroalimentaciones
            </Button>

          </Box>
          <Button
            sx={{ marginRight: 2 }}
            style={logoutButtonStyle}
            onMouseOver={() => handleMouseOver(setLogoutButtonStyle)}
            onMouseOut={() => handleMouseOut(setLogoutButtonStyle)}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </Box>
        <Children />
      </div>
    </ThemeProvider >
  );
}

export default Root;
