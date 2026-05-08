import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { BookOpen, BarChart2, CreditCard, List, Box, Users, MessageSquare, Settings, LogOut, Search, Bell } from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, badge }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
  >
    <Icon size={20} />
    <span>{label}</span>
    {badge && (
      <span style={{ marginLeft: 'auto', background: 'var(--card-purple)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px' }}>
        {badge}
      </span>
    )}
  </NavLink>
);

const AppLayout = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const roleStr = user?.role || 'Student';

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <BookOpen size={24} />
          <span>Mini LMS</span>
        </div>

        <div className="user-profile-widget">
          <div style={{
              width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--sidebar-active-text)', color: 'var(--sidebar-bg)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 700, 
              margin: '0 auto 1rem auto', border: '3px solid rgba(255, 255, 255, 0.1)'
          }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <p>Welcome Back,</p>
          <h3>{user?.name || 'User'}</h3>
        </div>

        <nav className="nav-menu">
           {roleStr === 'Student' && (
             <>
                <SidebarItem to="/courses" icon={BookOpen} label="Course Catalog" />
                <SidebarItem to="/dashboard" icon={BarChart2} label="My Learning" />
             </>
           )}
           {roleStr === 'Instructor' && (
             <>
                <SidebarItem to="/dashboard" icon={BarChart2} label="Course Manager" />
                <SidebarItem to="/dashboard" icon={BookOpen} label="My Dashboard" />
             </>
           )}
           {roleStr === 'Admin' && (
             <>
                <SidebarItem to="/admin" icon={BarChart2} label="Admin Panel" />
             </>
           )}
          <SidebarItem to="/messages" icon={MessageSquare} label="Messages" badge="5" />
          <SidebarItem to="/settings" icon={Settings} label="Settings" />
        </nav>

        <div className="nav-footer">
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); logout(); }}>
            <LogOut size={20} />
            <span>Log Out</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-wrapper">
        <header className="top-header">
          <div className="page-title">
            <h1 style={{fontSize: '1.25rem', margin: 0}}>Dashboard</h1>
            <p style={{margin: 0}}>Learning Updates</p>
          </div>

          <div style={{display:'flex', alignItems: 'center', gap: '20px'}}>
             <div className="search-bar">
               <Search size={18} color="var(--text-muted)" />
               <input type="text" placeholder="Search" />
             </div>
             <button style={{background:'transparent', border:'none', cursor:'pointer'}}><Bell size={20} color="var(--text-dark)"/></button>
          </div>
        </header>

        {/* This is where the page content gets injected */}
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
