import { Button } from "@mui/material";

const Solicitudes = () => {

    return (                                                
    <>
        <h1>Solicitudes</h1>
        <Button type="button" variant="contained" onClick={() => router(`/respuesta/create/}`)}>Crear Respuesta</Button>
        <ul> 
            <li style={{color: 'black'}}>Solicitud 1</li>
            <li style={{color: 'black'}}>Solicitud 2</li>
        </ul>
    </>
    );
};   

export default Solicitudes;