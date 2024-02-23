import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { createUser } from '../services/user.service';
import { Button, TextField, Box, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material'

function SignInForm() {
 const navigate = useNavigate();
 const { enqueueSnackbar } = useSnackbar();
 const { register,
 handleSubmit,
 formState: { errors },
 reset,
 control,
 clearErrors,
 } = useForm();

 const [isAuthSol, setIsAuthSol] = useState(false);

 const onSubmit = (data) => {
 const userData = isAuthSol ? { ...data, roles: ['Solicitante'], rut: data.rut } : { ...data, roles: [data.roles] };
 createUser(userData)
 .then(() => {
 navigate('/');
 enqueueSnackbar('Usuario creado exitosamente', { variant: 'success', autoHideDuration: 3000 });
 })
 .catch((error) => {
 setCreateError('No se pudo crear la cuenta. Inténtalo de nuevo más tarde.');
 reset();
 });
 };

 const handleButtonClick = () => {
 setIsAuthSol(!isAuthSol);
 reset();
 clearErrors();
 }

 const handleChange = () => {
 setCreateError(null);
 clearErrors();
 }

 return (
 <Box component="form" width='30%' onSubmit={handleSubmit(onSubmit)}>

 <Box position="relative" width="100%" sx={{ mt: '10%' }}>
 <h2>Crear cuenta</h2>
 <TextField
 id="username"
 label="Nombre"
 variant="filled"
 autoComplete='off'
 fullWidth
 onChange={handleChange}
 {...register('username', {
 required: 'El nombre es obligatorio',
 })}
 />
 {errors.name && errors.name.type === "required" && <p style={{ position: 'absolute', right: '-42%', top: '40%', transform: 'translateY(-50%)', color: 'red' }}> {errors.name.message}</p>}
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
 {...register('password', { required: 'La contraseña es obligatoria', })}
 />
 {errors.password && <p style={{ position: 'absolute', right: '-47%', top: '22%', transform: 'translateY(-50%)', color: 'red' }}> {errors.password.message}</p>}
 </Box>

 {!isAuthSol && <div>
 <FormControl variant="filled" style={{ position: 'relative' }} fullWidth>
 <InputLabel id="roles-label">Rol</InputLabel>

 <Controller
 name="roles"
 control={control}
 defaultValue={[]}
 rules={{ required: 'El rol es obligatorio' }}
 render={({ field }) => (
 <Select
 id="rol"
 label="Rol"
 variant="filled"
 autoComplete='off'
 fullWidth
 value={field.value || []}
 onChange={(e) => field.onChange(e.target.value)}
 >
 <MenuItem value="Administrador">Administrador</MenuItem>
 <MenuItem value="Encargado">Encargado</MenuItem>
 </Select>
 )}
 />
 {errors.roles && <p className="my-error2">{errors.roles.message}</p>}

 {errors.roles && <p className="my-error2">{errors.roles.message}</p>}
 </FormControl>
 </div>}

 <Grid container sx={{
 justifyContent: 'space-between',
 mt: '5%',
 }}>
 <Button variant="outlined" sx={{ borderColor: 'transparent' }} onClick={() => navigate('/auth')}>Iniciar sesión</Button>
 <Button variant="contained" type="submit">Confirmar</Button>

 </Grid>
 <Button variant="contained" onClick={handleButtonClick} sx={{ mt: 2, width: '100%' }}>
 {isAuthSol ? "Registrar como interno" : "Registrar como solicitante"}</Button>
 </Box>
 );
}

export default SignInForm;
