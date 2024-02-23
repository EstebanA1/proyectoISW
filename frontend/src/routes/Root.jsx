import { Outlet as Children, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider } from '../context/AuthContext';
import { Button, Box, ThemeProvider, createTheme } from "@mui/material"
import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useAuth } from '../context/AuthContext';

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

  const { user } = useAuth();
  let isAdmin = false;
  let isSolicitante = false;
  let isEncargado = false;

  if (user && user.roles) {
    isAdmin = user.roles.some(role => role.name === "Administrador");
    isSolicitante = user.roles.some(role => role.name === "Solicitante");
    isEncargado = user.roles.some(role => role.name === "Encargado");
}

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

                    {user && (
                        <>
                            <Button
                                sx={{ ml: 2 }}
                                style={citasButtonStyle}
                                onMouseOver={() => handleMouseOver(setCitasButtonStyle)}
                                onMouseOut={() => handleMouseOut(setCitasButtonStyle)}
                                onClick={() => isAdmin ? navigate('/citas') : null}
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

                            <Button
                                sx={{ ml: 2 }}
                                style={citasButtonStyle}
                                onMouseOver={() => handleMouseOver(setCitasButtonStyle)}
                                onMouseOut={() => handleMouseOut(setCitasButtonStyle)}
                                onClick={() => navigate('/solicitud')}
                            >
                                Solicitudes
                            </Button>

                            <Button
                                sx={{ ml: 2 }}
                                style={citasButtonStyle}
                                onMouseOver={() => handleMouseOver(setCitasButtonStyle)}
                                onMouseOut={() => handleMouseOut(setCitasButtonStyle)}
                                onClick={() => navigate('/respuesta')}
                            >
                                Respuestas
                            </Button>
                        </>
                    )}
                </Box>

                <Button
                    sx={{ marginRight: 2 }}
                    style={logoutButtonStyle}
                    onMouseOver={() => handleMouseOver(setLogoutButtonStyle)}
                    onMouseOut={() => handleMouseOut(setLogoutButtonStyle)}
                    onClick={handleLogout}
                >
                    {user ? 'Cerrar sesión' : 'Iniciar sesión'}
                </Button>
            </Box>
            <Children />
        </div>
    </ThemeProvider>
);
}

export default Root;