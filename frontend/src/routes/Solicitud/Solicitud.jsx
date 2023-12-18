import { getSolicitudes } from "../../services/solicitud.service"; // Asegúrate de cambiar la ruta al archivo correcto
import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/LibraryAdd";
import InfoIcon from "@mui/icons-material/Visibility";

const Solicitudes = () => {
    const router = useNavigate();
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        getSolicitudes().then((res) => {
            // Suponiendo que 'res' ya es el array de solicitudes,
            // de lo contrario, ajusta para acceder a la propiedad correcta.
            setSolicitudes(res);
        });
    }, []);

    useEffect(() => {
        console.log(solicitudes);
    }, [solicitudes]);

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
            <h1>Listado de Solicitudes</h1>
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
            onClick={() => router('/solicitud/create')} // Ajusta la ruta según sea necesario
            >
            Agregar Solicitud
            </Button>
        </Grid>
    
        <div className="Listado">
            {solicitudes.map((solicitud) => (
            <div key={solicitud._id}>
                <h3>{solicitud.nombre}</h3>
                <p>{solicitud.tipo}</p>
                <p>{solicitud.rut}</p>

                <Button
                    type="button"
                    variant="contained"
                    onClick={() => router(`/solicitudes/${solicitud._id}`)} // Ajusta la ruta según sea necesario
                >
                    Ver Solicitud
                    <InfoIcon />
                </Button>

                <Button
                    type="button"
                    variant="contained"
                    onClick={() => router(`/solicitudes/editar/${solicitud._id}`)} // Ajusta la ruta según sea necesario
                >
                    Editar
                    <EditIcon />
                </Button>

                <Button
                    type="button"
                    variant="contained"
                    onClick={() => router(`/solicitudes/eliminar/${solicitud._id}`)} // Ajusta la ruta según sea necesario
                >
                    Eliminar
                    <DeleteIcon />
                </Button>

                {/* Otros botones o acciones que quieras incluir */}
            </div>
            ))}
            <br />
        </div>
        </>
    );
};

export default Solicitudes;
