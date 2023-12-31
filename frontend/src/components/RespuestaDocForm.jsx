import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createRespuesta,
  updateRespuesta,
} from "../services/respuestaDoc.service";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSnackbar } from "notistack";

export default function RespuestaForm({ respuesta }) {
  const router = useNavigate();
  const { id } = useParams();
  const today = new Date();
  const formattedDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const { enqueueSnackbar } = useSnackbar();
  const [error] = useState({
    error: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({ defaultValues: respuesta ? respuesta : {} });

  useEffect(() => {
    setValue("fecha", formattedDate);
  }, [respuesta, setValue]);

  const onSubmit = async (data) => {
    console.log("data: ", data);
    if (respuesta) {
      const res = await updateRespuesta(id, data);
      enqueueSnackbar("Respuesta actualizada con éxito", {
        variant: "success",
      });
    } else {
      const res = await createRespuesta(data);
      console.log("res: ", res);
      enqueueSnackbar("Respuesta creada con éxito", { variant: "success" });
    }
    router("/respuesta");
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box position="relative" width="100%">
        <TextField
          id="nombre"
          label="Nombre"
          variant="filled"
          autoComplete="off"
          fullWidth
          {...register("nombre", {
            required: "El nombre es requerido",
            minLength: {value: 3, message: "El nombre debe tener al menos 3 caracteres"},
            pattern: {
              value: /^[A-Za-z\s]+(\s[A-Za-z]\d+)?$/,
              message: 'El nombre debe contener solo letras'
            },
          })}
        />
        {errors.nombre && errors.nombre.type !== "minLength" && (
          <p
            style={{
              position: "absolute",
              right: "-88.8%",
              top: "25%",
              transform: "translateY(-50%)",
              color: "red",
            }}
          >
            {errors.nombre.message}
          </p>
        )}
        {errors.nombre && errors.nombre.type === "minLength" && (
          <p
            style={{
              position: "absolute",
              right: "-157.2%",
              top: "25%",
              transform: "translateY(-50%)",
              color: "red",
            }}
          >
            {errors.nombre.message}
          </p>
        )}
        {errors.nombre && errors.nombre.type === "pattern" && (
          <p
            style={{
              position: "absolute",
              right: "-88.8%",
              top: "25%",
              transform: "translateY(-50%)",
              color: "red",
            }}
          >
            {errors.nombre.message}
          </p>
        )}
      </Box>

      <Box position="relative" width="100%">
        <TextField
          id="rut"
          label="Rut"
          variant="filled"
          autoComplete="off"
          fullWidth
          {...register("rut", {
            required: "El rut es requerido",
            pattern: {
              value: /^[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}$/,
              message: "El formato debe ser XX.XXX.XXX-X",
            },
          })}
        />
        {errors.rut && errors.rut.type === "pattern" && (
          <p
            style={{
              position: "absolute",
              right: "-88.8%",
              top: "25%",
              transform: "translateY(-50%)",
              color: "red",
            }}
          >
            {errors.rut.message}
          </p>
        )}
      </Box>

      {respuesta && (
        <>
          <div>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                id="estado"
                label="Estado"
                variant="filled"
                autoComplete="off"
                error={error.error}
                fullWidth
                defaultValue={respuesta.estado}
                {...register("estado", { required: true })}
              >
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="Aprobado">Aprobado</MenuItem>
                <MenuItem value="Rechazado">Rechazado</MenuItem>
              </Select>
            </FormControl>
          </div>
        </>
      )}

      <Box position="relative" width="100%">
        <TextField
          id="descripcion"
          label="Descripción"
          variant="filled"
          autoComplete="off"
          fullWidth
          {...register("descripcion", {
            required: "La descripción es requerida",
            minLength: {
              value: 3,
              message: "La descripción debe tener al menos 3 caracteres",
            },
          })}
        />
        {errors.descripcion && errors.descripcion.type !== "minLength" && (
          <p
            style={{
              position: "absolute",
              right: "-88.8%",
              top: "25%",
              transform: "translateY(-50%)",
              color: "red",
            }}
          >
            {errors.descripcion.message}
          </p>
        )}
        {errors.descripcion && errors.descripcion.type === "minLength" && (
          <p
            style={{
              position: "absolute",
              right: "-157.2%",
              top: "25%",
              transform: "translateY(-50%)",
              color: "red",
            }}
          >
            {errors.descripcion.message}
          </p>
        )}
      </Box>

      <Box position="relative" width="100%">
        <TextField
          id="fecha"
          label="Fecha"
          variant="filled"
          autoComplete="off"
          fullWidth
          type="date"
          {...register("fecha", { required: "La fecha es requerida" })}
        />
        {errors.fecha && (
          <p
            style={{
              position: "absolute",
              right: "-88.8%",
              top: "25%",
              transform: "translateY(-50%)",
              color: "red",
            }}
          >
            {errors.fecha.message}
          </p>
        )}
      </Box>

      {error.exampleRequired && <span>Este campo es obligatorio</span>}
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            fullWidth
          >
            Guardar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            type="button"
            variant="contained"
            startIcon={<CancelIcon />}
            fullWidth
            onClick={() => router("/respuesta")}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
