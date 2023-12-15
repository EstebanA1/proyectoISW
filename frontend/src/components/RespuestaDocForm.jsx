import React, { useEffect , useState} from 'react';
import { useForm } from 'react-hook-form';
import { createRespuesta } from "../services/respuestaDoc.service";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Box } from '@mui/material';

export default function RespuestaForm({ respuesta }) {
    const router = useNavigate();
    const { id } = useParams();

    const [error, setError] = React.useState({
        error: false,
        message: '',
    });

    const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    } = useForm({
    defaultValues: respuesta ? respuesta : {},
    });

    useEffect(() => {
        if (respuesta) {
            setValue('nombre', respuesta.nombre);
            setValue('rut', respuesta.rut);
            setValue('descripcion', respuesta.descripcion);  
        }
    } , [respuesta, setValue]);

    const onSubmit = async (data) => {
        const res = await createRespuesta(id, data);
        console.log(res);
        router('/respuesta');
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}>
                    <TextField
                        sx={{ width: '50%', marginBottom: '20px' }}
                        id="nombre"
                        label="Nombre"
                        variant="outlined"
                        {...register('nombre', { required: true })}
                    />
                    <TextField
                        sx={{ width: '50%', marginBottom: '20px' }}
                        id="rut"
                        label="Rut"
                        variant="outlined"
                        {...register('rut', { required: true })}
                    />
                    <TextField
                        sx={{ width: '50%', marginBottom: '20px' }}
                        id="descripcion"
                        label="Descripcion"
                        variant="outlined"
                        {...register('descripcion', { required: true })}
                    />
                    <Button
                        sx={{ width: '50%', marginBottom: '20px' }}
                        type="submit"
                        variant="contained"
                    >
                        Enviar
                    </Button>
                </Box>
            </form>
        </div>
    );

}
