import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import AppLayout from './AppLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InstructorDash from './pages/InstructorDash';
import CourseEdit from './pages/CourseEdit';
import CourseCatalog from './pages/CourseCatalog';
import CoursePlayer from './pages/CoursePlayer';
import AdminDash from './pages/AdminDash';
import StudentDash from './pages/StudentDash';
import Messages from './pages/Messages';
import Landing from './pages/Landing';

function App() {
  const { loading, isAuthenticated, user } = useContext(AuthContext);

  if (loading) return <div className="flex-center" style={{minHeight:'100vh'}}>Loading...</div>;

  const getCourseId = () => window.location.pathname.split('/').pop();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/" element={<Landing />} />
        
        {/* Protected Routes utilizing the sidebar layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={
            user?.role === 'Instructor' ? <InstructorDash /> : 
            user?.role === 'Admin' ? <AdminDash /> : 
            <StudentDash />
          } />
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/courses/:id" element={<CoursePlayer />} />
          
          <Route path="/instructor" element={<Dashboard />} />
          <Route path="/instructor/courses" element={<InstructorDash />} />
          <Route path="/instructor/courses/:id/edit" element={<CourseEdit />} />
          
          <Route path="/messages" element={<Messages />} />
          
          <Route path="/admin" element={<AdminDash />} />
          {/* Add more routes here as we build them */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
