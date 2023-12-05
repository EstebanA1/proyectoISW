import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCita } from '../../services/cita.service';
import { Button } from '@mui/material'
import { Grid } from '@mui/material'

const DeleteCita = () => {
    const router = useNavigate();
    const { id } = useParams();
    const [citaDeleted, setCitaDeleted] = useState(null);

    const borrarRegistro = async () => {
        try {
            const res = await deleteCita(id);
            if (res) {
                setCitaDeleted(res);
                router('/citas');
            }
        } catch (error) {
            console.log('Error al borrar el registro:', error.response);
        }
    }


    return (
        <>
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 20
            }}>
                <h2>¿Seguro que desea eliminar la cita?</h2>
                <ul>
                    <Grid sx={{ marginLeft: -5}}>
                    <Button type="button" onClick={borrarRegistro}>Si</Button>
                    <Button type="button" onClick={() => router('/citas')}>No</Button>
                    </Grid>
                </ul>
            </Grid>
        </>
    )
}

export default DeleteCita;
