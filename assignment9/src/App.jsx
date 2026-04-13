import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import EmployeeRoute from './components/EmployeeRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import JobListings from './pages/JobListings';
import CompanyShowcase from './pages/CompanyShowcase';
import Contact from './pages/Contact';
import EmployeesPage from './pages/admin/EmployeesPage';
import AddJobPage from './pages/admin/AddJobPage';

const withNav = (Page) => (
  <>
    <Navbar />
    <Page />
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Admin-only routes */}
      <Route
        path="/admin/employees"
        element={<AdminRoute>{withNav(EmployeesPage)}</AdminRoute>}
      />
      <Route
        path="/add-job"
        element={<AdminRoute>{withNav(AddJobPage)}</AdminRoute>}
      />

      {/* Employee-only routes */}
      <Route
        path="/jobs"
        element={<EmployeeRoute>{withNav(JobListings)}</EmployeeRoute>}
      />

      {/* Both roles (ProtectedRoute) */}
      <Route
        path="/"
        element={<ProtectedRoute>{withNav(Home)}</ProtectedRoute>}
      />
      <Route
        path="/about"
        element={<ProtectedRoute>{withNav(About)}</ProtectedRoute>}
      />
      <Route
        path="/companies"
        element={<ProtectedRoute>{withNav(CompanyShowcase)}</ProtectedRoute>}
      />
      <Route
        path="/contact"
        element={<ProtectedRoute>{withNav(Contact)}</ProtectedRoute>}
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
