import React from 'react';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import PeopleIcon from '@mui/icons-material/People';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import EditNoteIcon from '@mui/icons-material/EditNote';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard container" style={{ padding: '2rem', paddingTop: '120px' }}>
      <h1 className="section-title">Admin Dashboard</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome to the Content Management System.</p>
      
      <div className="admin-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <DashboardCard title="Manage Students & Users" link="/admin/students" icon={<SchoolIcon fontSize="inherit" />} />
        <DashboardCard title="Manage Events" link="/admin/events" icon={<EventIcon fontSize="inherit" />} />
        <DashboardCard title="Manage Classes" link="/admin/classes" icon={<DirectionsRunIcon fontSize="inherit" />} />
        <DashboardCard title="Manage Instructors" link="/admin/instructors" icon={<PeopleIcon fontSize="inherit" />} />
        <DashboardCard title="Manage Gallery" link="/admin/gallery" icon={<PhotoLibraryIcon fontSize="inherit" />} />
        <DashboardCard title="Manage Content" link="/admin/content" icon={<EditNoteIcon fontSize="inherit" />} />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, link, icon }) => (
  <Link to={link} style={{ textDecoration: 'none' }}>
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      padding: '2rem',
      borderRadius: '12px',
      textAlign: 'center',
      transition: 'all 0.3s',
      color: 'var(--text-light, #fff)',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    }}
    >
      <div style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#6366f1', display: 'flex', justifyContent: 'center' }}>
        {icon}
      </div>
      <h3>{title}</h3>
    </div>
  </Link>
);

export default AdminDashboard;
