import { getFeedbacks, getFeedback } from "../../services/feedback.service";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/LibraryAdd";
import InfoIcon from "@mui/icons-material/Visibility";

const Feedback = () => {
    const router = useNavigate();
    const [feedback, setFeedback] = useState([]);
    
    useEffect(() => {
        getFeedbacks().then((res) => {
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
            ml: "85%",
            }}
        >
            <Button
            type="button"
            variant="contained"
            onClick={() => router(`/citas/listado`)}
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
                    onClick={() => router(`/feedback/${feedback._id}`)}
                >
                    {/*Ver Retroalimentacion*/}
                    <InfoIcon />
                </Button>

                <Button
                    type="button"
                    variant="contained"
                    onClick={() => router(`/feedback/update/${feedback._id}`)}
                >
                    {/*Editar*/}
                    <EditIcon />
                </Button>

                <Button
                    type="button"
                    variant="contained"
                    onClick={() => router(`/feedback/delete/${feedback._id}`)}
                >
                    {/*Eliminar*/}
                    <DeleteIcon />
                </Button>

                <Button type="button" variant="contained" onClick={() => router(`/informe/create/${feedback._id}`)}>
                    Informe
                </Button>
            </div>
            ))}
            <br />
        </div>
        </>
    );
    };

export default Feedback;