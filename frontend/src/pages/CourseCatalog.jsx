import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const CourseCatalog = () => {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/courses').then(res => setCourses(res.data)).catch(console.error);
    }, []);

    const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase()));

    return (
      <div className="content-scrollable" style={{flexDirection: 'column'}}>
        <div className="flex-between" style={{marginBottom: '2rem'}}>
           <h2>Explore Courses</h2>
           <div className="search-bar" style={{background: 'var(--bg-white)', border: '1px solid var(--border-light)'}}>
               <Search size={18} color="var(--text-muted)" />
               <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
           </div>
        </div>

        <div className="grid-cols-auto">
            {filtered.map(course => (
              <div key={course._id} className="white-panel" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1rem' }} onClick={() => navigate(`/courses/${course._id}`)}>
                 <div style={{ height: '140px', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', backgroundSize: 'cover', backgroundImage: `url(${course.thumbnail || ''})` }}>
                    {!course.thumbnail && <div className="flex-center" style={{height:'100%', color: 'var(--text-muted)'}}>No Image</div>}
                 </div>
                 <h3 style={{ fontSize: '1.1rem' }}>{course.title}</h3>
                 <p className="text-muted" style={{ fontSize: '0.85rem' }}>{course.category} • By {course.instructor?.name}</p>
              </div>
            ))}
            {filtered.length === 0 && <p className="text-muted">No courses found.</p>}
        </div>
      </div>
    )
}

export default CourseCatalog;
