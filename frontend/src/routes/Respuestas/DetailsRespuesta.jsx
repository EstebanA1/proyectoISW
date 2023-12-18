import swal from "sweetalert";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { getRespuesta, deleteRespuesta } from "../../services/respuestaDoc.service";

const DetailsRespuesta = () => {
  const { id } = useParams();
  const [respuesta, setRespuesta] = useState([]);
  const router = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getRespuesta(id).then((res) => {
      console.log("mensaje2: ", id);
      console.log(getRespuesta(id));
      setRespuesta(res);
    });
  }, []);

  const handleDelete = async () => {
    swal({
      title: "Eliminar",
      text: "¿Seguro que desea eliminar la respuesta?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteRespuesta(id);
        enqueueSnackbar("Respuesta eliminada correctamente", {
          variant: "success",
        });
        router("/respuesta");
      }
    });
  };

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          mt: 3,
        }}
      >
        <br />
        <div>
          <h1>Detalles de la Respuesta</h1>
          <div className="line" style={{ width: "85%" }}></div>
        </div>
        <div>
          <h3>Nombre: {respuesta.nombre} </h3>
          <h3>Rut: {respuesta.rut} </h3>
          <h3>Estado: {respuesta.estado}</h3>
          <h3>Descripcion: {respuesta.descripcion} </h3>
          <h3>Fecha: {respuesta.fecha} </h3>

          <Button
            type="button"
            variant="contained"
            sx={{ mr: 2, mt: 1 }}
            onClick={() => router("/respuesta")}
          >
            <ArrowBackIos />
          </Button>
          <Button
            type="button"
            variant="contained"
            sx={{ mr: 2, mt: 1 }}
            onClick={() => router(`/respuesta/update/${respuesta._id}`)}
          >
            <EditIcon />
          </Button>
          <Button
            type="button"
            variant="contained"
            sx={{ mr: 2, mt: 1 }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </Button>
        </div>
      </Grid>
    </>
  );
};

export default DetailsRespuesta;