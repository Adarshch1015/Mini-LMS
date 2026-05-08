import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      // redirect based on role
      if (user.role === 'Student') navigate('/dashboard');
      if (user.role === 'Instructor') navigate('/instructor');
      if (user.role === 'Admin') navigate('/admin');
    } catch (err) {
      alert('Login Failed');
    }
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-main)'}}>
      <div className="auth-container">
        <h2 className="text-center mb-6" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Account Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login &rarr; </button>
        </form>
        <p className="text-center" style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
          Don't have an account? <a href="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
