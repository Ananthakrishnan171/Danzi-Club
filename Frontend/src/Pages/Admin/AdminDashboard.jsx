import React from 'react';
import { Link } from 'react-router-dom';

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
        <DashboardCard title="Manage Students & Users" link="/admin/students" icon="🎓" />
        <DashboardCard title="Manage Events" link="/admin/events" icon="📅" />
        <DashboardCard title="Manage Classes" link="/admin/classes" icon="🕺" />
        <DashboardCard title="Manage Instructors" link="/admin/instructors" icon="👥" />
        <DashboardCard title="Manage Gallery" link="/admin/gallery" icon="🖼️" />
        <DashboardCard title="Manage Content" link="/admin/content" icon="📝" />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, link, icon }) => (
  <Link to={link} style={{ textDecoration: 'none' }}>
    <div style={{
      background: 'var(--glass-bg)',
      border: 'var(--glass-border)',
      padding: '2rem',
      borderRadius: 'var(--radius)',
      textAlign: 'center',
      transition: 'all 0.3s',
      color: 'var(--text-light)',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
      <h3>{title}</h3>
    </div>
  </Link>
);

export default AdminDashboard;
