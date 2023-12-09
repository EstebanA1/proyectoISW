import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
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
        control,
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

        console.log(data)
        console.log(errors)

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
            <Box position="relative" width="100%">
                <TextField
                    id="name"
                    label="Nombre"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register('name', { required: 'El nombre es obligatorio', minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' } })}
                />
                {errors.name && errors.name.type !== "minLength" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.name.message}</p>}
                {errors.name && errors.name.type === "minLength" && <p style={{ position: 'absolute', right: '-157.2%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.name.message}</p>}
            </Box>
            <div>
                <FormControl variant="filled" style={{ position: 'relative' }} fullWidth>
                    <InputLabel id="typeOfRequest-label">Tipo de solicitud</InputLabel>
                    <Controller
                        name="typeOfRequest"
                        control={control}
                        defaultValue={cita && cita.typeOfRequest ? cita.typeOfRequest : ''}
                        rules={{ required: 'El tipo es obligatorio' }}
                        render={({ field }) => (
                            <Select
                                id="typeOfRequest"
                                label="Tipo de solicitud"
                                variant="filled"
                                autoComplete='off'
                                error={error.error}
                                fullWidth
                                {...field}
                            >
                                <MenuItem value="Ampliación">Ampliación</MenuItem>
                                <MenuItem value="Construcción">Construcción</MenuItem>
                            </Select>
                        )}
                    />
                    {errors.typeOfRequest && <p className="my-error2">{errors.typeOfRequest.message}</p>}
                </FormControl>
            </div>

            <Box position="relative" width="100%">
                <TextField
                    id="address"
                    label="Direccion"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register('address', {
                        required: 'La dirección es obligatoria',
                        pattern: {
                            value: /^[A-Za-z\s]+\s#\d+$/,
                            message: 'La dirección debe tener un formato de tipo calle (Nombre + #Número)'
                        }
                    })}
                />
                {errors.address && errors.address.type === "pattern" && <p style={{ position: 'absolute', right: '-253%', top: '20%', transform: 'translateY(-50%)', color: 'red' }}>{errors.address.message}</p>}
                {errors.address && errors.address.type !== "pattern" && <p style={{ position: 'absolute', right: '-93.8%', top: '20%', transform: 'translateY(-50%)', color: 'red' }}>{errors.address.message}</p>}
            </Box>

            <Box position="relative" width="100%">
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
                    {...register('date', {
                        required: 'La fecha es obligatoria',
                        validate: {
                            notInFuture: value => new Date(value) <= new Date(new Date().setFullYear(new Date().getFullYear() + 1)) || 'La fecha no puede ser mayor a un año a partir de hoy',
                            notBeforeTomorrow: value => new Date(value) >= new Date(new Date().setDate(new Date().getDate() + 1)) || 'La fecha no puede ser menor que la de mañana'
                        }
                    })}
                />
                {errors.date && errors.date.type === "notInFuture" && <p style={{ position: 'absolute', right: '-192.5%', top: '20%', transform: 'translateY(-50%)', color: 'red' }}>{errors.date.message}</p>}
                {errors.date && errors.date.type === "notBeforeTomorrow" && <p style={{ position: 'absolute', right: '-171.5%', top: '20%', transform: 'translateY(-50%)', color: 'red' }}>{errors.date.message}</p>}
                {errors.date && errors.date.type === "required" && <p style={{ position: 'absolute', right: '-81.2%', top: '20%', transform: 'translateY(-50%)', color: 'red' }}>{errors.date.message}</p>}
            </Box>

            <Box position="relative" width="100%">
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
                    {...register('hour', {
                        required: 'La hora es obligatoria',
                        validate: {
                            inRange: value => (value >= "08:00" && value <= "17:00") || 'La hora debe estar entre las 08:00 y las 17:00'
                        }
                    })}
                />
                {errors.hour && errors.hour.type === "inRange" && <p style={{ position: 'absolute', right: '-159.5%', top: '20%', transform: 'translateY(-50%)', color: 'red' }}>{errors.hour.message}</p>}
                {errors.hour && errors.hour.type === "required" && <p style={{ position: 'absolute', right: '-78.2%', top: '20%', transform: 'translateY(-50%)', color: 'red' }}>{errors.hour.message}</p>}
            </Box>

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