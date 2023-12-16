import RespuestaForm from "../../../components/RespuestaDocForm";
import { useParams } from "react-router-dom";

const CreateRespuesta = () => {
    const { id } = useParams(); // Obtiene la fecha de la ruta

    return (
        <>
            <br />
            <h1>Formulario de Respuesta de Solicitud</h1>
            <br />
                <RespuestaForm id={id} /> 
        </>
    )
}


export default CreateRespuesta;