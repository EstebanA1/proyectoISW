import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createFeedback } from "../services/feedback.service";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";

export default function FeedbackForm({ feedback }) {
    const router = useNavigate();
    const { id } = useParams();
    
    const [error, setError] = React.useState({
        error: false,
        message: "",
    });

    //Imagenes
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectStatus, setSelectStatus] = useState("pendiente");

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setSelectedImage(imageFile);
    };

    const handleImageUpload = () => {
    // Aquí puedes agregar lógica para subir la imagen a tu servidor o realizar alguna acción con la imagen seleccionada.
    // Por ejemplo, puedes usar una biblioteca como Axios para realizar una solicitud POST al servidor.
        console.log('Subiendo imagen:', selectedImage);

    // Limpiar el estado después de subir la imagen
        setSelectedImage(null);
    };
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        defaultValues: feedback ? feedback : {},
    });
    
    useEffect(() => {
        if (feedback) {
        setValue("solicitante", feedback.solicitante);
        setValue("fecha", feedback.fecha);
        //setValue("informe", feedback.informe);
        setValue("comentarios", feedback.comentarios);
        //setValue("imagenes", feedback.imagenes);
        setValue("estado", feedback.estado);
        }
    }, [feedback, setValue]);
    
    const onSubmit = async (data) => {
        const res = await createFeedback(id, data);
        console.log(res);
        router("/feedback");
    };
    
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: '100%',
        }}
        >
        <div>
            <TextField
            id="solicitante"
            label="Nombre del Solicitante"
            variant="filled"
            autoComplete="off"
            sx={{ width: '100%'}}
            {...register("solicitante", { required: true })}
            />
        </div>
        <div>
            <TextField
            id="fecha"
            label="Fecha de Visita"
            variant="filled"
            autoComplete="off"
            sx={{ width: '100%'}}
            {...register("fecha", { required: true })}
            />
        </div>
        <div>
            <TextField
            id="comentarios"
            label="Comentarios"
            variant="filled"
            autoComplete="off"
            sx={{ width: '100%'}}
            {...register("comentarios", { required: true })}
            />
        </div>
        <div>
            <label style={{ color: 'black' }} sx={{ width: '100%'}}> Estado: </label>
            <select defaultValue="pendiente"{...register("estado", { required: true })}>
                <option value="pendiente">Pendiente</option>
                <option value="aprobado">Aprobado</option>
                <option value="rechazado">Rechazado</option>
            </select>
        </div>
        <div>
            <label style={{ color: 'black' }} sx={{ width: '100%'}} >Subir Imagen:</label>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {selectedImage && (<img src={URL.createObjectURL(selectedImage)} alt="Vista Previa" style={{ maxWidth: '100%', marginTop: '10px', color: 'black' }} />)}
        </div>
        <div>
            <Button type="button" variant="contained" onClick={() => router('/informe/create/${feedback._id}')} sx={{ width: '100%'}}>Informe</Button>
            {/*...register("informe", { required: true })*/}
        </div>
        <Button 
            onClick={handleImageUpload} 
            disabled={!selectedImage } 
            type="submit" 
            variant="contained" 
            sx={{ width: '50%'}}>
                Guardar
        </Button>
        </Box>
    );
    }