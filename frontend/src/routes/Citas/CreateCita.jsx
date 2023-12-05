import { useParams } from 'react-router-dom';
import CitaForm from "../../components/CitaForm"

const CreateCita = () => {
    const { date } = useParams(); // Obtiene la fecha de la ruta

    return (
        <>
            <br />
            <h1>Formulario de Cita</h1>
            <br />
                <CitaForm fecha={date} /> 
        </>
    )
}

export default CreateCita
