import SignInForm from '../components/SignInForm';
import { Grid } from '@mui/material';

function SignIn() {

 return (
 <Grid sx={{
 display: 'flex',
 flexDirection: 'column',
 alignItems: 'center',
 justifyContent: 'center',
 height: '75vh'
 }}>
 <SignInForm  />
 </Grid>
 );
}

export default SignIn;
