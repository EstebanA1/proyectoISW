import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';

// Login
import Login from './routes/Login.jsx';

// Citas
import Citas from './routes/Citas/Citas.jsx';
import CreateCita from './routes/Citas/CreateCita.jsx';
import DetailsCita from './routes/Citas/DetailsCita.jsx';
import UpdateCita from './routes/Citas/UpdateCita.jsx';
import ListadoCita from './routes/Citas/ListadoCitas.jsx';

// Solicitud
import Solicitud from './routes/Solicitud/Solicitud.jsx';
import CreateSolicitud from './routes/Solicitud/CreateSolicitud.jsx';
import DeleteSolicitud from './routes/Solicitud/DeleteSolicitud.jsx';
import UpdateSolicitud from './routes/Solicitud/UpdateSolicitud.jsx';

//Feedback
import Feedback from './routes/Feedback/Feedback.jsx';
import DetailsFeedback from './routes/Feedback/DetailsFeedback.jsx';
import CreateFeedback from './routes/Feedback/CreateFeedback.jsx';
import DeleteFeedback from './routes/Feedback/DeleteFeedback.jsx';
import UpdateFeedback from './routes/Feedback/UpdateFeedback.jsx';

//Respuestas
import RespuestaDoc from './routes/Respuestas/RespuestaDoc.jsx';
import CreateRespuesta from './routes/Respuestas/CreateRespuesta.jsx';
import DetailsRespuesta from './routes/Respuestas/DetailsRespuesta.jsx';
import UpdateRespuesta from './routes/Respuestas/UpdateRespuesta.jsx';
import DeleteRespuesta from './routes/Respuestas/DeleteRespuesta.jsx';

// import DetailsRut from './routes/Respuestas/DetailsRut.jsx';


import { SnackbarProvider } from 'notistack';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },

      // Login
      {
        path: '/auth',
        element: <Login />,
      },
      {
        path: 'authSol',
        element: <Login />,
      },

      // Citas
      {
        path: '/citas',
        element: <Citas />,
      },
      {
        path: '/citas/listado',
        element: <ListadoCita />,
      },
      {
        path: '/citas/:id',
        element: <DetailsCita />,
      },
      {
        path: '/citas/create',
        element: <CreateCita />,
      },
      {
        path: '/citas/create/:date',
        element: <CreateCita />,
      },
      {
        path: '/citas/update/:id',
        element: <UpdateCita />,
      },

      //Feedback
      {
        path: '/feedback',
        element: <Feedback />,
      },
      {
        path: '/feedback/:id',
        element: <DetailsFeedback />,
      },
      {
        path: '/feedback/create',
        element: <CreateFeedback />,
      },
      {
        path: '/feedback/delete/:id',
        element: <DeleteFeedback />,
      },
      {
        path: '/feedback/update/:id',
        element: <UpdateFeedback />,
      },

      //Solicitud
      {
        path: '/solicitud',
        element: <Solicitud />,
      },
      {
        path: '/solicitud/create/',
        element: <CreateSolicitud />,
      },
      {
        path: '/solicitud/create/:id',
        element: <CreateSolicitud />,
      },
      {
        path: '/solicitud/delete/:id',
        element: <DeleteSolicitud />,
      },
      {
        path: '/solicitud/update/:id',
        element: <UpdateSolicitud />,
      },

      //Respuestas
      {
        path: '/respuesta',
        element: <RespuestaDoc />,
      },
      {
        path: '/respuesta/create',
        element: <CreateRespuesta />,
      },
      {
        path: '/respuesta/create/:id',
        element: <CreateRespuesta />,
      },
      {
        path: '/respuesta/:id',
        element: <DetailsRespuesta />,
      },
      {
        path: '/respuesta/update/:id',
        element: <UpdateRespuesta />,
      },
      {
        path: '/respuesta/delete/:id',
        element: <DeleteRespuesta />,
      },

      // {
      //   path: '/respuesta/rut/:rut',
      //   element: <DetailsRut />,
      // },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <SnackbarProvider
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
  >
    <RouterProvider router={router} />
  </SnackbarProvider>
);
