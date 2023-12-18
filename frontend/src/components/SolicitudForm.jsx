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
    } = useForm();

    useEffect(() => {
        if (solicitudProp) {
            Object.keys(solicitudProp).forEach(key => {
                setValue(key, solicitudProp[key]);
            });
        }
    }, [solicitudProp, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }

        try {
           // if (id) {
           //     await updateSolicitud(id, formData);
            //    enqueueSnackbar('Solicitud actualizada con éxito', { variant: 'success' });
          //  } else {
                await createSolicitud(formData);
                enqueueSnackbar('Solicitud creada con éxito', { variant: 'success' });
          //  }
            router('/solicitud');
        } catch (error) {
            console.error('Error al crear el registro:', error.response);
            enqueueSnackbar('Error al crear la Solicitud', { variant: 'error' });
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setValue('archivoPDF', selectedFile);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Box position="relative" width="100%">
                <TextField
                    id="nombre"
                    label="Nombre"
                    variant="filled"
                    autoComplete="off"
                    fullWidth
                    {...register('nombre', { required: 'El nombre es requerido', minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' } })}
                />
                {errors.nombre && <p style={{ color: 'red' }}>{errors.nombre.message}</p>}
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
                {errors.rut && <p style={{ color: 'red' }}>{errors.rut.message}</p>}
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
                {errors.fecha && <p style={{ color: 'red' }}>{errors.fecha.message}</p>}
            </Box>

            <Box position="relative" width="100%">
                <FormControl variant="filled" fullWidth>
                    <InputLabel id="tipo-label">Tipo de solicitud</InputLabel>
                    <Select
                        id="tipo"
                        labelId="tipo-label"
                        {...register('tipo', { required: 'Debe elegir una opción' })}
                    >
                        <MenuItem value="Construcción">Construcción</MenuItem>
                        <MenuItem value="Ampliación">Ampliación</MenuItem>
                    </Select>
                    {errors.tipo && <p style={{ color: 'red' }}>{errors.tipo.message}</p>}
                </FormControl>
            </Box>

            <Box position="relative" width="100%">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="archivoPDF"
                    {...register('archivoPDF')}
                />
                <label htmlFor="archivoPDF" style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>
                    Subir archivo (PDF)
                </label>
            </Box>

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
