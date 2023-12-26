import { Grid, Button, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getCitas } from '../../services/cita.service';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { handleDelete } from './DetailsCita';
import { useSnackbar } from 'notistack';

import InfoIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/LibraryAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '../../components/Paginador';
import EditIcon from '@mui/icons-material/Edit';

const Citas = () => {
    const router = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [citas, setCitas] = useState([]);
    const [filterType, setFilterType] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getCitas().then((res) => {
            setCitas(res);
        });
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [citasPerPage] = useState(10);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    const filterCitas = () => {
        let filteredCitas = citas;

        if (filterDate !== '') {
            const filterDateFormatted = filterDate.split('-').reverse().join('/');
            filteredCitas = filteredCitas.filter((cita) => cita.date.localeCompare(filterDateFormatted, 'es') === 0);
        }


        if (filterType !== '') {
            filteredCitas = filteredCitas.filter((cita) => cita.typeOfRequest === filterType);
        }

        if (searchTerm !== '') {
            filteredCitas = filteredCitas.filter((cita) => cita.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return filteredCitas;
    }

    const indexOfLastCita = currentPage * citasPerPage;
    const indexOfFirstCita = indexOfLastCita - citasPerPage;

    const filteredCitas = filterCitas();
    const currentCitas = filteredCitas.slice(indexOfFirstCita, indexOfLastCita);


    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ height: '85vh', width: '95%', margin: 'auto' }}
        >

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{
                    height: '85vh',
                    width: '95%',
                    marginTop: '-200px',
                    marginBottom: '-200px',
                }}>
                <h1 style={{ marginLeft: 25 }}>Listado de Citas</h1>
                <div className='line' style={{ width: '100%' }}></div>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ display: 'flex', ml: { xs: '5%', sm: '3%' } }}
                >
                    <Grid item sx={{ mb: { xs: 2, sm: 0 }, ml: 1 }}>
                        <label style={{ color: 'black' }}>Filtrar fecha: </label>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(event) => setFilterDate(event.target.value)}
                            style={{
                                height: '30px',
                                width: '200px',
                                marginRight: '10px',
                                backgroundColor: 'lightgray',
                                borderColor: 'white',
                                borderWidth: '2px',
                                borderRadius: '5px',
                                color: 'black',
                            }}
                        />
                    </Grid>

                    <Grid item sx={{ mb: { xs: 2, sm: 0 }, ml: '2%' }}>
                        <label style={{ color: 'black', marginLeft: '10px' }}>Filtrar tipo: </label>
                        <Select
                            value={filterType}
                            onChange={(event) => setFilterType(event.target.value)}
                            style={{
                                height: '30px',
                                width: '200px',
                                marginLeft: '10px',
                                backgroundColor: 'lightgray',
                                borderColor: 'white',
                                borderWidth: '2px',
                                borderRadius: '5px',
                                color: 'black',
                            }}
                        >
                            <MenuItem value=""><em>Ninguno</em></MenuItem>
                            <MenuItem value="Ampliación">Ampliación</MenuItem>
                            <MenuItem value="Construcción">Construcción</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item sx={{ display: 'flex', mr: 12 }}>
                        <input
                            type="text"
                            placeholder="Buscar nombre"
                            onChange={(event) => setSearchTerm(event.target.value)}
                            style={{
                                backgroundColor: 'lightgray',
                                borderColor: 'lightgray',
                                borderWidth: '2px',
                                borderRadius: '5px',
                                width: '200px',
                                color: 'black',
                                height: '26px',
                            }}
                        />
                        <Button
                            type="button"
                            variant="contained"
                            sx={{ ml: 1, height: '31px', mt: -0.1 }}
                            onClick={() => router('/citas/create/')}
                        >
                            Agregar Cita
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Paper elevation={3} style={{ padding: '2px', marginTop: '10px', width: '90%' }}>
                <Grid item style={{ width: '100%', overflowX: 'auto' }}>
                    <TableContainer style={{ marginTop: '20px', marginLeft: '20px', maxWidth: '98%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Índice</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Detalles</TableCell>
                                    <TableCell>Modificar</TableCell>
                                    <TableCell>Eliminar</TableCell>
                                    <TableCell>Retroalimentación</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentCitas.map((cita, index) => (
                                    <TableRow key={cita._id}>
                                        <TableCell><b>{index + 1}</b></TableCell>
                                        <TableCell>{cita.name}</TableCell>
                                        <TableCell>{cita.date}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                style={{ border: 'none', color: '#0f69b4' }}
                                                onClick={() => router(`/citas/${cita._id}`)}
                                            >
                                                <InfoIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                style={{ border: 'none', color: '#0f69b4' }}
                                                onClick={() => router(`/citas/update/${cita._id}`)}
                                            >
                                                <EditIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                color='error'
                                                variant="outlined"
                                                style={{ border: 'none' }}
                                                onClick={() => handleDelete(cita._id, enqueueSnackbar, router)}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                style={{ border: 'none', color: '#0f69b4' }}
                                                onClick={() => router(`/feedback/create`)}
                                            >
                                                <AddIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br />
                </Grid>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper elevation={3} style={{ padding: '8px', width: 'fit-content', marginBottom: '10px' }}>
                        <Pagination citasPerPage={citasPerPage} totalCitas={citas.length} paginate={paginate} />
                    </Paper>
                </div>
            </Paper>

        </Grid>
    );
};

export default Citas;