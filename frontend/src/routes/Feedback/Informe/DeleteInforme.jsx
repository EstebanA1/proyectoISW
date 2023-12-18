import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteInforme } from "../../../services/informe.service";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";

const DeleteInforme = () => {
    const router = useNavigate();
    const { id } = useParams();
    const [informeDeleted, setInformeDeleted] = useState(null);
    
    const borrarRegistro = async () => {
        try {
        const res = await deleteInforme(id);
        if (res) {
            setInformeDeleted(res);
            router("/feedback");
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
            <h2>¿Seguro que desea eliminar la Retroalimentacion de la Visita?</h2>
            <ul>
            <Grid sx={{ marginLeft: -5 }}>
                <Button type="button" onClick={borrarRegistro}>
                Si
                </Button>
                <Button type="button" onClick={() => router("/feedback")}>
                No
                </Button>
            </Grid>
            </ul>
        </Grid>
        </>
    );
}

export default DeleteInforme;