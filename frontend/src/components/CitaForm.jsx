// CitaForm.jsx
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { createCita, updateCita } from '../services/cita.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Box, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/ArrowBackIos';

export default function CitaForm({ cita, fecha }) {
    const router = useNavigate();
    const { id } = useParams();

    const [error] = React.useState({
        error: false,
        message: ''
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: cita ? cita : {}
    });

    useEffect(() => {
        if (fecha) {
            const fechaFormateada = fecha.replace(/\//g, '-');
            const partes = fechaFormateada.split("-");
            if (partes.length === 3) {
                const fechaFinal = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
                setValue('date', fechaFinal);
            } else {
                console.log('Formato de fecha incorrecto: ', fecha);
            }
        } else {
            setValue('date', '');
        }
    }, [fecha, setValue]);



    const onSubmit = async (data) => {
        const partes = data.date.split("-");
        const fechaFormateada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        const newData = { ...data, date: fechaFormateada };

        if (cita) {
            const res = await updateCita(id, newData);
            console.log(res);
        } else {
            const res = await createCita(newData);
            console.log(res);
        }
        router('/citas');
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <TextField
                    id="name"
                    label="Nombre"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register('name', { required: true })}
                />
            </div>


            <div>
                <FormControl variant="filled" fullWidth>
                    <InputLabel id="typeOfRequest-label">Tipo de solicitud</InputLabel>
                    <Select
                        id="typeOfRequest"
                        label="Tipo de solicitud"
                        variant="filled"
                        autoComplete='off'
                        error={error.error}
                        fullWidth
                        defaultValue={cita ? cita.typeOfRequest : ''}
                        {...register('typeOfRequest', { required: true })}
                    >
                        <MenuItem value="Ampliación">Ampliación</MenuItem>
                        <MenuItem value="Construcción">Construcción</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <TextField
                    id="address"
                    label="Direccion"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register('address', { required: true })}
                />
            </div>
            <div>
                <TextField
                    id="date"
                    label="Fecha"
                    type="date"
                    variant="filled"
                    autoComplete='off'
                    defaultValue=''
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    {...register('date', { required: true })}
                />
            </div>
            <div>
                <TextField
                    id="hour"
                    label="Hora"
                    type="time"
                    variant="filled"
                    autoComplete='off'
                    defaultValue=''
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    {...register('hour', { required: true })}
                />
            </div>
            {cita && (
                <>
                    <div>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="status-label">Estado</InputLabel>
                            <Select
                                id="status"
                                label="Estado"
                                variant="filled"
                                autoComplete='off'
                                error={error.error}
                                fullWidth
                                defaultValue={cita.status}
                                {...register('status', { required: true })}
                            >
                                <MenuItem value="Pendiente">Pendiente</MenuItem>
                                <MenuItem value="Aprobado">Aprobado</MenuItem>
                                <MenuItem value="Rechazado">Rechazado</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="visitRealizated-label">Realizada</InputLabel>
                            <Select
                                id="visitRealizated"
                                label="Realizada"
                                variant="filled"
                                autoComplete='off'
                                error={error.error}
                                fullWidth
                                defaultValue={cita.visitRealizated}
                                {...register('visitRealizated', { required: true })}
                            >
                                <MenuItem value="No">No</MenuItem>
                                <MenuItem value="Si">Si</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </>
            )}


            {errors.exampleRequired && <span>Este campo es obligatorio</span>}
            <br />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button
                        type="button"
                        variant="contained"
                        fullWidth
                        sx={{ ml: 0 }}
                        onClick={() => router('/citas')}
                    >
                        <CancelIcon />
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        <SaveIcon />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}