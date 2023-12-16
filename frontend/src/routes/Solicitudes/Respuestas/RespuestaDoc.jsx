import { getRespuesta } from "../../../services/respuestaDoc.service";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";

const Respuestas = () => {
    const [respuesta, setRespuesta] = useState([]);
    const router = useNavigate();

    useEffect(() => {
        getRespuesta().then((res) => {
        setRespuesta(res);
        });
    }, []);

    useEffect(() => {
        console.log(respuesta);
    }, [respuesta]);

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
            <h1>Listado de Respuestas</h1>
        </Grid>

        <Grid
            sx={{
            display: "flex",
            alignItems: "right",
            justifyContent: "flex-end",
            mr: 2,
            }}
        >
            <Button
            type="button"
            variant="contained"
            onClick={() => router(`/respuesta/create/`)}
            >
            Agregar Respuesta
            </Button>
        </Grid>

        <div className="Listado">
            {respuesta.map((respuesta) => (
            <div key={respuesta._id}>
                <h3>{respuesta.nombre}</h3>
                <p>{respuesta.rut}</p>
                <p>{respuesta.descripcion}</p>
                <Button
                    type="button"
                    variant="contained"
                    onClick={() => router(`/respuesta/update/${respuesta._id}`)}
                >
                    Actualizar
                </Button>
            </div>
            ))}
        </div>
        </>
    );

};

export default Respuestas;