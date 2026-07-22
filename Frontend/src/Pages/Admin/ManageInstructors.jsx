import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';

const ManageInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', photo: '', experience: '', designation: '', specialization: '', biography: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const res = await apiCall('/cms/instructors');
      if (res.success) setInstructors(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenModal = (inst = null) => {
    if (inst) {
      setFormData({ 
        name: inst.name, photo: inst.photo || '', experience: inst.experience || '', 
        designation: inst.designation || '', specialization: inst.specialization || '', biography: inst.biography || ''
      });
      setEditingId(inst._id);
    } else {
      setFormData({ name: '', photo: '', experience: '', designation: '', specialization: '', biography: '' });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await apiCall(`/cms/instructors/${editingId}`, 'PUT', formData);
      } else {
        await apiCall('/cms/instructors', 'POST', formData);
      }
      setShowModal(false);
      fetchInstructors();
    } catch (err) {
      alert('Error saving instructor');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this instructor?')) {
      try {
        await apiCall(`/cms/instructors/${id}`, 'DELETE');
        fetchInstructors();
      } catch (err) {
        alert('Error deleting instructor');
      }
    }
  };

  return (
    <div className="container" style={{ padding: '2rem', paddingTop: '120px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Manage Instructors</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Add Instructor</button>
      </div>
      
      <div className="table-responsive" style={{ background: 'var(--glass-bg)', borderRadius: 'var(--radius)', padding: '1rem' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', color: 'var(--text-light)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <th style={{ padding: '1rem' }}>Photo</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((inst) => (
              <tr key={inst._id} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '1rem' }}>
                  {inst.photo ? <img src={inst.photo} alt={inst.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} /> : 'No Image'}
                </td>
                <td>{inst.name}</td>
                <td>{inst.designation}</td>
                <td>{inst.specialization}</td>
                <td>
                  <button onClick={() => handleOpenModal(inst)} style={{ marginRight: '10px', padding: '0.25rem 0.5rem', background: '#eab308', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(inst._id)} style={{ padding: '0.25rem 0.5rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
            {instructors.length === 0 && (
              <tr><td colSpan="5" style={{ padding: '1rem', textAlign: 'center' }}>No instructors found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#111', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #333' }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#fff' }}>{editingId ? 'Edit Instructor' : 'Add Instructor'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              <input type="text" placeholder="Designation (e.g. Lead Instructor)" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} required style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              <input type="text" placeholder="Specialization (e.g. Hip Hop)" value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              <input type="text" placeholder="Experience (e.g. 5 Years)" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              <input type="text" placeholder="Photo URL" value={formData.photo} onChange={(e) => setFormData({...formData, photo: e.target.value})} style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              <textarea placeholder="Biography" value={formData.biography} onChange={(e) => setFormData({...formData, biography: e.target.value})} rows="3" style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}></textarea>
              
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

export default ManageInstructors;
