import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', mobileNumber: '', role: 'Student', password: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await apiCall('/admin/users');
      if (res.success) {
        setStudents(res.users || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenModal = (student = null) => {
    if (student) {
      setFormData({ 
        fullName: student.fullName, 
        email: student.email, 
        mobileNumber: student.mobileNumber || '', 
        role: student.role,
        password: '' // Don't populate password on edit
      });
      setEditingId(student._id);
    } else {
      setFormData({ fullName: '', email: '', mobileNumber: '', role: 'Student', password: '' });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // If editing and password is empty, remove it so we don't update it to empty
      const payload = { ...formData };
      if (editingId && !payload.password) {
        delete payload.password;
      }

      if (editingId) {
        await apiCall(`/admin/users/${editingId}`, 'PUT', payload);
      } else {
        await apiCall('/admin/users', 'POST', payload);
      }
      setShowModal(false);
      fetchStudents();
    } catch (err) {
      alert(err.message || 'Error saving user');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await apiCall(`/admin/users/${id}`, 'DELETE');
        fetchStudents();
      } catch (err) {
        alert('Error deleting user');
      }
    }
  };

  return (
    <div className="container" style={{ padding: '2rem', paddingTop: '120px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Manage Users & Students</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Add User</button>
      </div>
      
      <div className="table-responsive" style={{ background: 'var(--glass-bg)', borderRadius: 'var(--radius)', padding: '1rem' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', color: 'var(--text-light)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <th style={{ padding: '1rem' }}>Full Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '1rem' }}>{student.fullName}</td>
                <td>{student.email}</td>
                <td>{student.mobileNumber}</td>
                <td>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '4px', 
                    fontSize: '0.85rem',
                    background: student.role === 'Admin' ? '#ef4444' : (student.role === 'Student' ? '#3b82f6' : '#22c55e') 
                  }}>
                    {student.role}
                  </span>
                </td>
                <td>
                  <button onClick={() => handleOpenModal(student)} style={{ marginRight: '10px', padding: '0.25rem 0.5rem', background: '#eab308', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(student._id)} style={{ padding: '0.25rem 0.5rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr><td colSpan="5" style={{ padding: '1rem', textAlign: 'center' }}>No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#111', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #333' }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#fff' }}>{editingId ? 'Edit User' : 'Add User'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              <input type="text" placeholder="Mobile Number" value={formData.mobileNumber} onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})} style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              
              <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}>
                <option value="User">User (Default)</option>
                <option value="Student">Student (Enrolled)</option>
                <option value="Admin">Admin</option>
              </select>

              <input 
                type="password" 
                placeholder={editingId ? "New Password (leave blank to keep current)" : "Password"} 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required={!editingId} 
                style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} 
              />
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" disabled={loading} style={{ flex: 1, padding: '0.75rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{loading ? 'Saving...' : 'Save'}</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '0.75rem', background: '#444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
