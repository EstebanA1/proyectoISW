import { Grid } from "@mui/material";
import '../index.css'

function App() {
  return (
    <>
      <Grid sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h1>Plataforma de Solicitudes</h1>
        <div className="line" style={{width: '85%'}}></div>
        <div className="texto">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit, voluptatum eligendi laborum odio cum ab, optio non magni ratione ipsa beatae perferendis fuga rerum nihil possimus similique veritatis. Id, quo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus incidunt veritatis eum dolore cum commodi, doloribus minima autem quae unde odit possimus laboriosam suscipit sint odio corporis. Quia, commodi repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aperiam ratione, repellat molestiae nam distinctio! Maiores temporibus alias ipsam natus expedita veritatis adipisci necessitatibus id excepturi. Voluptates placeat dolorem ipsa!</p>
        </div>
      </Grid>
    </>
  );
}

export default App;
