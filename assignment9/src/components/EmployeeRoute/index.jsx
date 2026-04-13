import { Navigate } from 'react-router-dom';

function EmployeeRoute({ children }) {
  const userEmail = localStorage.getItem('userEmail');
  const userType = localStorage.getItem('userType');
  if (!userEmail || userType !== 'employee') {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default EmployeeRoute;
