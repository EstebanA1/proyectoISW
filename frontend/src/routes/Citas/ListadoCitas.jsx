import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import { handleDelete } from './DetailsCita';
import { useNavigate } from 'react-router-dom';
import { getCitas } from '../../services/cita.service';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/LibraryAdd';
import InfoIcon from '@mui/icons-material/Visibility';

const Citas = () => {
 const router = useNavigate();
 const [citas, setCitas] = useState([]);
 const [filterType, setFilterType] = useState("");
 const [filterDate, setFilterDate] = useState("");
 const [searchTerm, setSearchTerm] = useState("");
 const { enqueueSnackbar } = useSnackbar();

 useEffect(() => {
 getCitas().then((res) => {
 setCitas(res);
 });
 }, []);

 return (
 <>
 <Grid sx={{
 display: 'flex',
 flexDirection: 'column',
 alignItems: 'center',
 justifyContent: 'center',
 height: '85vh'
 }}>
 <h1>Listado de Citas</h1>
 <div className='line' style={{ width: '85%' }}></div>
 <Grid container sx={{
 justifyContent: 'space-between',
 ml: { xs: '5%', sm: '20%' },
 }}>

 <Grid item sx={{ mb: { xs: 2, sm: 0 }, ml: -11 }}>
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
 ':focus': {
 backgroundColor: 'white'
 }
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

 <Grid item sx={{ display: 'flex', ml: { xs: '5%', sm: '3%' } }}>
 <input type="text" placeholder="Buscar nombre"
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
<Button type="button" variant="contained" sx={{ mr: '6%', ml: 2, height: 35 }} onClick={() => router('/citas/create/')}><AddIcon /></Button>
 </Grid>
 <br /><br /><br />
 </Grid>

 <Box sx={{
 overflowY: 'auto',
 mt: 3,
 '&::-webkit-scrollbar': {
 width: '10px',
 },
 '&::-webkit-scrollbar-track': {
 backgroundColor: '#f1f1f1',
 },
 '&::-webkit-scrollbar-thumb': {
 backgroundColor: '#888',
 },
 '&::-webkit-scrollbar-thumb:hover': {
 backgroundColor: '#555',
 }
 }}>
 <Box sx={{ mr: 2 }}>
 {citas
 .filter((cita) => {
 const citaDate = new Date(cita.date + "Z");
 const filterDateObj = new Date(filterDate + "T00:00:00Z");

 return (
 cita.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
 (filterDate === "" || citaDate.getTime() === filterDateObj.getTime()) &&
 (filterType === "" || cita.typeOfRequest === filterType)
 );
 })
 .map((cita, index) => (
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
 <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/feedback/create`)}>Crear Retroalimentacion</Button>
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