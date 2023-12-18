import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createFeedback, updateFeedback } from "../services/feedback.service";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Box, MenuItem, FormControl, InputLabel, Select, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSnackbar } from "notistack";

export default function FeedbackForm({ feedback }) {
    const router = useNavigate();
    const { id } = useParams();
    const today = new Date();
    const formattedDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const [selectedImage, setSelectedImage] = React.useState(null);
    const [fileSelected, setFileSelected] = React.useState(false);
    
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setSelectedImage(imageFile);
        setFileSelected(true);
    };
    
    //Arreglar logica para subir imagen
    const handleImageUpload = () => {
        console.log('Subiendo imagen:', selectedImage);
        setSelectedImage(null);
        setFileSelected(false);
    };

    const { enqueueSnackbar } = useSnackbar();
    const [error] = React.useState({
        error: false,
        message: '',
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm({
        defaultValues: feedback ? feedback : {},
    });

    /*useEffect(() => {
        setValue('fechaVisita', formattedDate);
    }, [respuestaProp, setValue]);*/

    const onSubmit = async (data) => {
        console.log(data);
        console.log(errors)

        /*const res = await createFeedback(data);
        enqueueSnackbar("Retroalimentacion creada", { variant: "success" });
        console.log(res);*/
        

        if (feedback) {
            const res = await updateFeedback(id, data);
            enqueueSnackbar("Retroalimentacion actualizada", { variant: "success" });
            console.log(res);
        } else {
            const res = await createFeedback(data);
            enqueueSnackbar("Retroalimentacion creada", { variant: "success" });
            console.log(res);
        }
        router("/feedback");
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box position="relative" width= '100%'>
                <TextField
                    id="solicitante"
                    label="Nombre Solicitante"
                    variant="filled"
                    autoComplete='off'
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

            <Box position="relative" width="100%">
                <TextField
                    id="fechaVisita"
                    label="Fecha Visita"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register("fechaVisita", { required: 'La Fecha es Obligatoria' })}
                    error={errors.fechaVisita}
                />
            </Box>

            <Box position="relative" width="100%">
                <TextField
                    id="comentarios"
                    label="Comentarios"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register("comentarios", { 
                        required: 'Los Comentarios son Obligatorio',
                        minLength: { value: 2, message: 'Los Comentarios deben tener al menos 2 caracteres'},
                        pattern: { value: /^[A-Za-z ]+$/i, message: 'Los Comentarios solo debe contener letras'}
                    })}
                />
                {errors.comentarios && errors.comentarios.type !== "minLength" && errors.comentarios.type !== "pattern" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.comentarios.message}</p>}
                {errors.comentarios && errors.comentarios.type === "minLength" && <p style={{ position: 'absolute', right: '-157.2%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.comentarios.message}</p>}
                {errors.comentarios && errors.comentarios.type === "pattern" && <p style={{ position: 'absolute', right: '-130.1%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.comentarios.message}</p>}
            </Box>

            <Box position="relative" width="100%">
                <TextField
                    id="detalles"
                    label="Informe Detalles"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register("detalles", { 
                        required: 'Los Detalles del Informe son Obligatorio',
                        minLength: { value: 2, message: 'Los Detalles del Informe deben tener al menos 2 caracteres'},
                    })}
                />
                {errors.detalles && errors.detalles.type !== "minLength" && errors.detalles.type !== "pattern" && <p style={{ position: 'absolute', right: '-88.8%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.detalles.message}</p>}
                {errors.detalles && errors.detalles.type === "minLength" && <p style={{ position: 'absolute', right: '-157.2%', top: '25%', transform: 'translateY(-50%)', color: 'red' }}> {errors.detalles.message}</p>}
            </Box>

            <div>
                <FormControl variant="filled" style={{ position: 'relative'}} fullWidth>
                    <InputLabel id="estado">Estado</InputLabel>
                    <Controller
                        name="estado"
                        control={control}
                        defaultValue={feedback && feedback.estado ? feedback.estado : ''}
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
{/*
            <div>
                <label style={{ color: 'black' }}>Subir Imagen:</label>
                <input type="file" onChange={handleImageChange} accept="image/*" multiple={false}/>
                {fileSelected && selectedImage && (<img src={URL.createObjectURL(selectedImage)} alt="Vista Previa" style={{ maxWidth: '50%', marginTop: '10px', color: 'black' }} />)}
            </div>
                        */}

            <br />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ ml: 0 }}
                        onClick={() => router("/citas/listado")}
                    >
                        <CancelIcon />
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        //onClick={handleImageUpload} 
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

