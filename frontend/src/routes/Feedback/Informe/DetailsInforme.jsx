import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getInforme, deleteInforme } from '../../../services/informe.service';

import swal from 'sweetalert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';

export const handleDelete = async (id, enqueueSnackbar, router) => {
    swal({
        title: "Eliminar",
        text: "¿Seguro que desea eliminar el Informe?",
        icon: "warning",
        buttons: ["No", "Si"]
    }).then(async willDelete => {
        if (willDelete) {
            const res = await deleteInforme(id);
            enqueueSnackbar('Informe eliminado correctamente', { variant: 'success' });
            router('/informe');
        }
    });
}

export const DetailsInforme = () => {
    const { id } = useParams();
    const router = useNavigate();
    const [informe, setInforme] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getInforme(id).then((res) => {
            setInforme(res);
        });
    }, []);

    return (
        <>
            <Grid
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60vh',
                    mt: 3,
                }}
            >
                <br />
                <div>
                    <h1>Informe de la Visita a Terreno</h1>
                </div>
                <div>
                    <h3>Solicitante: {informe?.solicitante} </h3>
                    <h3>Tipo de Obra: {informe?.TipoObra} </h3>
                    <h3>Ubicacion: {informe?.ubicacion} </h3>
                    <h3>Descripcion de la Obra: {informe?.descripcion} {informe?.D} </h3>
                    <h3>Observaciones: {informe?.observaciones} </h3>
                    <h3>Estado: {informe?.estado} </h3>

                    <Button type="button" variant="contained" sx={{ mr: 2, mt: 1 }} onClick={() => router('/informe')}>
                        <ArrowBackIos />
                    </Button>

                    {/*<Button type="button" variant="contained" sx={{ mr: 2, mt: 1 }}
                        onClick={() => router(`/informe/update/${informe._id}`)}>
                        <EditIcon />
                    </Button>

                    <Button type="button" variant="contained" sx={{ mr: 2, mt: 1 }}
                        onClick={() => handleDelete(informe._id, enqueueSnackbar, router)}>
                        <DeleteIcon />
            </Button>*/}
                </div>              
            </Grid>
        </>
    );
}

export default DetailsInforme;