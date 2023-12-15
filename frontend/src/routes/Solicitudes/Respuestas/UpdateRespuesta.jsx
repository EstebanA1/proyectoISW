import { useEffect, useState } from "react";
import RespuestaForm from "../../../components/RespuestaDocForm";
import { useParams } from "react-router-dom";
import { getRespuesta } from "../../../services/respuestaDoc.service";
import { Grid } from "@mui/material"

const UpdateRespuesta = () => {
    const { id } = useParams();
    const [respuesta, setRespuesta] = useState(null);

    useEffect(() => {
        getRespuesta(id).then((res) => {
            setRespuesta(res);
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
                {respuesta && <RespuestaForm respuesta={respuesta} />}
            </Grid>
        </>
    )
}

export default UpdateRespuesta;
