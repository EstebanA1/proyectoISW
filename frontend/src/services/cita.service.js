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
    } catch (error){
        console.log(error);
        console.log(error.response);
    }
}

export const createCita = async (cita) => {
    try {
        // Formatea la fecha en el formato 'xx/xx/xxxx'
        let fecha = new Date(cita.date);
        let dia = String(fecha.getDate()).padStart(2, '0');
        let mes = String(fecha.getMonth() + 1).padStart(2, '0'); 
        let ano = fecha.getFullYear(); 

        let fechaFormateada = `${dia}/${mes}/${ano}`; // Formatea la fecha en el formato 'xx/xx/xxxx'

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
    } catch (error){
        console.log(error.response);
    }
}

export const updateCita = async (id, cita) => {
    try {
        let fecha = new Date(cita.date);
        let dia = String(fecha.getDate()).padStart(2, '0');
        let mes = String(fecha.getMonth() + 1).padStart(2, '0'); 
        let ano = fecha.getFullYear(); 

        let fechaFormateada = `${dia}/${mes}/${ano}`;
        
        cita.date = fechaFormateada;

        const response = await axios.put(`/citas/${id}`, cita);
        if (response.status === 200) {
            return response.data;
        }
        return {};
    } catch (error){
        console.log(error.response);
    }
}
