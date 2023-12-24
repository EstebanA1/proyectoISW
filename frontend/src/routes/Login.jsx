import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useState } from 'react';

function Login() {
 const navigate = useNavigate();
 const [isAuthSol, setIsAuthSol] = useState(false);

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
 <LoginForm isAuthSol={isAuthSol} setIsAuthSol={setIsAuthSol} />
 </Grid>
 );
}

export default Login;
