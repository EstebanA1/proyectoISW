import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from "@mui/material"
import SolicitudForm from "../../components/SolicitudForm"
import { getSolicitud } from "../../services/solicitud.service";

const UpdateSolicitud = () => {
 const { id } = useParams();
 const [solicitud, setSolicitud] = useState(null);

 useEffect(() => {
 getSolicitud(id).then((res) => {
 setSolicitud(res);
 });
 }, []);

 return (
 <>
 <br />
 <Grid sx={{
 display: 'flex',
 flexDirection: 'column',
 alignItems: 'center',
 justifyContent: 'center',
 height: '75vh'
 }}>
 <br />
 <h1>Modificar Solicitud</h1>
 <div className='line' style={{ width: '85%' }}></div>
 <br />
 {solicitud && <SolicitudForm solicitud={solicitud} />}
 </Grid>
 </>
 )
}

export default UpdateSolicitud;