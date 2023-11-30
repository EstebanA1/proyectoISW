import { Link } from 'react-router-dom';
import { getCitas } from '../../services/cita.service';
import { useEffect, useState } from 'react';

const Citas = () => {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        getCitas().then((res) => {
            setCitas(res);
        });
    }, []);

    useEffect(() => {
        console.log(citas)
    }, [citas]);

    return (
        <>
            <h1>Citas</h1>
            <Link to="/citas/create">Crear Cita</Link>
            <ul>
                {citas.map((cita) => (
                    <li key={cita._id}>
                        <Link to={`${cita._id}`}>{cita.name}</Link>

                        {/* <Link to="delete"> Eliminar</Link> */}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Citas;