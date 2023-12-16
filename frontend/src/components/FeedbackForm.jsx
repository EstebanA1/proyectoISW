import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { createFeedback, updateFeedback } from "../services/feedback.service";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Box, MenuItem, FormControl, InputLabel, Select, Grid, Paper, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSnackbar } from "notistack";

export default function FeedbackForm({ feedback, solicitante }) {
    const router = useNavigate();
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = React.useState(null);
    
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setSelectedImage(imageFile);
    };
    
    //Arreglar logica para subir imagen
    const handleImageUpload = () => {
        console.log('Subiendo imagen:', selectedImage);
        setSelectedImage(null);
    };

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
        defaultValues: feedback ? feedback : {},
    });

    useEffect(() => {
        if (feedback) {
            setValue("solicitante", feedback.solicitante);
            setValue("fechaVisita", feedback.fechaVisita);
            setValue("comentarios", feedback.comentarios);
            setValue("estado", feedback.estado);
        }
    }, [feedback, setValue]);

    const onSubmit = async (data) => {
        const newData = { ...data, solicitante: solicitante };

        if (feedback) {
            const res = await updateFeedback(id, newData);
            enqueueSnackbar("Retroalimentacion actualizada", { variant: "success" });
            console.log(res);
        } else {
            const res = await createFeedback(newData);
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
                    {...register("solicitante", { required: 'El Nombre del Solicitante es Obligatorio' })}
                    error={errors.solicitante}
                />
            </Box>
            <Box position="relative" width="100%">
                <TextField
                    id="fechaVisita"
                    label="Fecha Visita"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register("fecha", { required: 'La Fecha es Obligatoria' })}
                    error={errors.fecha}
                />
            </Box>
            <Box position="relative" width="100%">
                <TextField
                    id="comentarios"
                    label="Comentarios"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register("comentarios", { required: 'Los Comentarios son Obligatorios', minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres'} })}
                    error={errors.comentarios}
                />
            </Box>
            <div>
                <FormControl variant="filled" style={{ position: 'relative'}} fullWidth>
                    <InputLabel id="estado">Estado</InputLabel>
                    <Controller
                        name="estado"
                        control={control}
                        defaultValue={feedback && feedback.estado ? feedback.estado : ""}
                        rules={{ required: 'El Estado es Obligatorio' }}
                        render={({ field }) => (
                            <Select
                                id="estado"
                                label="Estado"
                                variant="filled"
                                error={errors.estado}
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
            <div>
                <label style={{ color: 'black' }}>Subir Imagen:</label>
                <input type="file" onChange={handleImageChange} accept="image/*" />
                {selectedImage && (<img src={URL.createObjectURL(selectedImage)} alt="Vista Previa" style={{ maxWidth: '100%', marginTop: '10px', color: 'black' }} />)}
            </div>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        startIcon={<CancelIcon />}
                        onClick={() => router("/citas/listado")}
                    >
                        Cancelar
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        onClick={handleImageUpload} 
                        variant="contained"
                        color="success"
                        fullWidth
                        endIcon={<SaveIcon />}
                        type="submit"
                        sx={{ width: '50%'}}
                    >
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </Box>

    );
}

