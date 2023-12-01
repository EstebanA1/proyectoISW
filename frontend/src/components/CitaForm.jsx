import { useForm } from "react-hook-form";
import { createCita, updateCita } from '../services/cita.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material'

export default function CitaForm({ cita }) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: cita ? cita : {}
    });

    const router = useNavigate();
    const { id } = useParams();

    const onSubmit = async (data) => {
        if (cita) {
            const res = await updateCita(id, data);
            console.log(res);
        } else {
            const res = await createCita(data);
            console.log(res);
        }
        router('/citas');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button type="button" onClick={() => router('/citas')}>Cancelar</Button>
            <Button type="submit" >Guardar</Button>
        </form>
    );
}