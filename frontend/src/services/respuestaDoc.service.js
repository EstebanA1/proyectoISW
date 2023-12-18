import axios from './root.service';

export const getRespuestas = async () => {
 try {
 const response = await axios.get('/respuesta');
 const { status, data } = response;
 if (status === 200) {
 return Array.isArray(data.data) ? data.data : [];
 }
 return [];
 } catch (error) {
 console.error("Error al obtener respuestas:", error);
 throw error;
 }
};

export const getRespuesta = async (id) => {
 try {
 const response = await axios.get(`/respuesta/${id}`);
 const { status, data } = response;
 console.log(data.data)
 if (status === 200) {
 return data.data;
 }
 return {};
 } catch (error) {
 console.error("Error al obtener respuesta:", error);
 throw error;
 }
}

export const createRespuesta = async (respuesta) => {
 try {
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
 console.error("Error al eliminar respuesta:", error);
 throw error;
 }
}

export const updateRespuesta = async (id, respuesta) => {
try {
    let respuestaN = {
        nombre: respuesta.nombre,
        rut: respuesta.rut,
        descripcion: respuesta.descripcion,
        fecha: respuesta.fecha
    };
    const response = await axios.put(`/respuesta/${id}`, respuestaN);
    if (response.status === 200) {
        console.log("El response muestra: ", response.data);
        return response.data;
    }
    return {};
} catch (error) {
    console.error("Error al actualizar respuesta:", error);
    throw error;
}
 console.error("Error al actualizar respuesta:", error);
 throw error;
 }
