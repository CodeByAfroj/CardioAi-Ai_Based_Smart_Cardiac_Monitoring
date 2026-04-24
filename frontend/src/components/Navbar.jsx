import { NavLink, Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-brand">
        <div className="sidebar-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <div>
          <div className="sidebar-brand-text">Cardiac AI</div>
          <div className="sidebar-brand-sub">Health Monitoring</div>
        </div>
      </Link>

      <div className="sidebar-label">Menu</div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          Dashboard
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          About
        </NavLink>
      </nav>

      <div className="sidebar-label">Analysis</div>
      <nav className="sidebar-nav">
        <NavLink to="/reports" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          Clinical Reports
        </NavLink>
      </nav>

      <div className="sidebar-spacer"></div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">D</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">Dr. User</div>
          <div className="sidebar-user-role">Cardiologist</div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
