import axios from './root.service';

export const getCitas = async () => {
    try {
        const response = await axios.get('/citas');
        if ( response.status === 200) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.log(error);
    }
};

export const createCita = async (cita) => {
    try {
        const response = await axios.post('/citas', cita);
        if (response.status === 201) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}
