import { Outlet as Children, useNavigate} from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
};

function PageRoot() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const { user } = useAuth();

  return (
    <div>
      <div>
        <button
          style = {{ marginRight: '5px'}}
          onClick={ () => navigate( '/citas') }
        >
          Ver citas
          </button>
        <button onClick={() => navigate('/')}>Home</button>
        <p>Estas logeado como: {user.email}</p>
        <button onClick={handleLogout}>Cerrar sesion</button>
      </div>
      <Children />
    </div>
  )
}

export default Root;
