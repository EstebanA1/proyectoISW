import axios from './root.service';

export const getRespuestas = async () => {
    try {
        const response = await axios.get('/respuesta');
        const { status, data } = response;
        if (status === 200) {
            return data.data[1];
        }
        return [];
    } catch (error) {
        console.log(error.response);
    }
};

export const getRespuesta = async (id) => {
    try {
        const response = await axios.get(`/respuesta/${id}`);
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

export const createRespuesta = async (respuesta) => {
    try {
        // Divide la fecha en partes
        let partes = respuesta.date.split("/");

        // Reorganiza las partes en el formato dd/mm/aaaa
        let fechaFormateada = `${partes[0]}/${partes[1]}/${partes[2]}`;

        // Reemplaza la fecha en 'respuesta' con la fecha formateada
        respuesta.date = fechaFormateada;

        const response = await axios.post('/respuesta', respuesta);

        if (response.status === 201) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}

export const deleteRespuesta = async (id) => {
    try {
        const response = await axios.delete(`/respuesta/${id}`);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}

export const updateRespuesta = async (id, respuesta) => {
    try {
        const response = await axios.put(`/respuesta/${id}`, respuesta);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}
