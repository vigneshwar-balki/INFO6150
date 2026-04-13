import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const userEmail = localStorage.getItem('userEmail');
  const userType = localStorage.getItem('userType');
  if (!userEmail || userType !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default AdminRoute;
