import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCita } from "../../services/cita.service";

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
            <br />
            <h3>Detalles de la cita</h3>
            <div>
                <h5>Nombre: {cita.name}</h5>
                <h5>Tipo: {cita.typeOfRequest} </h5>
                <h5>Direccion: {cita.address} </h5>
                <h5>Fecha: {cita.date} </h5>
                <h5>Estado: {cita.status} </h5>
                <h5>Visita realizada: {cita.visitRealizated} </h5>

                <button type="button" onClick={() => router('/citas')}>Volver</button>
                <button type="button" onClick={() => router(`/citas/delete/${cita._id}`)}>Eliminar</button>
                <button type="button" onClick={() => router('/citas/update')}>Modificar</button> 
            </div>
        </>
    );
}

export default DetailsCita;