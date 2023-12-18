import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFeedback, deleteFeedback } from '../../services/feedback.service';

import swal from 'sweetalert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';

export const handleDelete = async (id, enqueueSnackbar, router) => {
    swal({
        title: "Eliminar",
        text: "¿Seguro que desea eliminar la Retroalimentacion?",
        icon: "warning",
        buttons: ["No", "Si"]
    }).then(async willDelete => {
        if (willDelete) {
            const res = await deleteFeedback(id);
            enqueueSnackbar('Retroalimentacion eliminada correctamente', { variant: 'success' });
            router('/feedback');
        }
    });
}

export const DetailsFeedback = () => {
    const { id } = useParams();
    const router = useNavigate();
    const [feedback, setFeedback] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getFeedback(id).then((res) => {
            setFeedback(res);
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
                    <h1>Detalles de la retroalimentacion</h1>
                </div>
                <div>
                    <h3>Solicitante: {feedback?.solicitante} </h3>
                    <h3>Fecha: {feedback?.fechaVisita} </h3>
                    <h3>Comentarios: {feedback?.comentarios} </h3>
                    <h3>Informe: {feedback?.informe} </h3>
                    <h3>es: {feedback?.detalles} </h3>
                    <h3>Estado: {feedback?.estado} </h3>
                    <h3>Imagenes: {feedback?.imagenes} </h3>

                    <Button type="button" variant="contained" sx={{ mr: 2, mt: 1 }} onClick={() => router('/feedback')}>
                        <ArrowBackIos />
                    </Button>

                    <Button type="button" variant="contained" sx={{ mr: 2, mt: 1 }}
                        onClick={() => router(`/feedback/update/${feedback._id}`)}>
                        <EditIcon />
                    </Button>

                    <Button type="button" variant="contained" sx={{ mr: 2, mt: 1 }}
                        onClick={() => handleDelete(feedback._id, enqueueSnackbar, router)}>
                        <DeleteIcon />
                    </Button>

                    {/*<Button sx={{ mr: 2, mt: 1 }} type="button" variant="contained" onClick={() => router(`/informe/create`)}>Crear Informe</Button>
                    <Button sx={{ mr: 2, mt: 1 }} type="button" variant="contained" onClick={() => router(`/informe`)}>
                        Informes
                    </Button>
            */}
                </div>              
            </Grid>
        </>
    );
}

export default DetailsFeedback;