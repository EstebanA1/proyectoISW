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

