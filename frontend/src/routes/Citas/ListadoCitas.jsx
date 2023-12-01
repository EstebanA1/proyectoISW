import { getCitas } from '../../services/cita.service';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material'

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
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <h1>Listado de Citas</h1>
            </Grid>

            <div className='Listado'>
                {citas.map((cita) => (
                    <div key={cita._id}>
                        <h3>{cita.name}</h3>
                        <p>{cita.date}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Citas;