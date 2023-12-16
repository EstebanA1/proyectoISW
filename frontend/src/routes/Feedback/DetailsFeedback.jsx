import swal from 'sweetalert';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { getFeedback, deleteFeedback } from '../../services/feedback.service';

const DetailsFeedback = () => {
    const { id } = useParams();
    const [feedback, setFeedback] = useState([]);
    const router = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getFeedback(id).then((res) => {
            setFeedback(res);
        });
    }, []);

    const handleDelete = async () => {
        swal({
            title: 'Eliminar',
            text: '¿Seguro que desea eliminar la retroalimentacion?',
            icon: 'warning',
            buttons: ['No', 'Si'],
        }).then(async (willDelete) => {
            if (willDelete) {
                const res = await deleteFeedback(id);
                enqueueSnackbar('Retroalimentacion eliminada correctamente', { variant: 'success' });
                router('/feedback');
            }
        });
    };

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
                    <h3>Solicitante: {feedback.solicitante} </h3>
                    <h3>Fecha: {feedback.fecha} </h3>
                    <h3>Informe: {feedback.informe} </h3>
                    <h3>Comentarios: {feedback.comentarios} </h3>
                    <h3>Imagenes: {feedback.imagenes} </h3>
                    <h3>Estado: {feedback.estado} </h3>
                </div>
                <br />
                <Grid
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '60vh',
                        mt: 3,
                    }}
                >
                    <Button
                        type="button"
                        variant="contained"
                        onClick={() => router(`/feedback/update/${feedback._id}`)}
                    >
                        <EditIcon />
                    </Button>
                    <Button type="button" variant="contained" onClick={handleDelete}>
                        <DeleteIcon />
                    </Button>
                    <Button type="button" variant="contained" onClick={() => router('/feedback')}>
                        <ArrowBackIos />
                    </Button>
                    
                </Grid>
            </Grid>
        </>
    );
}

export default DetailsFeedback;