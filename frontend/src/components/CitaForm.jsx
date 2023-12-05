// CitaForm.jsx
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { createCita, updateCita } from '../services/cita.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Box } from '@mui/material'
//form controller 

export default function CitaForm({ cita }) {
    const router = useNavigate();
    const { id, fecha } = useParams();

    const [error, setError] = React.useState({
        error: false,
        message: ''
    });

const validateTypeOfRequest = (value) => {
    if (value ==='Ampliacion' || value === 'Construccion') {
        return true;
    }
    else 
        return false;
}

    const [typeOfRequest, setTypeOfRequest] = React.useState('');
    const [date, setDate] = React.useState('');
    const [hour, setHour] = React.useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: cita ? cita : {}
    });

    // Establecemos el valor inicial del campo de fecha con la fecha de la ruta
    useEffect(() => {
        if (fecha) {
            // Convertimos la fecha al formato año-mes-dia
            const partes = fecha.split("-");
            const fechaFormateada = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;

            reset({ date: fechaFormateada });
        }
    }, [fecha, reset]);

    const onSubmit = async (data) => {
        if (cita) {
            const res = await updateCita(id, data);
            console.log(res);
        } else {
            const res = await createCita(data);
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
                        variant="filled"
                        autoComplete='off'
                        {...register('date', { required: true })}
                    />
                </div>
                <div>
                    <TextField
                        id="hour"
                        label="Hora"
                        variant="filled"
                        autoComplete='off'
                        {...register('hour', { required: true })}
                    />
                </div>
                {errors.exampleRequired && <span>Este campo es obligatorio</span>}
                {/* Llamar a JOI para ver los errores */}
                <br />
                <Button type="button" variant="contained" onClick={() => router('/citas')}>Cancelar</Button>
                <Button type="submit" variant="contained" >Guardar</Button>
            </Box>
    );
}
