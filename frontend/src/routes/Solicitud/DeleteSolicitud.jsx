import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteSolicitud } from "../../services/solicitud.service";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";

const DeleteSolicitud = () => {
    const router = useNavigate();
    const { id } = useParams();
    const [SolicitudDeleted, setSolicitudDeleted] = useState(null);
    
    const borrarRegistro = async () => {
        try {
        const res = await deleteSolicitud(id);
        if (res) {
            setSolicitudDeleted(res);
            router("/solicitud");
        }
        } catch (error) {
        console.log("Error al borrar el registro:", error.response);
        }
    };
    
    return (
        <>
        <Grid
            sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 20,
            }}
        >
            <h2>¿Seguro que desea eliminar la Solicitud?</h2>
            <ul>
            <Grid sx={{ marginLeft: -5 }}>
                <Button type="button" onClick={borrarRegistro}>
                Si
                </Button>
                <Button type="button" onClick={() => router("/solicitud")}>
                No
                </Button>
            </Grid>
            </ul>
        </Grid>
        </>
    );
}

export default DeleteSolicitud;