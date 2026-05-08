import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { UploadCloud, Plus } from 'lucide-react';

const CourseEdit = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', category: '', isPublished: false });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${id}`);
        setCourse(res.data);
        setFormData({
            title: res.data.title,
            description: res.data.description,
            category: res.data.category,
            isPublished: res.data.isPublished,
            thumbnail: res.data.thumbnail || '',
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`/api/courses/${id}`, formData, config);
      alert('Course updated successfully!');
    } catch (error) {
       alert('Update failed');
    }
  };

  const [moduleTitle, setModuleTitle] = useState('');
  const handleAddModule = async (e) => {
      e.preventDefault();
      try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const res = await axios.post(`/api/courses/${id}/modules`, { title: moduleTitle, order: course.modules.length + 1 }, config);
          setCourse(res.data);
          setModuleTitle('');
      } catch (err) { alert('Failed to add module'); }
  };

  // State to hold lesson form for a specific module
  const [lessonForms, setLessonForms] = useState({});

  const handleFileChange = async (e, moduleId, field) => {
      const file = e.target.files[0];
      if(!file) return;
      
      const uploadData = new FormData();
      uploadData.append('media', file);
      
      try {
          setUploading(true);
          const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
          const { data } = await axios.post('/api/courses/upload', uploadData, config);
          
          setLessonForms({
              ...lessonForms,
              [moduleId]: { ...lessonForms[moduleId], [field]: data.filePath }
          })
          setUploading(false);
      } catch (err) {
          console.error(err);
          setUploading(false);
          alert('Upload failed');
      }
  };

  const handleAddLesson = async (moduleId) => {
      const lessonData = lessonForms[moduleId];
      if(!lessonData?.title) return alert('Lesson title required');
      
      try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const payload = {
              title: lessonData.title,
              description: lessonData.description || '',
              videoUrl: lessonData.videoUrl || '',
              documentUrl: lessonData.documentUrl || '',
              order: 1
          };
          
          const res = await axios.post(`/api/courses/${id}/modules/${moduleId}/lessons`, payload, config);
          setCourse(res.data.course);
          setLessonForms({ ...lessonForms, [moduleId]: {} });
      } catch (err) { alert('Failed to add lesson'); }
  };

  if (!course) return <div className="flex-center" style={{padding:'5rem'}}>Loading...</div>;

  return (
    <div className="content-scrollable">
      <div className="main-column" style={{ flex: 2 }}>
        <div className="white-panel mb-4">
          <h2>Edit Course Metadata</h2>
          <form onSubmit={handleUpdate} style={{marginTop: '1rem'}}>
             <div className="form-group">
                 <label className="form-label">Title</label>
                 <input type="text" className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
             </div>
             <div className="form-group">
                 <label className="form-label">Thumbnail URL (e.g. Unsplash Image)</label>
                 <input type="text" className="form-input" placeholder="https://..." value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} />
             </div>
             <div className="form-group">
                 <label className="form-label">Category</label>
                 <input type="text" className="form-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
             </div>
             <div className="form-group">
                 <label className="form-label">Description</label>
                 <textarea className="form-input" rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
             </div>
             <div className="form-group" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                 <input type="checkbox" id="publish" checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})} />
                 <label htmlFor="publish" className="form-label" style={{margin:0}}>Published (Visible to students)</label>
             </div>
             <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        </div>

        <div className="white-panel">
           <h2>Course Curriculum Builder</h2>
           {course.modules.length === 0 && (
               <div style={{background: 'var(--card-yellow)', color: 'var(--text-dark)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                   <strong>Step 1:</strong> Create a Module first (e.g. "Week 1: Introduction") to start uploading lesson videos!
               </div>
           )}
           
           {course.modules.map((mod, idx) => (
             <div key={mod._id} style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '1.5rem', marginTop: '1.5rem', background: 'white' }}>
                <h4 style={{marginBottom: '1rem'}}>Module {idx+1}: {mod.title}</h4>
                
                {mod.lessons.map((lesson, lIdx) => (
                    <div key={lesson._id} style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', marginBottom: '0.8rem', display: 'flex', justifyContent: 'space-between'}}>
                       <strong style={{fontSize: '1rem'}}>{lIdx+1}. {lesson.title}</strong>
                       <div style={{display:'flex', gap:'10px', fontSize:'0.8rem'}}>
                          {lesson.videoUrl && <span className="badge badge-success">Video Uploaded</span>}
                          {lesson.documentUrl && <span className="badge badge-warning">Doc Attached</span>}
                       </div>
                    </div>
                ))}

                <div style={{ marginTop: '1.5rem', background: 'var(--bg-main)', padding: '1.5rem', borderRadius: '8px', border: '2px dashed var(--border-light)' }}>
                   <h5 style={{fontSize: '1rem', fontWeight: 600, marginBottom: '1rem'}}>+ Upload New Lesson to this Module</h5>
                   <input type="text" placeholder="Lesson Title (e.g. 'Intro to React')" className="form-input mb-2" style={{marginBottom:'1rem', background: 'white'}}
                          value={lessonForms[mod._id]?.title || ''} 
                          onChange={(e) => setLessonForms({...lessonForms, [mod._id]: {...lessonForms[mod._id], title: e.target.value}})}
                   />
                   <div style={{ display: 'flex', gap: '20px', marginBottom: '1rem' }}>
                      <div style={{flex: 1, background: 'white', padding: '1rem', borderRadius: '8px'}}>
                         <label style={{fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>🎥 Upload Video (.mp4)</label>
                         <input type="file" accept="video/mp4" onChange={(e) => handleFileChange(e, mod._id, 'videoUrl')} />
                      </div>
                      <div style={{flex: 1, background: 'white', padding: '1rem', borderRadius: '8px'}}>
                         <label style={{fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>📄 Upload Document (.pdf)</label>
                         <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, mod._id, 'documentUrl')} />
                      </div>
                   </div>
                   {uploading && <p style={{fontSize:'0.9rem', color:'var(--card-purple)', fontWeight: 600}}>Uploading file... please wait.</p>}
                   <button className="btn btn-primary" style={{marginTop:'0.5rem', width:'100%'}} onClick={() => handleAddLesson(mod._id)}>
                       Save Lesson to Module
                   </button>
                </div>
             </div>
           ))}

           <form onSubmit={handleAddModule} style={{ marginTop: '2rem', display: 'flex', gap: '10px', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
               <input type="text" className="form-input" placeholder="New Module Title..." value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} required />
               <button type="submit" className="btn btn-primary" style={{whiteSpace: 'nowrap'}}><Plus size={16}/> Create Module</button>
           </form>
        </div>
      </div>
      <div className="right-column" style={{flex: 1}}>
         <div className="white-panel">
            <h3>Instructor Actions</h3>
            <p className="text-muted" style={{fontSize: '0.9rem', marginBottom: '1rem'}}>
               Add a Thumbnail image to your course to make it stand out.
            </p>
            <button className="btn btn-outline" style={{width: '100%', marginBottom: '1rem'}}
              onClick={() => navigate('/instructor')}
            >Back to Dashboard</button>
            <div style={{ height: '150px', borderRadius: '8px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-light)', backgroundImage: `url(${formData.thumbnail})`}}>
               {!formData.thumbnail && <div className="flex-center" style={{height:'100%', color:'var(--text-muted)'}}>No Thumbnail</div>}
            </div>
           <div className="white-panel" style={{marginTop: '1.5rem', border: '1px solid #ffcccc'}}>
              <h3 style={{color: 'red'}}>Danger Zone</h3>
              <p className="text-muted" style={{fontSize: '0.9rem', marginBottom: '1rem'}}>
                 Permanently delete this course and all its modules/lessons. This action cannot be undone.
              </p>
              <button className="btn" style={{width: '100%', background: 'red', color: 'white', fontWeight: 600}}
                onClick={async () => {
                    if (window.confirm("Are you absolutely sure you want to delete this course?")) {
                        try {
                            const config = { headers: { Authorization: `Bearer ${token}` } };
                            await axios.delete(`/api/courses/${id}`, config);
                            navigate('/instructor');
                        } catch (err) {
                            alert('Failed to delete course');
                        }
                    }
                }}
              >Delete Course</button>
           </div>
         </div>
      </div>
    </div>
  );
};

export default CourseEdit;
