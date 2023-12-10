import React, { useState } from "react";
import { Button, TextField, FormControl, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useForm } from "react-hook-form";

const InformeForm = ({ informe }) => {
    const [tipoVisita, setTipoVisita] = React.useState("visita");

    const handleSubmit = () => {
        console.log('Informe Guardado: ', { tipoInforme });
    }

    return (
        <form>
            <div>
                <h1>Informe De La Visita a Terreno</h1>
            </div>

            <div>
                <label style={{ color: 'black' }}> Tipo de Obra: </label>
                <select defaultValue="seleccionar">
                    <option value="construccion">Construcción</option>
                    <option value="ampliacion">Ampliación</option>
                </select>
            </div>

            <div>
                <label style={{ color: 'black' }}> Ubicacion: </label>
                <TextField
                    multiline
                    rows={2}
                    variant="outlined"
                    placeholder="Ingrese sector y comuna"
                />
            </div>

            <div>
                <label style={{ color: 'black' }}> Descripcion De La Obra: </label>
            </div>
            <div>
                <label style={{ color: 'black' }}> Ya realiza la visista a terreno, y viendo la obra en terreno, se puede decir que la obra se encuentra con instalaciones </label>
                <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="complete la descripcion de la obra"
                />
            </div>

            <div>
                <label style={{ color: 'black' }}> Resultados De La Obra: </label>
                <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Ingrese las recomendaciones y observaciones de la visita"
                />
            </div>

            <Button type="button" variant="contained" color="primary" onClick={() => router (`/feedback/create/${cita._id}`)}>
                Volver
            </Button>

            <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>
                Guardar
            </Button>
            
        </form>
        
    );
};

export default InformeForm;