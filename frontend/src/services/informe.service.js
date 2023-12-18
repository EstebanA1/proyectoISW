import axios from './root.service';

export const getInformes = async () => {
    try {
        const response = await axios.get('/informe');
        const { status, data } = response;
        if (status === 200) {
            return data.data[1];
        }
        return [];
    } catch (error) {
        console.log(error.response);
    }
}

export const getInforme = async (id) => {
    try {
        const response = await axios.get(`/informe/${id}`);
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

export const createInforme = async (informe) => {
    try {
        const response = await axios.post('/informe', informe);

        if (response.status === 201) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}

export const deleteInforme = async (id) => {
    try {
        const response = await axios.delete(`/informe/${id}`);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}

export const updateInforme = async (id, informe) => {
    try {
        let informeUpdate = {
            solicitante: informe.solicitante,
            TipoObra: informe.TipoObra,
            ubicacion: informe.ubicacion,
            D: informe.D,
            observaciones: informe.observaciones,
            estado: informe.estado,
        }

        const response = await axios.put(`/informe/${id}`, informeUpdate);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}