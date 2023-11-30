import { useForm } from "react-hook-form";
import { createCita } from '../services/cita.service';
import { useNavigate} from 'react-router-dom';

export default function CitaForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const router = useNavigate();
    const mostrarPorConsola = async (data) => {
        const res = await createCita(data);
        console.log(res);
        router('/citas');
}

    return (
        <form onSubmit={handleSubmit(mostrarPorConsola)}>
            <div>
                <label htmlFor="name">Nombre</label>
                <input autoComplete='on' {...register('name', { required: true })} />
                </div>
            <div>
                <label htmlFor="typeOfRequest">Tipo</label>
                <input autoComplete='on' {...register('typeOfRequest', { required: true })} />
            </div>
            <div>
                <label htmlFor="address">Direccion</label>
                <input autoComplete='on' {...register('address', { required: true })} />
            </div>
            <div>
                <label htmlFor="date">Fecha</label>
                <input autoComplete='on' type='date' {...register('date', { required: true, valueAsDate: true })} />
            </div>
            {errors.exampleRequired && <span>Este campo es obligatorio</span>}
{/* Llamar a JOI para ver los errores */}
            <br />
            <input type="submit" />
            <button type="button" onClick={() => router('/citas')}>Cancelar</button>
        </form>
    );
}