import { useEffect, useState } from "react";
import InformeForm from "../../../components/InformeForm";
import { useParams } from "react-router-dom";
import { getInforme } from "../../../services/informe.service.js";
import { Grid } from "@mui/material"

const UpdateInforme = () => {
    const { id } = useParams();
    const [informe, setInforme] = useState(null);

    useEffect(() => {
        getInforme(id).then((res) => {
            setInforme(res);
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
                {informe && <InformeForm informe={informe} />}
            </Grid>
        </>
    )
}

export default UpdateInforme;
