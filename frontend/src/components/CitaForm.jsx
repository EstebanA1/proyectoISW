// CitaForm.jsx
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { createCita, updateCita } from '../services/cita.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Box } from '@mui/material'

export default function CitaForm({ cita, fecha }) {
    const router = useNavigate();
    const { id } = useParams();

    const [error, setError] = React.useState({
        error: false,
        message: ''
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        defaultValues: cita ? cita : {}
    });

    useEffect(() => {
        if (fecha) {
            const partes = fecha.split("-");
            const fechaFormateada = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;

            setValue('date', fechaFormateada);
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
                    {...register('name', { required: true })}
                />
            </div>
            <div>
                <TextField
                    id="typeOfRequest"
                    label="Tipo de solicitud"
                    variant="filled"
                    autoComplete='off'
                    error={error.error}
                    {...register('typeOfRequest', { required: true })}
                />
            </div>
            <div>
                <TextField
                    id="address"
                    label="Direccion"
                    variant="filled"
                    autoComplete='off'
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
                    {...register('hour', { required: true })}
                />
            </div>
            {errors.exampleRequired && <span>Este campo es obligatorio</span>}
            <br />
            <Button type="button" variant="contained" onClick={() => router('/citas')}>Cancelar</Button>
            <Button type="submit" variant="contained" >Guardar</Button>
        </Box>
    );
}
