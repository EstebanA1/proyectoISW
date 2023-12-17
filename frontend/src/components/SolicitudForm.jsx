import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createSolicitud, updateSolicitud } from '../services/solicitud.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Box, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSnackbar } from 'notistack';



export default function SolicitudForm({ solicitud: solicitudProp }) {
    const router = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({ defaultValues: solicitudProp ? solicitudProp : {} });

    useEffect(() => {
        if (solicitudProp) {
            setValue('nombre', solicitudProp.nombre);
            setValue('rut', solicitudProp.rut);
            setValue('tipo', solicitudProp.tipo);
            setValue('fecha', solicitudProp.fecha);
            setValue('archivoPDF', solicitudProp.archivoPDF);
        }
    }, [solicitudProp, setValue]);

    const onSubmit = async (data) => {
        try {
            if (!data.archivoPDF) {
                // Muestra un mensaje de error o realiza alguna acción según tu lógica
                enqueueSnackbar('Debe seleccionar un archivo PDF', { variant: 'error' });
                return;
            }
            if (id) {
                const res = await updateSolicitud(id, data);
                enqueueSnackbar('Solicitud actualizada con éxito', { variant: 'success' });
            } else {
                const res = await createSolicitud(data);
                enqueueSnackbar('Solicitud creada con éxito', { variant: 'success' });
            }
            router('/solicitud');
        } catch (error) {
            console.log('Error al crear el registro:', error.response);
            enqueueSnackbar('Error al crear la Solicitud', { variant: 'error' });
        }
        router('/solicitud');
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setValue('archivoPDF', selectedFile);
    };

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
                            message: 'El rut debe tener el formato XX.XXX.XXX-X',
                        },
                    })}
                />
                 {errors.rut && errors.rut.type === "pattern" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.rut.message}</p>}
                {errors.rut && errors.rut.type !== "pattern" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.rut.message}</p>}
            </Box>

            <Box position="relative" width="100%">
            <TextField
            id="fecha"
            label="Fecha"
            variant="filled"
            autoComplete="off"
            fullWidth
            type='date'
            {...register('fecha', { required: 'La fecha es requerida' })}
            />
            {errors.fecha && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.fecha.message}</p>}
             </Box>

            <Box position="relative" width="100%">
                <FormControl variant="filled" fullWidth>
                    <InputLabel id="tipo">Tipo de solicitud</InputLabel>
                    <Select
                        id="tipo"
                        label="Tipo de solicitud"
                        {...register('tipo', {
                            required: 'Debe elegir una opción',
                        })}
                        error={Boolean(errors?.tipo)}
                    >
                        <MenuItem value="Construcción">Construcción</MenuItem>
                        <MenuItem value="Ampliación">Ampliación</MenuItem>
                    </Select>
                {errors.tipo && errors.tipo.type !== "minLength" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.tipo.message}</p>}
                {errors.tipo && errors.tipo.type === "minLength" && <p style={{ position: 'absolute', right: '-157.2%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.tipo.message}</p>}
                </FormControl>
            </Box>

            <Box position="relative" width="100%">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="archivoPDF"
                />
                 <label htmlFor="archivoPDF" style={{ backgroundColor: 'blue', color: 'white', padding: '0,5px', borderRadius: '1px', cursor: 'pointer' }}>
                 Subir archivo (PDF)
                 </label>
            </Box>

            {/* Otros campos del formulario */}
            {/* ... */}

            <br />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button type="submit" variant="contained" startIcon={<SaveIcon />} fullWidth>
                        Guardar
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        type="button"
                        variant="contained"
                        startIcon={<CancelIcon />}
                        fullWidth
                        onClick={() => router('/solicitud')}
                    >
                        Cancelar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
