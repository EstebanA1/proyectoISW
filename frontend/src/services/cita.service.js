import axios from './root.service';

export const getCitas = async () => {
    try {
        const response = await axios.get('/citas');
        const { status, data } = response;
        if (status === 200) {
            return data.data[1];
        }
        return [];
    } catch (error) {
        console.log(error);
    }
};

export const createCita = async (cita) => {
    try {
        // Formatea la fecha en el formato 'xx/xx/xxxx'
        let fecha = new Date(cita.date); // Asume que 'cita.date' es un objeto Date
        let dia = String(fecha.getDate()).padStart(2, '0'); // Obtiene el día y lo formatea a dos dígitos
        let mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Obtiene el mes y lo formatea a dos dígitos
        let ano = fecha.getFullYear(); // Obtiene el año

        let fechaFormateada = `${dia}/${mes}/${ano}`; // Formatea la fecha en el formato 'xx/xx/xxxx'

        // Reemplaza la fecha en 'cita' con la fecha formateada
        cita.date = fechaFormateada;

        const response = await axios.post('/citas', cita);

        if (response.status === 201) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error);
        console.log(error.response);
    }
}
