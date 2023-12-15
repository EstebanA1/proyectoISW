import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import RespuestaForm from "../../../components/RespuestaDocForm";

const CreateRespuesta = () => {
    const { id } = useParams();
    return (
        <>
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh'
            }}>
                <br />
                <h1>Formulario de Respuesta</h1>
                <br />
                <RespuestaForm id={id} />
            </Grid>
        </>
    )
}

export default CreateRespuesta;