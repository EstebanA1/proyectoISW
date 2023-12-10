import { getFeedback } from "../../services/feedback.service";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
    const [feedback, setFeedback] = useState([]);
    const router = useNavigate();
    
    useEffect(() => {
        getFeedback().then((res) => {
        setFeedback(res);
        });
    }, []);
    
    useEffect(() => {
        console.log(feedback);
    }, [feedback]);
    
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
            <h1>Listado de Retroalimentaciones</h1>
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
            onClick={() => router(`/feedback/create/`)}
            >
            Agregar Retroalimentacion
            </Button>
        </Grid>
    
        <div className="Listado">
            {feedback.map((feedback) => (
            <div key={feedback._id}>
                <h3>{feedback.solicitante}</h3>
                <p>{feedback.fecha}</p>
                <p>{feedback.comentarios}</p>
                <p>{feedback.estado}</p>
                <Button
                    type="button"
                    variant="contained"
                    onClick={() => router(`/feedback/update/${feedback._id}`)}
                >
                    Editar
                </Button>

                <Button
                    type="button"
                    variant="contained"
                    onClick={() => router(`/feedback/delete/${feedback._id}`)}
                >
                    Eliminar
                </Button>
            </div>
            ))}
            <br />
        </div>
        </>
    );
    };

export default Feedback;