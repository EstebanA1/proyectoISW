import { useParams } from "react-router-dom";
import FeedbackForm from "../../components/FeedbackForm";

const CreateFeedback = () => {
    const { id } = useParams(); // Obtiene la fecha de la ruta

    return (
        <>
            <br />
            <h1>Formulario de Retroalimentacion de Visita</h1>
            <br />
                <FeedbackForm id={id} /> 
        </>
    )
}

export default CreateFeedback;