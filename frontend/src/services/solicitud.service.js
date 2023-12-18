import axios from './root.service';

export const getSolicitudes = async () => {
    try {
        const response = await axios.get('/solicitud');
        const { status, data } = response;
        if (status === 200) {
            return Array.isArray(data.data) ? data.data : [];
        }
        return [];
    } catch (error) {
        console.error("Error al obtener solicitudes:", error);
        throw error;
    }
};

export const getSolicitud = async (id) => {
    try {
        const response = await axios.get(`/solicitud/${id}`);
        const { status, data } = response;
        if (status === 200) {
            return Array.isArray(data.data) ? data.data[0] : {};
        }
        return {};
    } catch (error) {
        console.error("Error al obtener solicitudes:", error);
        throw error;
    }
}

export const createSolicitud = async (solicitud) => {
    try {
        const response = await axios.post('/solicitud', solicitud);
        console.log("Aca está el error");
        console.log(response);
        console.log(solicitud);
        if (response.status === 201) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error);
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
        console.error("Error al eliminar solicitud:", error);
        throw error;
    }
}

export const updateSolicitud = async (id, solicitud) => {
    try {
        const response = await axios.put(`/solicitud/${id}`, solicitud);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.error("Error al actualizar solicitud:", error);
        throw error;
    }
}