import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import InformeForm from "../../../components/InformeForm";

const CreateInforme = () => {
    const { informe } = useParams(); 

    return (
        <>
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                width: '100%',
            }}>
            <br />
            <h1>Informe De La Visita a Terreno</h1>
            <br />
                <InformeForm informe={informe} /> 
            </Grid>
        </>
    )
}

export default CreateInforme;