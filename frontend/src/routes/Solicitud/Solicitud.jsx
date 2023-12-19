import { getSolicitudes } from "../../services/solicitud.service"; // Asegúrate de cambiar la ruta al archivo correcto
import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Solicitudes = () => {
    const router = useNavigate();
    const [solicitud, setSolicitudes] = useState([]);

    useEffect(() => {
        getSolicitudes().then((res) => {
            // Suponiendo que 'res' ya es el array de solicitudes,
            // de lo contrario, ajusta para acceder a la propiedad correcta.
            setSolicitudes(res);
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
            {solicitud.map((solicitud) => (
            <div key={solicitud._id}>
                <h3>Nombre: {solicitud.nombre}</h3>
                <p>Tipo: {solicitud.tipo}</p>
                <p>Rut: {solicitud.rut}</p>
                <p>Fecha: {solicitud.fecha}</p>
                <p>Estado: {solicitud.estado}</p>
                <p>Estado de Respuesta: {solicitud.estadoDeRespuesta}</p>

{/*                 <Button
                    type="button"
                    variant="contained"
                    onClick={() => router(`/solicitud/${solicitud._id}`)} // Ajusta la ruta según sea necesario
                >
                    Ver Solicitud
                    <InfoIcon />
                </Button> */}

                <Button
                    type="button"
                    variant="contained"
                    onClick={() => router(`/solicitud/update/${solicitud._id}`)} // Ajusta la ruta según sea necesario
                >
                    Editar
                    <EditIcon />
                </Button>

                <Button
                    type="button"
                    variant="contained"
                    onClick={() => router(`/solicitud/delete/${solicitud._id}`)} // Ajusta la ruta según sea necesario
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
