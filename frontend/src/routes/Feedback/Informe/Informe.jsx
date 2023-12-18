import { getInformes } from "../../../services/informe.service";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/LibraryAdd";
import InfoIcon from "@mui/icons-material/Visibility";

import { handleDelete } from "./DetailsInforme";
import { useSnackbar } from "notistack";

const Informe = () => {
    const router = useNavigate();
    const [informe, setInforme] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    
    useEffect(() => {
        getInformes().then((res) => {
            setInforme(res);
        });
    }, []);
    
    useEffect(() => {
        console.log(informe);
    }, [informe]);
    
    return (
        <>
        <Grid
            sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            }}
        >
            <h1>Listado de Informes</h1>

    
        <Grid
            sx={{
            display: "flex",
            alignItems: "right",
            justifyContent: "flex-end",
            mr: 2,
            ml: "70%",
            }}
        >
            <div>
            <input type="text" placeholder="Buscar"
            onChange={(event) => setSearchTerm(event.target.value)}
            style={{
                backgroundColor: "lightgray",
                borderColor: "white",
                borderRadius: "5px",
                color: "black", ":focus": {backgroundColor: "white"}
            }}
            />
            </div>
            
        </Grid>
    
        <Box sx={{ overflowY: "auto" }}>
            <Box sx={{ mr: 2 }}>
            {informe.filter((informe) => informe.solicitante.toLowerCase().includes(searchTerm.toLowerCase())).map((informe, index) => (
                <div key={informe._id}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{index + 1}.</span>
                    <span>{informe.solicitante}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{informe.TipoObra}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <h5>{informe.estado}</h5>
                </div>

                <Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/informe/${informe._id}`)}><InfoIcon /></Button>
                {/*<Button sx={{ ml: 1, mb: 3, mt: -1 }} type="button" variant="contained" onClick={() => router(`/informe/update/${informe._id}`)}><EditIcon /></Button>
*/}
                <Button
                    sx={{ ml: 1, mb: 3, mt: -1 }}
                    type="button"
                    variant="contained"
                    onClick={() => router(`/informe/delete/${informe._id}`)}
                >
                    
                    <DeleteIcon />
            </Button>

                
                <div class="lineaNegra"></div>
            </div>
            ))}
            </Box>
        </Box>
            <br />
        </Grid>
        </>
    );
    };

export default Informe;