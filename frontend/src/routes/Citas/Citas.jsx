import { Grid } from '@mui/material'
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from 'react';
import { getCitas } from '../../services/cita.service';

import Calendar from '../../components/Calendar';

const Citas = () => {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        getCitas().then((res) => {
            setCitas(res);
        });
    }, []);

    useEffect(() => {
    }, [citas]);

    return (
        <>
            <SnackbarProvider>
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
            </SnackbarProvider>
        </>
    );
};

export default Citas;