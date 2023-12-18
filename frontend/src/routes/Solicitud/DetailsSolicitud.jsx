import swal from 'sweetalert'
import { Grid } from "@mui/material"
import { Button } from "@mui/material"
import { useSnackbar } from 'notistack';
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos"
import { getSolicitud, deleteSolicitud } from "../../services/solicitud.service";

const DetailsSolicitud = () => {
    const { id } = useParams();
    const [solicitud, setSolicitud] = useState([]);
    const router = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getSolicitud(id).then((res) => {
            setSolicitud(res);
        });
    }, []);

    const handleDelete = async () => {
        swal({
            title: "Eliminar",
            text: "¿Seguro que desea eliminar la solicitud?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(async willDelete => {
            if (willDelete) {
                    const res = await deleteSolicitud(id);
                    enqueueSnackbar('Solicitud eliminada correctamente', { variant: 'success' });
                    router('/solicitud');
            } 
        });
    }

    return (
        <>
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
                mt: 3,
            }}>
                <br />
                <div>
                    <h1>Detalles de la Solicitud</h1>
                </div>
                <div>
                    <h3>Nombre: {solicitud.name} </h3>
                    <h3>Tipo: {solicitud.tipo} </h3>
                    <h3>Direccion: {solicitud.address} </h3>
                    <h3>Fecha: {solicitud.date} </h3>
                    <h3>Hora: {solicitud.hour} </h3>
                    <h3>Estado: {solicitud.status} </h3>
                    <h3>Visita realizada: {solicitud.visitRealizated} </h3>

                    <Button type="button" variant="contained" sx={{ mr: 2, mt: 1 }} onClick={() => router('/solicitud')}><ArrowBackIos /></Button>
                    <Button type="button" variant="contained" sx={{ mr: 2, mt: 1 }} onClick={() => router(`/solicitud/update/${cita._id}`)}><EditIcon /></Button>
                    <Button type="button" variant="contained" sx={{ mr: 2, mt: 1 }} onClick={handleDelete}><DeleteIcon /></Button>
                </div>
            </Grid>
        </>
    );
}

export default DetailsSolicitud;