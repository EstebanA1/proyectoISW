import { getFeedbacks } from "../../services/feedback.service";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/LibraryAdd";
import InfoIcon from "@mui/icons-material/Visibility";

import { handleDelete } from "./DetailsFeedback";
import { useSnackbar } from "notistack";

const Feedback = () => {
    const router = useNavigate();
    const [feedback, setFeedback] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    
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

    
        <Grid
            sx={{
            display: "flex",
            alignItems: "right",
            justifyContent: "flex-end",
            mr: 2,
            ml: "70%",
            }}
        >
            <div>
            <input type="text" placeholder="Buscar"
            onChange={(event) => setSearchTerm(event.target.value)}
            style={{
                backgroundColor: "lightgray",
                borderColor: "white",
                borderRadius: "5px",
                color: "black", ":focus": {backgroundColor: "white"}
            }}
            />
            </div>
            <div>
            <Button type="button" variant="contained"
            onClick={() => router(`/citas/listado`)}
            >
            Agregar Retroalimentacion
            </Button>
            </div>
        </Grid>
    
        <Box sx={{ overflowY: "auto" }}>
            <Box sx={{ mr: 2 }}>
            {feedback.filter((feedback) => feedback.solicitante.toLowerCase().includes(searchTerm.toLowerCase())).map((feedback, index) => (
                <div key={feedback._id}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{index + 1}.</span>
                    <span>{feedback.solicitante}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <h5>{feedback.estado}</h5>
                </div>
                
                {/*<div style={{ display: "flex", justifyContent: "end" }}>
                    <h5>{feedback.fechaVisita}</h5>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <h5>{feedback.comentarios}</h5>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <h5>{feedback.imagenes}</h5>
                </div>*/}

                <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/feedback/${feedback._id}`)}><InfoIcon /></Button>
                <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/feedback/update/${feedback._id}`)}><EditIcon /></Button>
                {/*<Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => handleDelete(feedback._id, enqueueSnackbar, router)}><DeleteIcon /></Button>*/}
                
                <Button
                    sx={{ ml: 1, mb: 3, mt: -1 }}
                    type="button"
                    variant="contained"
                    onClick={() => router(`/feedback/delete/${feedback._id}`)}
                >
                    
                    <DeleteIcon />
                </Button>

                
                <div class="lineaNegra"></div>
            </div>
            ))}
            </Box>
        </Box>
            <br />
        </Grid>
        </>
    );
    };

export default Feedback;