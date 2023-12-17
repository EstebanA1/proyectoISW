import SolicitudForm from "../../components/SolicitudForm";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";

const CreateSolicitud = () => {
    const { id } = useParams();
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
                <h1>Formulario de Solicitud</h1>
                <br />
                <SolicitudForm id={id} />
            </Grid>
        </>
    );
}


export default CreateSolicitud;