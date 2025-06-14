import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect to login if no token is present
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute; 