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
        console.log(error.response);
    }
};

export const getCita = async (id) => {
    try {
        const response = await axios.get(`/citas/${id}`);
        const { status, data } = response;
        if (status === 200) {
            return data.data[1];
        }
        return {};
    } catch (error) {
        console.log(error);
        console.log(error.response);
    }
}

export const createCita = async (cita) => {
    try {
        // Divide la fecha en partes
        let partes = cita.date.split("/");

        // Reorganiza las partes en el formato dd/mm/aaaa
        let fechaFormateada = `${partes[0]}/${partes[1]}/${partes[2]}`;

        // Reemplaza la fecha en 'cita' con la fecha formateada
        cita.date = fechaFormateada;

        const response = await axios.post('/citas', cita);

        if (response.status === 201) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}


export const deleteCita = async (id) => {
    try {
        const response = await axios.delete(`/citas/${id}`);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}

export const updateCita = async (id, cita) => {
    try {
        // Divide la fecha en partes
        let partes = cita.date.split("/");

        // Reorganiza las partes en el formato dd/mm/aaaa
        let fechaFormateada = `${partes[0]}/${partes[1]}/${partes[2]}`;

        // Crea un nuevo objeto con solo las propiedades que tu esquema de validación espera
        let citaToUpdate = {
            name: cita.name,
            typeOfRequest: cita.typeOfRequest,
            address: cita.address,
            date: fechaFormateada,
            hour: cita.hour,
            status: cita.status,
            visitRealizated: cita.visitRealizated
        };

        const response = await axios.put(`/citas/${id}`, citaToUpdate);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}

