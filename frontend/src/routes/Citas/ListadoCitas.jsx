import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import { handleDelete } from './DetailsCita';
import { useNavigate } from 'react-router-dom';
import { getCitas } from '../../services/cita.service';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/LibraryAdd';
import InfoIcon from '@mui/icons-material/Visibility';

const Citas = () => {
    const router = useNavigate();
    const [citas, setCitas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getCitas().then((res) => {
            setCitas(res);
        });
    }, []);

    useEffect(() => {
    }, [citas]);

    return (
        <>
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh'
            }}>
                <h1>Listado de Citas</h1>
                <div className='line' style={{ width: '85%' }}></div>
                <Grid sx={{
                    display: 'flex',
                    alignItems: 'right',
                    justifyContent: 'flex-end',
                    mr: '5%',
                    ml: '85%'
                }}>
                    <input type="text" placeholder="Buscar"
                        onChange={(event) => setSearchTerm(event.target.value)}
                        style={{
                            backgroundColor: 'lightgray',
                            borderColor: 'white',
                            borderWidth: '2px',
                            borderRadius: '5px',
                            height: '30px',
                            width: '200px',
                            color: 'black',
                            ':focus': {
                                backgroundColor: 'white'
                            }
                        }}
                    />
                    <Button type="button" variant="contained" sx={{ mr: '6%', ml: 2, height: 35 }} onClick={() => router(`/citas/create/`)}><AddIcon /></Button>
                    <br /><br /><br />
                </Grid>

                <Box sx={{ overflowY: 'auto' }}>
                    <Box sx={{ mr: 2 }}>
                        {citas.filter((cita) => cita.name.toLowerCase().includes(searchTerm.toLowerCase())).map((cita, index) => (
                            <div key={cita._id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{index + 1}.</span>
                                    <span>{cita.name}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                    <h5>{cita.date}</h5>

                                </div>
                                <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/citas/${cita._id}`)}><InfoIcon /></Button>
                                <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/citas/update/${cita._id}`)}><EditIcon /></Button>
                                <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => handleDelete(cita._id, enqueueSnackbar, router)}><DeleteIcon /></Button>
                                <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/feedback/create/${cita._id}`)}>Crear Retroalimentacion</Button>
                                <div class="lineaNegra"></div>

                            </div>

                        ))}
                    </Box>
                </Box>
                <br />
            </Grid>
        </>
    );
};

export default Citas;
