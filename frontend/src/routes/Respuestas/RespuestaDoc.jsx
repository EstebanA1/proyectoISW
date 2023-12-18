import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/LibraryAdd";
import InfoIcon from "@mui/icons-material/Visibility";
import { getRespuestas } from "../../services/respuestaDoc.service";
import { useParams } from "react-router-dom";
import { Box } from '@mui/system';

const Respuestas = () => {
 const router = useNavigate();
 const [respuesta, setRespuesta] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
 const { id } = useParams();

 useEffect(() => {
 getRespuestas(id).then((res) => {
 setRespuesta(res);
 });
 }, []);
 
 return (
 <>


 <Grid
 sx={{
 display: "flex",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
 height: "75vh",
 }}
 >
 <h1>Listado de Respuestas</h1>
 <div className='line' style={{ width: '85%' }}></div>
 <Grid sx={{
 display: "flex",
 alignItems: "right",
 justifyContent: "flex-end",
 mr: 2,
 ml: "85%",
 }}>
 <input
 type="text"
 placeholder="Buscar"
 onChange={(event) => setSearchTerm(event.target.value)}
 style={{
 backgroundColor: "lightgray",
 borderColor: "white",
 borderRadius: "5px",
 color: "black",
 ":focus": {
 backgroundColor: "white",
 },
 }}
 />
<Button
    type="button"
    variant="contained"
    sx={{ mr: 2, ml: 2 }}
    onClick={() => router("/respuesta/create/")}>
    <AddIcon />
</Button>
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

{respuesta.filter((respuesta) => respuesta.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((respuesta, index) => (
    <div key={respuesta._id}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{index + 1}.</span>
            <span>{respuesta.nombre}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
            <h5>{respuesta.rut}</h5>
        </div>
        <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/respuesta/${respuesta._id}`)}><InfoIcon /></Button>
        <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/respuesta/update/${respuesta._id}`)}><EditIcon /></Button>
        <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/respuesta/delete/${respuesta._id}`)}><DeleteIcon /></Button>
    </div>
))}
 <br />
    </Box>
    </Box>
 </Grid>
 </>
 );
};

export default Respuestas;