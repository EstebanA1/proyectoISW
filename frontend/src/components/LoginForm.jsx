import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import { Button, TextField, Box, Alert, Grid } from '@mui/material'

function LoginForm({ isAuthSol, setIsAuthSol }) {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm();

    const onSubmit = (data) => {
        login(data).then(() => {
            navigate('/');
        }).catch((error) => {
            setLoginError('Los datos ingresados no coinciden con ninguna cuenta existente.');
            reset();
        });
    };

    const handleButtonClick = () => {
        setIsAuthSol(!isAuthSol);
        reset();
        clearErrors();
    }

    const handleChange = () => {
        setLoginError(null);
        clearErrors();
    }

    return (
        <Box component="form" width='30%' onSubmit={handleSubmit(onSubmit)}>
            {loginError && <Alert severity="error">{loginError}</Alert>}

            <Box position="relative" width="100%" sx={{ mt: '10%' }}>
                <h2>Inicia Sesión</h2>
                <TextField
                    id={isAuthSol ? "rut" : "email"}
                    label={isAuthSol ? "Rut" : "Correo"}
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    onChange={handleChange}
                    {...register(isAuthSol ? 'rut' : 'email', {
                        required: isAuthSol ? 'El rut es obligatorio' : 'El email es obligatorio',
                        pattern: {
                            value: isAuthSol ? /^[0-9]+-[0-9kK]{1}$/i : /^\S+@\S+$/i,
                            message: isAuthSol ? 'El rut debe ir sin puntos y con guion' : 'El email es inválido'
                        }
                    })}
                />
                {errors.email && errors.email.type === "required" && <p style={{ position: 'absolute', right: '-37%', top: '60%', transform: 'translateY(-50%)', color: 'red' }}> {errors.email.message}</p>}
                {errors.email && errors.email.type === "pattern" && <p style={{ position: 'absolute', right: '-32.1%', top: '60%', transform: 'translateY(-50%)', color: 'red' }}> {errors.email.message}</p>}
                {errors.rut && errors.rut.type === "required" && isAuthSol && <p style={{ position: 'absolute', right: '-32.8%', top: '60%', transform: 'translateY(-50%)', color: 'red' }}> {errors.rut.message}</p>}
                {errors.rut && errors.rut.type === "pattern" && isAuthSol && <p style={{ position: 'absolute', right: '-60%', top: '60%', transform: 'translateY(-50%)', color: 'red' }}> {errors.rut.message}</p>}
            </Box>
            <Box position="relative" width="100%" >
                <TextField
                    id="password"
                    label="Contraseña"
                    type="password"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register('password', { required: 'La constraseña es obligatorio', })}
                />
                {errors.password && <p style={{ position: 'absolute', right: '-48%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.password.message}</p>}
            </Box>


            <Grid container sx={{
                justifyContent: 'space-between',
                mt: '5%',
            }}>
                <Button variant="outlined" onClick={() => navigate('/createUser')} sx={{ borderColor: 'transparent' }}>Crear cuenta</Button>
                <Button variant="contained" type="submit">Continuar</Button>

            </Grid>
            <Button variant="contained" onClick={handleButtonClick} sx={{ mt: 2, width: '100%' }}>
                {isAuthSol ? "Ingresar como interno" : "Ingresar como solicitante"}</Button>
        </Box>
    );
}

export default LoginForm;
