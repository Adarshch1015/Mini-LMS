import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(name, email, password, role);
      // redirect based on role
      if (user.role === 'Student') navigate('/dashboard');
      if (user.role === 'Instructor') navigate('/instructor');
      if (user.role === 'Admin') navigate('/admin');
    } catch (err) {
      alert('Registration Failed');
    }
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-main)'}}>
      <div className="auth-container">
        <h2 className="text-center mb-6" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              required 
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Account Role</label>
            <select 
              className="form-input" 
              value={role} 
              onChange={e => setRole(e.target.value)} 
            >
              <option value="Student">Student (Learn)</option>
              <option value="Instructor">Instructor (Teach)</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Register &rarr; </button>
        </form>
        <p className="text-center" style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
          Already have an account? <a href="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
