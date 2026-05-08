import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

const StudentDash = () => {
    const { token } = useContext(AuthContext);
    const [enrollments, setEnrollments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const res = await axios.get('/api/enroll/my-enrollments', config);
                setEnrollments(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEnrollments();
    }, [token]);

    return (
        <div className="content-scrollable">
            <div className="main-column" style={{flex: 1}}>
                <div style={{marginBottom: '1rem'}}>
                    <h2>My Enrolled Courses</h2>
                    <p className="text-muted">Jump right back into your learning.</p>
                </div>
                
                {enrollments.length === 0 && (
                   <div className="white-panel text-center">
                       <p className="text-muted mb-4">You have not enrolled in any courses yet.</p>
                       <button className="btn btn-primary" onClick={() => navigate('/courses')}>Browse Catalog</button>
                   </div>
                )}

                <div className="grid-cols-auto">
                    {enrollments.filter(enr => enr.course).map(enr => {
                        const course = enr.course;
                        const totalLessons = Math.max(1, course.modules.reduce((acc, m) => acc + m.lessons.length, 0));
                        const progress = Math.round((enr.completedLessons.length / totalLessons) * 100);

                        return (
                           <div key={enr._id} className="white-panel" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1rem' }} onClick={() => navigate(`/courses/${course._id}`)}>
                               <div style={{ height: '140px', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', backgroundSize: 'cover', backgroundImage: `url(${course.thumbnail || ''})`, position: 'relative' }}>
                                   <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.2)'}}>
                                       <Play size={40} color="white" fill="white" style={{opacity: 0.8}} />
                                   </div>
                               </div>
                               <div>
                                   <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                                   <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.8rem', color:'var(--text-muted)', marginBottom:'0.3rem'}}>
                                       <span>Progress</span>
                                       <span>{progress}%</span>
                                   </div>
                                   <div style={{height: '6px', background: 'var(--bg-main)', borderRadius: '3px', overflow: 'hidden'}}>
                                      <div style={{height: '100%', background: 'var(--card-purple)', width: `${Math.min(100, progress)}%`}}></div>
                                   </div>
                               </div>
                           </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StudentDash;
