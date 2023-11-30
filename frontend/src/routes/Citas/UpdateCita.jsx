import { useEffect, useState } from "react";
import CitaForm from "../../components/CitaForm"
import { useParams } from "react-router-dom";
import { getCita } from "../../services/cita.service";

const UpdateCita = () => {
    const { id } = useParams();
    const [cita, setCita] = useState(null);

    useEffect(() => {
        getCita(id).then((res) => {
            setCita(res);
        });
    }, []);

    return(
        <>
            <br />
            {cita && <CitaForm cita={cita} />}
        </>
    )
}

export default UpdateCita;
