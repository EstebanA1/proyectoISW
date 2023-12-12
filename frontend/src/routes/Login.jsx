import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem('user')) {
    return (
      <>
        <h2>Ya estas logeado!</h2>
        <button onClick={() => navigate('/')}>Ir a home</button>
      </>
    );
  }

  return (
    <Grid sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '75vh'
    }}>
      <LoginForm />
    </Grid>
  );
}

export default Login;
