import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import Citas from './routes/Citas/Citas.jsx';
import CreateCita from './routes/Citas/CreateCita.jsx';
import DetailsCita from './routes/Citas/DetailsCita.jsx';
import UpdateCita from './routes/Citas/UpdateCita.jsx';
import ListadoCita from './routes/Citas/ListadoCitas.jsx';

//Feedback
import Feedback from './routes/Feedback/Feedback.jsx';
import DetailsFeedback from './routes/Feedback/DetailsFeedback.jsx';
import CreateFeedback from './routes/Feedback/CreateFeedback.jsx';
import DeleteFeedback from './routes/Feedback/DeleteFeedback.jsx';
import UpdateFeedback from './routes/Feedback/UpdateFeedback.jsx';
import CreateInforme from './routes/Feedback/Informe/CreateInforme.jsx';
import UpdateInforme from './routes/Feedback/Informe/UpdateInforme.jsx';

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
      {
        path: '/feedback',
        element: <Feedback />,
      },
      {
        path: '/feedback/:id',
        element: <DetailsFeedback />,
      },
      {
        path: '/feedback/create/:id',
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
      {
        path: '/informe/create/:id',
        element: <CreateInforme />,
      },
      {
        path: '/informe/update/:id',
        element: <UpdateInforme />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
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
