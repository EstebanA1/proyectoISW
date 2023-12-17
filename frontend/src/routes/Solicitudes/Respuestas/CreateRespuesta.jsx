import RespuestaForm from "../../../components/RespuestaDocForm";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { useState } from "react";

const CreateRespuesta = () => {
    const [respuesta, setRespuesta] = useState(null); // Cambia esto
    console.log("respuesta", respuesta);
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
    console.log("respuesta", respuesta);
}

export default CreateRespuesta;