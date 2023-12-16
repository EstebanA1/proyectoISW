import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createRespuesta, updateRespuesta } from "../services/respuestaDoc.service";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Box, Select, MenuItem, FormControl, InputLabel, Grid  } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSnackbar } from 'notistack';

export default function RespuestaForm({ respuesta: respuestaProp }) {
    const router = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [error] = React.useState({
        error: false,
        message: ''
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm(
        { defaultValues: respuestaProp ? respuestaProp : {} }
    );
    
    useEffect(() => {
        if (respuestaProp) {
            setValue('nombre', respuestaProp.nombre);
            setValue('rut', respuestaProp.rut);
            setValue('descripcion', respuestaProp.descripcion);
        }
    }, [respuestaProp, setValue]);

    const onSubmit = async (data) => {
        try {
            if (id) {
                const res = await updateRespuesta(id, data);
                setRespuesta(res);
                enqueueSnackbar('Respuesta actualizada con éxito', { variant: 'success' });
            } else {
                const res = await createRespuesta(data);
                setRespuesta(res);
                enqueueSnackbar('Respuesta creada con éxito', { variant: 'success' });
            }
            router('/respuesta');
        } catch (error) {
            console.log("Error al crear el registro:", error.response);
            enqueueSnackbar('Error al crear la Respuesta', { variant: 'error' });
        }
        router('/respuesta');
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box position="relative" width="100%">
                <TextField
                    id="nombre"
                    label="Nombre"
                    variant="filled"
                    autoComplete="off"
                    fullWidth
                    {...register('nombre', { required: 'El nombre es requerido', minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' } })}
                />
                {errors.nombre && errors.nombre.type !== "minLength" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.nombre.message}</p>}
                {errors.nombre && errors.nombre.type === "minLength" && <p style={{ position: 'absolute', right: '-157.2%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.nombre.message}</p>}
            </Box>

            <Box position="relative" width="100%">
                <TextField
                    id="rut"
                    label="Rut"
                    variant="filled"
                    autoComplete="off"
                    fullWidth
                    {...register('rut', { 
                        required: 'El rut es requerido', 
                        pattern: { 
                            value: /^[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}$/, 
                            message: 'El rut debe tener el formato XXX.XXX.XXX-X' 
                        }
                    })}
                />
                {errors.rut && errors.rut.type === "pattern" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.rut.message}</p>}
                {errors.rut && errors.rut.type !== "pattern" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.rut.message}</p>}
            </Box>

            <Box position="relative" width="100%">
                <TextField
                    id="descripcion"
                    label="Descripción"
                    variant="filled"
                    autoComplete="off"
                    fullWidth
                    {...register('descripcion', { required: 'La descripción es requerida', minLength: { value: 3, message: 'La descripción debe tener al menos 3 caracteres' } })}
                />
                {errors.descripcion && errors.descripcion.type !== "minLength" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.descripcion.message}</p>}
                {errors.descripcion && errors.descripcion.type === "minLength" && <p style={{ position: 'absolute', right: '-157.2%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.descripcion.message}</p>}
            </Box>

            {error.exampleRequired && <span>Este campo es obligatorio</span>}
            <br />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        fullWidth
                    >
                        Guardar
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        type="button"
                        variant="contained"
                        startIcon={<CancelIcon />}
                        fullWidth
                        onClick={() => router('/respuesta')}
                    >
                        Cancelar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
