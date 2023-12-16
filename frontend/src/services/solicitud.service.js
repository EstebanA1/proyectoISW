
import axios from './root.service';

export const getSolicitudes = async () => {
    try {
        const response = await axios.get('/solicitud');
        const { status, data } = response;
        if (status === 200) {
            return data.data[1];
        }
        return [];
    } catch (error) {
        console.log(error.response);
    }
};

export const getSolicitud = async (id) => {
    try {
        const response = await axios.get(`/solicitud/${id}`);
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

export const createSolicitud = async (solicitud) => {
    try {
        const response = await axios.post('/solicitud', solicitud);

        if (response.status === 201) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}

export const deleteSolicitud = async (id) => {
    try {
        const response = await axios.delete(`/solicitud/${id}`);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}

export const updateSolicitud = async (id, solicitud) => {
    try {
        let solicitudUpdated = {
            nombre: solicitud.nombre,
            tipo: solicitud.tipo,
            rut: solicitud.rut,
            fecha: solicitud.fecha,
            archivoPDF: solicitud.archivoPDF,
        }


        const response = await axios.put(`/solicitud/${id}`, solicitudUpdated);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}
