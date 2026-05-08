import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { PlusCircle, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InstructorDash = () => {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get('/api/courses/my-courses', config);
        setCourses(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, [token]);

  const handleCreateNew = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.post('/api/courses', { title: 'New Structured Course' }, config);
      navigate(`/instructor/courses/${res.data._id}/edit`);
    } catch (error) {
      alert('Failed to create course');
    }
  };

  return (
    <div className="content-scrollable">
      <div className="main-column" style={{ flex: 1 }}>
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <h2>My Taught Courses</h2>
          <button className="btn btn-primary" onClick={handleCreateNew}>
            <PlusCircle size={18} /> Create New Course
          </button>
        </div>

        {loading ? (
          <div>Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="white-panel text-center">
            <p className="text-muted mb-4">You have not created any courses yet.</p>
          </div>
        ) : (
          <div className="grid-cols-auto">
            {courses.map((course) => (
              <div key={course._id} className="white-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ height: '120px', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${course.thumbnail || ''})` }}>
                  {!course.thumbnail && <div className="flex-center" style={{height:'100%', color: 'var(--text-muted)'}}>No Image</div>}
                </div>
                <div>
                   <h3 style={{ fontSize: '1.1rem' }}>{course.title}</h3>
                   <span className={`badge ${course.isPublished ? 'badge-success' : 'badge-warning'}`}>
                     {course.isPublished ? 'Published' : 'Draft'}
                   </span>
                </div>
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>{course.category}</p>
                
                <div style={{ marginTop: 'auto' }}>
                  <button 
                    className="btn btn-outline" 
                    style={{ width: '100%', fontSize: '0.9rem', justifyContent: 'center' }}
                    onClick={() => navigate(`/instructor/courses/${course._id}/edit`)}
                  >
                     <Edit3 size={16} /> Manage Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDash;
