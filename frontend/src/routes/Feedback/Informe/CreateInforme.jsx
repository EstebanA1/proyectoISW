import { useParams } from "react-router-dom";
import InformeForm from "../../../components/InformeForm";

const CreateInforme = () => {
    const { id } = useParams(); 

    return (
        <>
            <br />
            <h1>Formulario de Informe</h1>
            <br />
                <InformeForm id={id} /> 
        </>
    )
}

export default CreateInforme;