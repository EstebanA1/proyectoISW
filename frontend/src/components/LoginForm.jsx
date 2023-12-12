import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import { Button, TextField, Box, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material'

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };

  return (
    <Box component="form" sx={{ mr: '0' }} onSubmit={handleSubmit(onSubmit)}>

      <Box position="relative" width="100%" sx={{ mt: '24%' }}>
        <h2>Inicia Sesión</h2>
        <TextField
          id="email"
          label="Email"
          variant="filled"
          autoComplete='off'
          fullWidth
          {...register('email', {
            required: 'El email es obligatorio',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'El email es invalido'
            }
          })}
        />
        {errors.email && errors.email.type === "required" && <p style={{ position: 'absolute', right: '-45%', top: '60%', transform: 'translateY(-50%)', color: 'red' }}> {errors.email.message}</p>}
        {errors.email && errors.email.type === "pattern" && <p style={{ position: 'absolute', right: '-38.9%', top: '60%', transform: 'translateY(-50%)', color: 'red' }}> {errors.email.message}</p>}

      </Box>


      <Box position="relative" width="100%" >
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="filled"
          autoComplete='off'
          fullWidth
          {...register('password', { required: 'La constraseña es obligatorio', })}
        />
        {errors.password && <p style={{ position: 'absolute', right: '-58%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.password.message}</p>}
      </Box>

      <Button sx={{ mt: 2 }} variant="contained">Ingresar como Solicitante</Button>
      <Button type="submit" sx={{ mt: 2, ml: 2.5 }} variant="contained">Continuar</Button>
    </Box>
  );
}

export default LoginForm;
