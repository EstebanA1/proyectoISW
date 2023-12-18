import { Grid } from "@mui/material"
import { useParams } from 'react-router-dom';

import CitaForm from "../../components/CitaForm"

const CreateCita = () => {
    const { date } = useParams();
    return (
        <>
                <Grid sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',
                    mt: '-2%'
                }}>
                    <br />
                    <h1>Formulario de Cita</h1>
                    <div className='line' style={{ width: '85%' }}></div>
                    <br />
                    <CitaForm fecha={date} />
                </Grid>
        </>
    )
}
export default CreateCita; 