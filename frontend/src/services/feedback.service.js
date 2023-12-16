import axios from './root.service';

export const getFeedbacks = async () => {
    try {
        const response = await axios.get('/feedback');
        const { status, data } = response;
        if (status === 200) {
            return data.data[1];
        }
        return [];
    } catch (error) {
        console.log(error.response);
    }
};

export const getFeedback = async (id) => {
    try {
        const response = await axios.get(`/feedback/${id}`);
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

export const createFeedback = async (feedback) => {
    try {
        const response = await axios.post('/feedback', feedback);

        if (response.status === 201) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}

export const deleteFeedback = async (id) => {
    try {
        const response = await axios.delete(`/feedback/${id}`);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}

export const updateFeedback = async (id, feedback) => {
    try {
        let feedbackUpdated = {
            solicitante: feedback.solicitante,
            fechaVisita: feedback.fechaVisita,
            comentarios: feedback.comentarios,
            imagenes: feedback.imagenes,
            estado: feedback.estado,
        }


        const response = await axios.put(`/feedback/${id}`, feedbackUpdated);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.log(error.response);
    }
}