import RespuestaForm from "../../../components/RespuestaDocForm";
import { Grid } from "@mui/material";
import { useState } from "react";

const CreateRespuesta = () => {
    const [respuesta, setRespuesta] = useState([]); // Cambia esto
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
                <br />
                <h1>Formulario de Respuesta</h1>
                <br />
                <RespuestaForm respuesta={respuesta} />
            </Grid>
        </>
    );
}

export default CreateRespuesta;