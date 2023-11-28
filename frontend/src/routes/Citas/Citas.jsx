import { Link } from 'react-router-dom';
import { getCitas } from '../../services/cita.service';
import { useEffect, useState } from 'react';

const Citas = () => {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        getCitas().then((response) => {
            setCitas(response);
        });
        console.log(response);
    },[]);

    return (
        <>
            <h1>Citas</h1>
            <Link to="create">Crear Cita</Link>
                <ul>
                    {citas.map((cita) => (
                        <li key={cita._id}>{cita.name}</li>
                    ))}
                </ul>
        </>
    );
};

export default Citas;