import { useParams } from "react-router-dom";
import SolicitudForm from "../../components/SolicitudForm";

const CreateSolicitud = () => {
    const { id } = useParams(); // Obtiene la fecha de la ruta

    return (
        <>
            <br />
            <h1>Formulario de Solicitud</h1>
            <br />
                <SolicitudForm id={id} /> 
        </>
    )
}

export default CreateSolicitud;