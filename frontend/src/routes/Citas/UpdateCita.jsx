import { useEffect, useState } from "react";
import CitaForm from "../../components/CitaForm"
import { useParams } from "react-router-dom";
import { getCita } from "../../services/cita.service";
import { Grid } from "@mui/material"

const UpdateCita = () => {
    const { id } = useParams();
    const [cita, setCita] = useState(null);

    useEffect(() => {
        getCita(id).then((res) => {
            setCita(res);
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
                {cita && <CitaForm cita={cita} />}
            </Grid>
        </>
    )
}

export default UpdateCita;
