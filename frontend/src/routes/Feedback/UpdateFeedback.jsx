import { useEffect, useState } from "react";
import FeedbackForm from "../../components/FeedbackForm";
import { useParams } from "react-router-dom";
import { getFeedback } from "../../services/feedback.service";
import { Grid } from "@mui/material"

const UpdateFeedback = () => {
    const { id } = useParams();
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        getFeedback(id).then((res) => {
            setFeedback(res);
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
                {feedback && <FeedbackForm feedback={feedback} />}
            </Grid>
        </>
    )
}

export default UpdateFeedback;