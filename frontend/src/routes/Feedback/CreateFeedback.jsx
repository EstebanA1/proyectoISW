import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import FeedbackForm from "../../components/FeedbackForm";

const CreateFeedback = () => {
    const { feedback } = useParams();

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
            <h1>Formulario de Retroalimentacion de Visita</h1>
            <br />
                <FeedbackForm feedback={feedback} /> 
            </Grid>
        </>
    )
}

export default CreateFeedback;