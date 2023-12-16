import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/LibraryAdd";
import InfoIcon from "@mui/icons-material/Visibility";
import { getSolicitud } from "../../services/solicitud.service";

const Solicitud = () => {
    const router = useNavigate();
    const [solicitud, setSolicitud] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        getSolicitud().then((res) => {
            if (Array.isArray(res)) {
                setSolicitud(res);
            } else {
                console.error("La respuesta no es un array:", res);
            }
        }).catch(error => {
            console.error("Error al obtener respuestas:", error);
        });
    }, []);
    
    useEffect(() => {
        console.log(solicitud);
    }, [solicitud]);
    
    return (
        <>
        <Grid
            sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "75vh",
            }}
        >
            <h1>Listado de Solicitudes</h1>
            <Grid sx={{
                display: "flex",
                alignItems: "right",
                justifyContent: "flex-end",
                mr: 2,
                ml: "85%",
            }}>
                <input
                    type="text"
                    placeholder="Buscar"
                    onChange={(event) => setSearchTerm(event.target.value)}
                    style={{
                        backgroundColor: "lightgray",
                        borderColor: "white",
                        borderRadius: "5px",
                        color: "black",
                        ":focus": {
                            backgroundColor: "white",
                        },
                    }}
                />
                <Button
                    type="button"
                    variant="contained"
                    sx={{ mr: 2, ml: 2 }}
                    onClick={() => router("/solicitud/create/")}><AddIcon /></Button>
            </Grid>
            {solicitud.filter((solicitud) => solicitud.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((solicitud, index) => (
                <div key={solicitud._id}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>{index + 1}.</span>
                        <span>{solicitud.nombre}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <h5>{solicitud.tipo}</h5>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <h5>{solicitud.rut}</h5>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <h5>{solicitud.fecha}</h5>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <h5>{solicitud.archivoPDF}</h5>
                    </div>
                    <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/solicitud/${solicitud._id}`)}><InfoIcon /></Button>
                    <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/solicitud/update/${solicitud._id}`)}><EditIcon /></Button>
                    <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/solicitud/delete/${solicitud._id}`)}><DeleteIcon /></Button>
                </div>
            ))}
            <br />
        </Grid>
        </>
    );               
};

export default Solicitud;
