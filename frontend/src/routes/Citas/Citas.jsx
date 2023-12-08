import { getCitas } from '../../services/cita.service';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material'
import Calendar from '../../components/Calendar';

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
                <h1>Calendario de Citas</h1>

                <div className='line' style={{ width: '85%' }}></div>
            </Grid>

            <div>
                <Calendar citas={citas} />
            </div>

        </>
    );
};

export default Citas;