import { useEffect, useState } from "react";
import SolicitudForm from "../../components/SolicitudForm";
import { useParams } from "react-router-dom";
import { getSolicitud } from "../../services/solicitud.service";
import { Grid } from "@mui/material"

const UpdateSolicitud = () => {
    const { id } = useParams();
    const [solicitud, setSolicitud] = useState(null);

    useEffect(() => {
        getSolicitud(id).then((res) => {
            setSolicitud(res);
        });
    }, []);

    return (
        <>
            <br />
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh'
            }}>
                {solicitud && <SolicitudForm solicitud={solicitud} />}
            </Grid>
        </>
    )
}

export default UpdateSolicitud;