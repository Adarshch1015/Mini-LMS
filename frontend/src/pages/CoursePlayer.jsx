import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';

const CoursePlayer = () => {
  const { id: courseId } = useParams();
  const { token } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const cRes = await axios.get(`/api/courses/${courseId}`);
        setCourse(cRes.data);
        
        const enrollRes = await axios.get('/api/enroll/my-enrollments', config);
        const myEnrollment = enrollRes.data.find(e => e.course && e.course._id === courseId);
        setEnrollment(myEnrollment || null);

        if (cRes.data.modules.length > 0 && cRes.data.modules[0].lessons.length > 0) {
            setActiveLesson(cRes.data.modules[0].lessons[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load the course. It may have been deleted.");
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId, token]);

  const handleEnroll = async () => {
     try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.post('/api/enroll', { courseId }, config);
        // Refresh
        const enrollRes = await axios.get('/api/enroll/my-enrollments', config);
        const myEnrollment = enrollRes.data.find(e => e.course && e.course._id === courseId);
        setEnrollment(myEnrollment);
     } catch (err) { alert('Failed to enroll'); }
  };

  const markComplete = async (lessonId) => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.put(`/api/enroll/${courseId}/progress`, { lessonId }, config);
        
        setEnrollment(prev => ({
            ...prev,
            completedLessons: [...prev.completedLessons, lessonId]
        }));
      } catch(err) { console.error(err); }
  };

  if (loading) return <div style={{padding:'5rem'}}>Loading...</div>;
  if (error) return <div style={{padding:'5rem', color:'red'}}>{error}</div>;
  if (!course) return <div style={{padding:'5rem'}}>Course not found.</div>;

  return (
    <div className="content-scrollable">
      <div className="main-column" style={{ flex: 2 }}>
        <div className="white-panel" style={{ padding: 0, overflow: 'hidden' }}>
           {activeLesson?.videoUrl ? (
             <video 
               controls 
               style={{ width: '100%', height: '500px', backgroundColor: '#000' }}
               src={activeLesson.videoUrl}
             />
           ) : (
             <div className="flex-center" style={{ width: '100%', height: '500px', backgroundColor: 'var(--sidebar-bg)', color: 'white', flexDirection: 'column' }}>
                <PlayCircle size={64} style={{opacity: 0.5, marginBottom: '1rem'}} />
                <h3>{activeLesson?.title || 'No Lesson Selected'}</h3>
                {!enrollment && <p>Please enroll to view.</p>}
             </div>
           )}
           
           <div style={{ padding: '1.5rem' }}>
              <h2>{activeLesson?.title || course.title}</h2>
              <p className="text-muted mt-2">{activeLesson?.description || course.description}</p>
              
              {activeLesson && enrollment && !enrollment.completedLessons.includes(activeLesson._id) && (
                 <button className="btn btn-primary" style={{marginTop:'1.5rem'}} onClick={() => markComplete(activeLesson._id)}>
                     Mark as Complete
                 </button>
              )}
           </div>
        </div>
      </div>
      
      <div className="right-column" style={{ flex: 1 }}>
        <div className="white-panel">
            {!enrollment ? (
                <>
                   <h3>Join Course</h3>
                   <p className="text-muted" style={{fontSize: '0.9rem', marginBottom:'1.5rem', marginTop: '0.5rem'}}>Enroll now to access materials and track progress.</p>
                   <button className="btn btn-primary" style={{width:'100%'}} onClick={handleEnroll}>Enroll Now</button>
                </>
            ) : (
                <>
                   <h3>Your Progress</h3>
                   <div style={{height: '8px', background: 'var(--bg-main)', borderRadius: '4px', margin: '1rem 0', overflow: 'hidden'}}>
                      {/* Calculate width roughly. Avoid divide by 0 */}
                      <div style={{height: '100%', background: 'var(--card-green)', width: `${Math.min(100, (enrollment.completedLessons.length / Math.max(1, course.modules.reduce((acc, m) => acc + m.lessons.length, 0))) * 100)}%`}}></div>
                   </div>
                   <p className="text-muted" style={{fontSize: '0.8rem'}}>{enrollment.completedLessons.length} lessons completed</p>
                </>
            )}
        </div>
        
        <div className="white-panel" style={{ flex: 1 }}>
            <h3>Curriculum</h3>
            <div style={{marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
               {course.modules.map((mod, idx) => (
                  <div key={mod._id}>
                     <div style={{fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem'}}>Module {idx+1}: {mod.title}</div>
                     {mod.lessons.map((lesson) => {
                         const isCompleted = enrollment?.completedLessons.includes(lesson._id);
                         const isActive = activeLesson?._id === lesson._id;
                         return (
                           <div key={lesson._id} 
                                onClick={() => setActiveLesson(lesson)}
                                style={{
                                    padding: '0.8rem', 
                                    background: isActive ? 'var(--card-purple)' : 'var(--bg-main)', 
                                    color: isActive ? 'white' : 'var(--text-dark)',
                                    borderRadius: '8px', 
                                    marginBottom: '0.4rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: '0.85rem'
                                }}>
                               <span>{lesson.title}</span>
                               {isCompleted && <span style={{fontSize:'0.7rem', color: isActive ? 'white' : 'var(--success)'}}>Done</span>}
                           </div>
                         )
                     })}
                  </div>
               ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
