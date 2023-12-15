import { getRespuesta } from "../../../services/respuestaDoc.service";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const RespuestaDoc = () => {
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
            onClick={() => router(`/respuestas/create/`)}
            >
            Agregar Respuesta
            </Button>
        </Grid>
    
        <div className="Listado">
            {respuesta.map((respuesta) => (
            <div key={respuesta._id}>
                <h3>{respuesta.solicitante}</h3>
                <p>{respuesta.fecha}</p>
                <p>{respuesta.comentarios}</p>
                <p>{respuesta.estado}</p>
                <Button
                type="button"
                variant="contained"
                onClick={() => router(`/respuestas/update/${respuesta._id}`)}
                >
                Editar
                </Button>
                <Button
                type="button"
                variant="contained"
                onClick={() => router(`/respuestas/delete/${respuesta._id}`)}
                >
                Eliminar
                </Button>
            </div>
            ))}
        </div>
        </>
    );
    }

export default RespuestaDoc;