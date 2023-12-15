import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRespuesta } from "../../../services/respuestaDoc.service";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";

const DeleteRespuesta = () => {
    const router = useNavigate();
    const { id } = useParams();
    const [respuestaDeleted, setRespuestaDeleted] = useState(null);
    
    const borrarRegistro = async () => {
        try {
        const res = await deleteRespuesta(id);
        if (res) {
            setRespuestaDeleted(res);
            router("/respuestas");
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
            <h2>¿Seguro que desea eliminar la Respuesta?</h2>
            <ul>
            <Grid sx={{ marginLeft: -5 }}>
                <Button type="button" onClick={borrarRegistro}>
                Si
                </Button>
                <Button type="button" onClick={() => router("/respuestas")}>
                No
                </Button>
            </Grid>
            </ul>
        </Grid>
        </>
    );
}

export default DeleteRespuesta;