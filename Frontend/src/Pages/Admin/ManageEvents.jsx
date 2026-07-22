import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '', description: '', date: '', time: '', venue: '', category: '', status: 'Upcoming'
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await apiCall('/cms/events');
      if (res.success) setEvents(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenModal = (evt = null) => {
    if (evt) {
      setFormData({ ...evt, date: evt.date ? evt.date.split('T')[0] : '' });
      setEditingId(evt._id);
    } else {
      setFormData({ eventName: '', description: '', date: '', time: '', venue: '', category: '', status: 'Upcoming' });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await apiCall(`/cms/events/${editingId}`, 'PUT', formData);
      } else {
        await apiCall('/cms/events', 'POST', formData);
      }
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      alert('Error saving event');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await apiCall(`/cms/events/${id}`, 'DELETE');
        fetchEvents();
      } catch (err) {
        alert('Error deleting event');
      }
    }
  };

  return (
    <div className="container" style={{ padding: '2rem', paddingTop: '120px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Manage Events</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>+ Add Event</button>
      </div>
      
      <div className="table-responsive" style={{ background: 'var(--glass-bg)', borderRadius: 'var(--radius)', padding: '1rem' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', color: 'var(--text-light)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <th style={{ padding: '1rem' }}>Event Name</th>
              <th>Date & Time</th>
              <th>Venue</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((evt) => (
              <tr key={evt._id} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '1rem' }}>{evt.eventName}</td>
                <td>{new Date(evt.date).toLocaleDateString()} {evt.time}</td>
                <td>{evt.venue}</td>
                <td>{evt.status}</td>
                <td>
                  <button onClick={() => handleOpenModal(evt)} style={{ marginRight: '10px', padding: '0.25rem 0.5rem', background: '#eab308', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(evt._id)} style={{ padding: '0.25rem 0.5rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr><td colSpan="5" style={{ padding: '1rem', textAlign: 'center' }}>No events found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#111', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid #333' }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#fff' }}>{editingId ? 'Edit Event' : 'Add Event'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Event Name" value={formData.eventName} onChange={(e) => setFormData({...formData, eventName: e.target.value})} required style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              <input type="text" placeholder="Time (e.g. 10:00 AM)" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} required style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              <input type="text" placeholder="Venue" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} required style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} style={{ padding: '0.75rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
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

export default ManageEvents;
