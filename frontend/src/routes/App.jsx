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
        textAlign: 'justify',
      }}>
        <h1>Plataforma de Solicitudes</h1>
        <div className="line" style={{width: '85%'}}></div>
        <div className="texto">
          <p>En el corazón de nuestra comunidad, la Municipalidad de Concepción se enorgullece de ser el vínculo que une a nuestros ciudadanos con los recursos, servicios y oportunidades que hacen que nuestra ciudad sea un lugar especial.</p>
          <p>La Municipalidad de Concepción se compromete a proporcionar servicios de calidad a sus ciudadanos, a través de una gestión eficiente y eficaz de los recursos de la Plataforma.</p>
          <h2>Nuestra Misión:</h2>
          <p>Trabajamos incansablemente para construir un entorno vibrante, seguro y sostenible donde cada residente pueda prosperar. Nuestra misión es impulsar el desarrollo de construcciones y ampliaciones, de esta forma fomentar la participación ciudadana y garantizar la calidad de vida de todos.</p>
        </div>
      </Grid>
    </>
  );
}

export default App;
