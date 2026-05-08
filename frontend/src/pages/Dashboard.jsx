import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, Video, Award, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get('/api/courses/my-courses', config);
        setCourses(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [token]);

  if (loading) return <div className="flex-center" style={{padding: '5rem'}}>Loading LMS Analytics...</div>;

  const published = courses.filter(c => c.isPublished).length;
  const drafts = courses.length - published;
  const totalModules = courses.reduce((acc, curr) => acc + curr.modules.length, 0);

  return (
    <div className="content-scrollable">
      <div className="main-column" style={{flex: 2}}>
        {/* Metric Cards */}
        <div className="metrics-row">
          <div className="metric-card purple">
            <div className="metric-header">
              <span>Total Courses</span>
            </div>
            <div className="metric-value">{courses.length}</div>
            <div style={{marginTop: 'auto', display: 'flex', gap: '10px', alignItems: 'center'}}>
               <BookOpen size={20} opacity={0.8}/>
               <span style={{fontSize: '0.9rem', opacity: 0.8}}>Active in catalog</span>
            </div>
          </div>
          
          <div className="metric-card green">
            <div className="metric-header">
              <span>Published</span>
            </div>
            <div className="metric-value">{published}</div>
             <div style={{marginTop: 'auto', display: 'flex', gap: '10px', alignItems: 'center'}}>
               <CheckCircle size={20} opacity={0.8}/>
               <span style={{fontSize: '0.9rem', opacity: 0.8}}>Live to students</span>
            </div>
          </div>

          <div className="metric-card yellow">
            <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Total Curriculum</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '0.5rem', marginBottom: '1rem' }}>
               You have created {totalModules} modules across all your teachings.
            </span>
            <div style={{marginTop: 'auto', display: 'flex', gap: '10px', alignItems: 'center'}}>
               <Video size={20} opacity={0.8} color="var(--text-dark)"/>
               <span style={{fontSize: '0.9rem', opacity: 0.8, color: 'var(--text-dark)'}}>Video Modules</span>
            </div>
          </div>
        </div>

        {/* Real Courses List */}
        <div className="transparent-panel" style={{marginTop: '2rem'}}>
          <div className="panel-header">
            <div className="panel-title">My Recent Courses</div>
          </div>
          
          <div style={{display: 'flex', flexDirection: 'column'}}>
             {courses.length === 0 ? <p className="text-muted">No courses built yet.</p> : courses.slice(0, 5).map((row, i) => (
                <div key={i} className="list-item" style={{borderBottom: i === courses.length -1 ? 'none' : ''}}>
                  <div className="list-item-left" style={{width: '40%'}}>
                    <BookOpen size={20} color="var(--card-purple)"/>
                    <span style={{fontWeight: 600, fontSize:'0.9rem'}}>{row.title}</span>
                  </div>
                  <div style={{fontWeight: 500, fontSize:'0.9rem', width: '20%'}}>{row.category}</div>
                  <div style={{display:'flex', alignItems: 'center', gap: '8px', width: '20%', fontSize:'0.9rem'}}>
                    <div style={{width:'8px', height:'8px', borderRadius: '50%', backgroundColor: row.isPublished ? 'var(--card-green)' : 'var(--card-yellow)'}}></div>
                    <span style={{color: 'var(--text-muted)'}}>{row.isPublished ? 'Live' : 'Draft'}</span>
                  </div>
                  <div style={{color: 'var(--text-muted)', fontSize:'0.85rem', width: '20%', textAlign: 'right'}}>{new Date(row.createdAt).toLocaleDateString()}</div>
                </div>
             ))}
          </div>
        </div>
      </div>
      
      <div className="right-column" style={{flex: 1}}>
         {/* Ratio Chart */}
         <div className="white-panel" style={{textAlign: 'center'}}>
           <div className="flex-between">
              <div style={{textAlign: 'left'}}>
                 <div className="panel-title">Publication Ratio</div>
                 <div className="panel-subtitle">Drafts vs Live</div>
              </div>
              <div style={{padding:'8px', background: 'var(--bg-main)', borderRadius: '8px'}}><Award strokeWidth={1.5} size={20}/></div>
           </div>
           
           <div style={{position: 'relative', width: '180px', height: '180px', margin: '2rem auto', borderRadius: '50%', background: courses.length === 0 ? 'var(--bg-main)' : `conic-gradient(var(--card-green) 0% ${(published/courses.length)*100}%, var(--card-yellow) ${(published/courses.length)*100}% 100%)`}}>
              <div style={{position:'absolute', inset:'20px', background:'white', borderRadius:'50%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                 <span style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Total</span>
                 <span style={{fontSize:'1.3rem', fontWeight: 700}}>{courses.length}</span>
              </div>
           </div>
           
           <div style={{display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', paddingLeft: '1rem'}}>
              <div style={{position: 'relative'}}>
                 <div style={{position:'absolute', width:'20px', height:'2px', background:'var(--card-green)', left:'-30px', top:'10px'}}></div>
                 <div style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Published Courses</div>
                 <div style={{fontWeight: 700}}>{courses.length > 0 ? Math.round((published/courses.length)*100) : 0}%</div>
              </div>
              <div style={{position: 'relative'}}>
                 <div style={{position:'absolute', width:'20px', height:'2px', background:'var(--card-yellow)', left:'-30px', top:'10px'}}></div>
                 <div style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Drafts</div>
                 <div style={{fontWeight: 700}}>{courses.length > 0 ? Math.round((drafts/courses.length)*100) : 0}%</div>
              </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
