import { Grid } from "@mui/material"
import { Button } from "@mui/material"
import { useSnackbar } from 'notistack';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCita, deleteCita } from "../../services/cita.service";

import swal from 'sweetalert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIos from "@mui/icons-material/ArrowBackIos"

export const handleDelete = async (id, enqueueSnackbar, router) => {
    swal({
        title: "Eliminar",
        text: "¿Seguro que desea eliminar la cita?",
        icon: "warning",
        buttons: ["No", "Si"]
    }).then(async willDelete => {
        if (willDelete) {
            const res = await deleteCita(id);
            enqueueSnackbar('Cita eliminada correctamente', { variant: 'success' });
            router('/citas');
        }
    });
}

export const DetailsCita = () => {
    const { id } = useParams();
    const router = useNavigate();
    const [cita, setCita] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getCita(id).then((res) => {
            setCita(res);
        });
    }, []);

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
                    <h1>Detalles de la cita</h1>
                </div>
                <div>
                    <h3>Nombre: {cita.name} </h3>
                    <h3>Tipo: {cita.typeOfRequest} </h3>
                    <h3>Direccion: {cita.address} </h3>
                    <h3>Fecha: {cita.date} </h3>
                    <h3>Hora: {cita.hour} </h3>
                    <h3>Estado: {cita.status} </h3>
                    <h3>Visita realizada: {cita.visitRealizated} </h3>

                    <Button type="button" variant="contained" sx={{ mr: 2, mt: 1 }} onClick={() => router('/citas')}><ArrowBackIos /></Button>
                    <Button type="button" variant="contained" sx={{ mr: 2, mt: 1 }} onClick={() => router(`/citas/update/${cita._id}`)}><EditIcon /></Button>
                    <Button sx={{ mr: 2, mt: 1 }} type="button" variant="contained" onClick={() => handleDelete(cita._id, enqueueSnackbar, router)}><DeleteIcon /></Button>
                </div>
            </Grid>
        </>
    );
}

export default DetailsCita;