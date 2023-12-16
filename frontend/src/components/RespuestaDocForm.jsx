import React, { useEffect , useState} from 'react';
import { useForm } from 'react-hook-form';
import { createRespuesta, updateRespuesta } from "../services/respuestaDoc.service";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Box, Select, MenuItem, FormControl, InputLabel, Grid  } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSnackbar } from 'notistack';

const RespuestaDocForm = () => {
    const { id } = useParams();
    const router = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit, reset } = useForm();
    const [respuesta, setRespuesta] = useState(null);

    useEffect(() => {
        if (id) {
            getRespuesta();
        }
    }, [id]);

    const getRespuesta = async () => {
        try {
            const res = await getRespuesta(id);
            setRespuesta(res);
            reset(res);
        } catch (error) {
            console.log("Error al obtener el registro:", error.response);
        }
    };

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
            router('/respuestas');
        } catch (error) {
            console.log("Error al crear el registro:", error.response);
            enqueueSnackbar('Error al crear la Respuesta', { variant: 'error' });
        }
    };

    return (
        <>
        <Grid
            sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            }}
        >
        </Grid>

        <Grid
            sx={{
            display: "flex",
            alignItems: "right",
            justifyContent: "flex-end",
            mr: 2,
            }}
        >
        </Grid>

        <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
            <TextField
                required
                id="nombre"
                name="nombre"
                label="Nombre"
                variant="outlined"
                defaultValue=""
                {...register("nombre")}
            />
            <TextField
                required
                id="rut"
                name="rut"
                label="Rut"
                variant="outlined"
                defaultValue=""
                {...register("rut")}
            />
            <TextField
                required
                id="descripcion"
                name="descripcion"
                label="Descripción"
                variant="outlined"
                defaultValue=""
                {...register("descripcion")}
            />
            </div>
            <div>
            <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
            >
                Guardar
            </Button>
            <Button
                type="button"
                variant="contained"
                startIcon={<CancelIcon />}
                onClick={() => router(`/respuesta`)}
            >
                Cancelar
            </Button>
            </div>
        </Box>
        </>
    );
}

export default RespuestaDocForm;
