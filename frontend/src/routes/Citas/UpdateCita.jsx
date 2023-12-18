import { Grid } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCita } from "../../services/cita.service";

import CitaForm from "../../components/CitaForm"

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
                <h1>Editor de Cita</h1>
                <div className='line' style={{ width: '85%', marginTop: '2%' }}></div>
                {cita && <CitaForm cita={cita} fecha={cita.date} />}
            </Grid>
        </>
    )
}

export default UpdateCita;