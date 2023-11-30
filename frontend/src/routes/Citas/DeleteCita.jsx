import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCita } from '../../services/cita.service';

const DeleteCita = () => {
    const router = useNavigate();
    const { id } = useParams();
    const [cita, setCita] = useState([]);

    const borrarRegistro = async () => {
        const res = await deleteCita(id);
        setCita(res);
        router('/citas');
    }

    return (
        <>
            <h4>¿Seguro que desea eliminar la cita?</h4>
            <ul>
                <button type="button" onClick={borrarRegistro}>Si</button>
                <button type="button" onClick={() => router('/citas')}>No</button>
            </ul>
        </>
    )
}

export default DeleteCita
