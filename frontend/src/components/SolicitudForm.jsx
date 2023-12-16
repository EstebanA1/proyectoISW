import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSolicitud } from "../services/solicitud.service";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";

export default function SolicitudForm({ solicitud }) {
    const router = useNavigate();
    const { id } = useParams();
    
    const [error, setError] = React.useState({
        error: false,
        message: "",
    });

    //ArchivoPDF
    const [selectedArchivo, setSelectedArchivo] = useState(null);

    const handleArchivoChange = (event) => {
        const ArchivoFile = event.target.files[0];
        setSelectedArchivo(ArchivoFile);
    };

    const handleArchivoUpload = () => {
    // Aquí puedes agregar lógica para subir un pdf a tu servidor o realizar alguna acción con el archivo seleccionado.
    // Por ejemplo, puedes usar una biblioteca como Axios para realizar una solicitud POST al servidor.
        console.log('Subiendo Archivo:', selectedArchivo);

    // Limpiar el estado después de subir el pdf.
        setSelectedArchivo(null);
    };
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: solicitud ? solicitud : {},
    });
    
    useEffect(() => {
        if (solicitud) {
        setValue("nombre", solicitud.nombre);
        setValue("tipo", solicitud.tipo);
        setValue("rut", solicitud.rut);
        setValue("estado", solicitud.estado);
        setValue("archivoPDF", solicitud.archivoPDF);
        }
    }, [solicitud, setValue]);
    
    const onSubmit = async (data) => {
        const res = await createSolicitud(id, data);
        console.log(res);
        router("/solicitud");
    };
    
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
                    <InputLabel id="tipo">Tipo de solicitud</InputLabel>
                    <Controller
                        name="tipo"
                        control={control}
                        defaultValue={solicitud && solicitud.tipo ? solicitud.tipo : ''}
                        rules={{ required: 'El tipo es obligatorio' }}
                        render={({ field }) => (
                            <Select
                                id="tipo"
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
                    {errors.tipo && <p className="my-error2">{errors.tipo.message}</p>}
                </FormControl>
            </div>
            <Box position="relative" width="100%">
                <TextField
                    id="rut"
                    label="Rut"
                    variant="filled"
                    autoComplete='off'
                    fullWidth
                    {...register('rut', {
                        required: 'El Rut es obligatorio',
                        pattern: {
                            value: /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/,
                            message: 'El rut debe tener un formato de tipo (xx.xxx.xxx-x)'
                        }
                    })}
                />
                {errors.rut && errors.rut.type === "pattern" && <p style={{ position: 'absolute', right: '-253%', top: '20%', transform: 'translateY(-50%)', color: 'red' }}>{errors.rut.message}</p>}
                {errors.rut && errors.rut.type !== "pattern" && <p style={{ position: 'absolute', right: '-93.8%', top: '20%', transform: 'translateY(-50%)', color: 'red' }}>{errors.rut.message}</p>}
            </Box>
            <Box position="relative" width="100%">
                <TextField
                    id="fecha"
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
                            notBeforeTomorrow: value => new Date(value) >= new Date(new Date().setDate(new Date().getDate())) || 'La fecha no puede ser menor que la de mañana'
                        }
                    })}
                />
                {errors.date && errors.date.type === "notInFuture" && <p style={{ position: 'absolute', right: '-192.5%', top: '20%', transform: 'translateY(-50%)', color: 'red' }}>{errors.date.message}</p>}
                {errors.date && errors.date.type === "notBeforeTomorrow" && <p style={{ position: 'absolute', right: '-171.5%', top: '20%', transform: 'translateY(-50%)', color: 'red' }}>{errors.date.message}</p>}
                {errors.date && errors.date.type === "required" && <p style={{ position: 'absolute', right: '-81.2%', top: '20%', transform: 'translateY(-50%)', color: 'red' }}>{errors.date.message}</p>}
            </Box>
        <div>
            <TextField
            id="archivoPDF"
            label="Archivos"
            variant="filled"
            autoComplete="off"
            sx={{ width: '100%'}}
            {...register("archivoPDF", { required: true })}
            />
        </div>
        <div>
            <label style={{ color: 'black' }} sx={{ width: '100%'}} >Subir Archivo:</label>
            <input type="file" onChange={handleArchivoChange} accept=".pdf/*" />
            {selectedArchivo && (<img src={URL.createObjectURL(selectedArchivo)} alt="Vista Previa" style={{ maxWidth: '100%', marginTop: '10px', color: 'black' }} />)}
        </div>
        <div>
            <Button type="button" variant="contained" onClick={() => router('/archivoPDF/create/${solicitud._id}')} sx={{ width: '100%'}}>Archivo</Button>
            {/*...register("informe", { required: true })*/}
        </div>
        <Button 
            onClick={handleArchivoUpload} 
            disabled={!selectedArchivo } 
            type="submit" 
            variant="contained" 
            sx={{ width: '50%'}}>
                Guardar
        </Button>
        </Box>
    );
    }