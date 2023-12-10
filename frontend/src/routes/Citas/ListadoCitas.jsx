import { getCitas } from '../../services/cita.service';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Citas = () => {
    const [citas, setCitas] = useState([]);
    const router = useNavigate();

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
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <h1>Listado de Citas</h1>
            </Grid>

            <Grid sx={{
                display: 'flex',
                alignItems: 'right',
                justifyContent: 'flex-end',
                mr: 2

            }}>
                <Button type="button" variant="contained" onClick={() => router(`/citas/create/`)}>Agregar Cita</Button>
            </Grid>

            <div className='Listado'>
                {citas.map((cita) => (
                    <div key={cita._id}>
                        <h3>{cita.name}</h3>
                        <p>{cita.date}</p>
                        <Button type="button" variant="contained" onClick={() => router(`/citas/update/${cita._id}`)}>Modificar</Button>
                        <Button type="button" variant="contained" onClick={() => router(`/citas/delete/${cita._id}`)}>Eliminar</Button>
                        <Button type="button" variant="contained" onClick={() => router(`/feedback/create/${cita._id}`)}>Crear Retroalimentacion</Button>
                    </div>
                ))}
                <br />
            </div>
        </>
    );
};

export default Citas;