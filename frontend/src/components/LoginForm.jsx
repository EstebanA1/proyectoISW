import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import { Button, TextField, Box, Alert } from '@mui/material'

function LoginForm() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    })
  };

  return (
    <Box component="form" width='30%' onSubmit={handleSubmit(onSubmit)}>
      {loginError && <Alert severity="error">{loginError}</Alert>}

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
        {errors.email && errors.email.type === "required" && <p style={{ position: 'absolute', right: '-37%', top: '60%', transform: 'translateY(-50%)', color: 'red' }}> {errors.email.message}</p>}
        {errors.email && errors.email.type === "pattern" && <p style={{ position: 'absolute', right: '-31.9%', top: '60%', transform: 'translateY(-50%)', color: 'red' }}> {errors.email.message}</p>}
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
        {errors.password && <p style={{ position: 'absolute', right: '-48%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.password.message}</p>}
      </Box>

      <Button type="submit" sx={{ mt: 2, mr:'-100%' }} variant="contained">Continuar</Button>
    </Box>
  );
}

export default LoginForm;
