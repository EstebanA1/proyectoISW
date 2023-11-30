import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCita } from '../../services/cita.service';

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
            <h4>¿Seguro que desea eliminar la cita?</h4>
            <ul>
                <button type="button" onClick={borrarRegistro}>Si</button>
                <button type="button" onClick={() => router('/citas')}>No</button>
            </ul>
        </>
    )
}

export default DeleteCita;
