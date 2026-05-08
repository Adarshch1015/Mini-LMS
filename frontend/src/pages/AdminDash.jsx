import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Users, BookOpen } from 'lucide-react';

const AdminDash = () => {
    const { token } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Technically admin should have specific endpoints but for this MVP we can get all courses
        axios.get('/api/courses').then(res => setCourses(res.data)).catch(console.error);
        // Note: Missing a user fetching endpoint in backend for MVP, let's mock the users list
    }, []);

    return (
        <div className="content-scrollable">
            <div className="main-column">
                <div className="metrics-row">
                    <div className="metric-card yellow">
                        <div className="metric-header">
                            <span><Users size={20}/> Total Users</span>
                        </div>
                        <div className="metric-value">1,248</div>
                    </div>
                    <div className="metric-card green">
                        <div className="metric-header">
                            <span><BookOpen size={20}/> Published Courses</span>
                        </div>
                        <div className="metric-value">{courses.length}</div>
                    </div>
                </div>

                <div className="white-panel">
                    <div className="panel-header">
                        <div className="panel-title">Platform Courses</div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {courses.map((c, i) => (
                            <div key={i} className="list-item">
                                <div className="list-item-left" style={{width: '60%'}}>
                                    <div style={{width:'40px', height:'40px', borderRadius:'8px', background:'var(--bg-main)', backgroundImage:`url(${c.thumbnail})`, backgroundSize:'cover'}}></div>
                                    <div>
                                        <div style={{fontWeight: 600, fontSize:'0.9rem'}}>{c.title}</div>
                                        <div style={{color: 'var(--text-muted)', fontSize:'0.8rem'}}>{c.category}</div>
                                    </div>
                                </div>
                                <div style={{width: '20%'}}>
                                    <span className={`badge ${c.isPublished ? 'badge-success' : 'badge-warning'}`}>{c.isPublished ? 'Public' : 'Draft'}</span>
                                </div>
                                <div style={{width: '20%', textAlign:'right'}}>
                                    <button className="btn btn-outline" style={{padding: '0.3rem 0.6rem', fontSize: '0.8rem'}}>Delete</button>
                                </div>
                            </div>
                        ))}
                        {courses.length === 0 && <p className="text-muted">No courses yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDash;
