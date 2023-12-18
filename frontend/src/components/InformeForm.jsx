import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createInforme, updateInforme } from "../services/informe.service";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Box, MenuItem, FormControl, InputLabel, Select, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSnackbar } from "notistack";

export default function InformeForm({ informe }) {
    const router = useNavigate();
    const { id } = useParams();

    const { enqueueSnackbar } = useSnackbar();
    const [error] = React.useState({
        error: false,
        message: "",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm({
        defaultValues: informe ? informe : {}
    });

    // useEffect(() => {
    //     getFeedback(id).then((res) => {
    //       if (Array.isArray(res) && res.length > 0) {
    //         setFeedback(res[0]);
    //       }
    //     });
    //   }, [id]);

    const onSubmit = async (data) => {
        console.log(data)
        console.log(errors)

        if (informe) {
            const res = await updateInforme(id, data);
            enqueueSnackbar('Informe modificado correctamente', { variant: 'success' });
            console.log(res);
        } else {
            const res = await createInforme(data);
            enqueueSnackbar('Informe creado correctamente', { variant: 'success' });
            console.log(res);
        }
        router('/informe');
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box position="relative" width="100%">
                <TextField
                    id="solicitante"
                    label="Solicitante"
                    variant="filled"
                    autoComplete="off"
                    fullWidth
                    {...register("solicitante", { 
                        required: 'El Nombre del Solicitante es Obligatorio',
                        minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres'},
                        pattern: { value: /^[A-Za-z ]+$/i, message: 'El nombre solo debe contener letras'}
                    })}
                />
                {errors.solicitante && errors.solicitante.type !== "minLength" && errors.solicitante.type !== "pattern" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.solicitante.message}</p>}
                {errors.solicitante && errors.solicitante.type === "minLength" && <p style={{ position: 'absolute', right: '-157.2%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.solicitante.message}</p>}
                {errors.solicitante && errors.solicitante.type === "pattern" && <p style={{ position: 'absolute', right: '-130.1%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.solicitante.message}</p>}
            </Box>

            <div>
                <FormControl variant="filled" style={{ position: 'relative'}} fullWidth>
                    <InputLabel id="TipoObra">Tipo De Obra</InputLabel>
                    <Controller
                        name="TipoObra"
                        control={control}
                        defaultValue={informe && informe.TipoObra ? informe.TipoObra : ''}
                        rules={{ required: 'El Tipo de Obra es Obligatorio' }}
                        render={({ field }) => (
                            <Select
                                id="TipoObra"
                                label="Tipo De Obra"
                                variant="filled"
                                error={errors.error}
                                fullWidth
                                {...field}
                            >
                                <MenuItem value="Ampliación">Ampliación</MenuItem>
                                <MenuItem value="Construcción">Construcción</MenuItem>
                            </Select>
                        )}
                    />
                    {errors.TipoObra && <p className="my-error"> {errors.TipoObra.message}</p>}
                </FormControl>
            </div>

            <Box position="relative" width="100%">
                <TextField
                    id="ubicacion"
                    label="Ubicación"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register("ubicacion", { 
                        required: 'La Ubicacion es Obligatoria',
                        minLength: { value: 2, message: 'La Ubicacion debe tener al menos 2 caracteres'},
                    })}
                />
                {errors.ubicacion && errors.ubicacion.type !== "minLength" && errors.ubicacion.type !== "pattern" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.ubicacion.message}</p>}
                {errors.ubicacion && errors.ubicacion.type === "minLength" && <p style={{ position: 'absolute', right: '-157.2%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.ubicacion.message}</p>}
            </Box>

            <Box position="relative" width="100%">
                <TextField
                    id="D"
                    label="Descripción"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register("D", { 
                        required: 'La Descripcion es Obligatoria',
                        minLength: { value: 2, message: 'La Descripcion debe tener al menos 2 caracteres'},
                    })}
                />
                {errors.D && errors.D.type !== "minLength" && errors.D.type !== "pattern" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.D.message}</p>}
                {errors.D && errors.D.type === "minLength" && <p style={{ position: 'absolute', right: '-157.2%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.D.message}</p>}
            </Box>

            <Box position="relative" width="100%">
                <TextField
                    id="observaciones"
                    label="Observaciones"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register("observaciones", { 
                        required: 'Las Observaciones son Obligatorios',
                        minLength: { value: 2, message: 'Las Observaciones deben tener al menos 2 caracteres'},
                    })}
                />
                {errors.observaciones && errors.observaciones.type !== "minLength" && errors.observaciones.type !== "pattern" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.observaciones.message}</p>}
                {errors.observaciones && errors.observaciones.type === "minLength" && <p style={{ position: 'absolute', right: '-157.2%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.observaciones.message}</p>}
            </Box>
            
            <div>
                <FormControl variant="filled" style={{ position: 'relative'}} fullWidth>
                    <InputLabel id="estado">Estado</InputLabel>
                    <Controller
                        name="estado"
                        control={control}
                        defaultValue={informe && informe.estado ? informe.estado : ''}
                        rules={{ required: 'El Estado es Obligatorio' }}
                        render={({ field }) => (
                            <Select
                                id="estado"
                                label="Estado"
                                variant="filled"
                                error={errors.error}
                                fullWidth
                                {...field}
                            >
                                <MenuItem value="Pendiente">Pendiente</MenuItem>
                                <MenuItem value="Aprobado">Aprobado</MenuItem>
                                <MenuItem value="Rechazado">Rechazado</MenuItem>
                            </Select>
                        )}
                    />
                    {errors.estado && <p className="my-error"> {errors.estado.message}</p>}
                </FormControl>
            </div>

            <br />

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ ml: 0 }}
                        onClick={() => router("/feedback")}
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
};
