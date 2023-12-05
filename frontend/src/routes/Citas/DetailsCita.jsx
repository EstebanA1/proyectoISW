import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCita } from "../../services/cita.service";
import { Button } from "@mui/material"


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
            <div className='Listado'>
                <br />
                <div>
                    <h1>Detalles de la cita</h1>
                </div>
                <div>
                    <h5>Nombre: {cita.name}</h5>
                    <h5>Tipo: {cita.typeOfRequest} </h5>
                    <h5>Direccion: {cita.address} </h5>
                    <h5>Fecha: {cita.date} </h5>
                    <h5>Hora: {cita.hour} </h5>
                    <h5>Estado: {cita.status} </h5>
                    <h5>Visita realizada: {cita.visitRealizated} </h5>

                    <Button type="button" variant="contained" onClick={() => router('/citas')}>Volver</Button>
                    <Button type="button" variant="contained" onClick={() => router(`/citas/update/${cita._id}`)}>Modificar</Button>
                    <Button type="button" variant="contained" onClick={() => router(`/citas/delete/${cita._id}`)}>Eliminar</Button>
                </div>
            </div>
        </>
    );
}

export default DetailsCita;