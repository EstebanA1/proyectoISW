import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCita } from "../../services/cita.service";
import { Button } from "@mui/material"
import ArrowBackIos from "@mui/icons-material/ArrowBackIos"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from "@mui/material"

const DetailsCita = () => {
    const { id } = useParams();
    const [cita, setCita] = useState([]);
    const router = useNavigate();
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
                        <Button type="button" variant="contained" sx={{ mr: 2, mt: 1 }} onClick={() => router(`/citas/delete/${cita._id}`)}><DeleteIcon /></Button>
                    </div>
            </Grid>
        </>
    );
}

export default DetailsCita;