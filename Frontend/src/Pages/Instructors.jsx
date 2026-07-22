import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

// Local Fallback Images
import instWestern from '../Assets/inst_western.png';
import instBharatanatyam from '../Assets/inst_bharatanatyam.png';
import instClassical from '../Assets/inst_classical.png';
import instHiphop from '../Assets/inst_hiphop.png';
import instBreakdance from '../Assets/inst_breakdance.png';
import instZumba from '../Assets/inst_zumba.png';

// Fallback seed list to ensure non-empty UI if server is unreachable
const fallbackInstructors = [
  {
    _id: 'fb-1',
    name: 'Sarah Jenkins',
    specialization: 'Western & Contemporary',
    designation: 'Senior Lead Choreographer',
    experience: '8+ Years',
    rating: '4.9 ★',
    photo: instWestern,
    biography: 'Specializes in modern western routines, emotional storytelling, and fluid floor work. Trained in London & NYC.',
    achievements: 'Winner of European Contemporary Championship, 1200+ Trained Students',
    schedule: 'Mon, Wed, Fri • 5:00 PM - 7:00 PM',
    languages: 'English, French',
    certificates: 'Royal Academy of Dance (RAD) Master Certificate',
    socialLinks: { instagram: 'https://instagram.com', twitter: 'https://twitter.com' }
  },
  {
    _id: 'fb-2',
    name: 'Anand Sharma',
    specialization: 'Bharatanatyam Classical',
    designation: 'Master Classical Guru',
    experience: '14+ Years',
    rating: '5.0 ★',
    photo: instBharatanatyam,
    biography: 'Master of ancient South Indian classical traditions, nritta (pure dance), and intricate abhinaya dramatic expressions.',
    achievements: 'Natya Kala Bhushan Award, Performed in over 15 countries',
    schedule: 'Tue, Thu, Sat • 6:00 AM - 8:00 AM',
    languages: 'English, Tamil, Hindi',
    certificates: 'Sangeet Natak Akademi Recognition',
    socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com' }
  },
  {
    _id: 'fb-3',
    name: 'Elena Rostova',
    specialization: 'Classical Ballet & Opera',
    designation: 'Principal Ballet Instructor',
    experience: '12+ Years',
    rating: '4.9 ★',
    photo: instClassical,
    biography: 'Former soloist in European ballet academies. Specializes in posture alignment, pointe work, and stage presence.',
    achievements: 'Prima Ballerina soloist at St. Petersburg Opera, Best Choreography 2022',
    schedule: 'Mon, Thu • 4:00 PM - 6:00 PM',
    languages: 'English, Russian',
    certificates: 'Vaganova Ballet Academy Diploma',
    socialLinks: { instagram: 'https://instagram.com' }
  },
  {
    _id: 'fb-4',
    name: 'Marcus "DJ" Cole',
    specialization: 'Hip Hop & Street Styles',
    designation: 'Urban Style Director',
    experience: '9+ Years',
    rating: '4.8 ★',
    photo: instHiphop,
    biography: 'Renowned street dancer specializing in popping, locking, old-school hip hop grooves, and competitive team routines.',
    achievements: 'World Hip Hop International Top 3 Finalist, Featured Music Video Director',
    schedule: 'Tue, Fri • 6:00 PM - 8:00 PM',
    languages: 'English',
    certificates: 'Urban Dance Alliance Master Instructor',
    socialLinks: { instagram: 'https://instagram.com', twitter: 'https://twitter.com' }
  },
  {
    _id: 'fb-5',
    name: 'Leo "Spin" Vance',
    specialization: 'Break Dance & Acrobatics',
    designation: 'B-Boy Head Coach',
    experience: '10+ Years',
    rating: '4.9 ★',
    photo: instBreakdance,
    biography: 'Red Bull BC One finalist. Teaches high-velocity power moves, top-rocking, freezes, and safe breakdance mechanics.',
    achievements: 'Red Bull BC One Regional Champion, 10+ Years Power Move Coach',
    schedule: 'Wed, Sat • 5:00 PM - 7:00 PM',
    languages: 'English, Spanish',
    certificates: 'Certified Olympic Breakdancing Judge & Trainer',
    socialLinks: { instagram: 'https://instagram.com' }
  },
  {
    _id: 'fb-6',
    name: 'Maria Gonzalez',
    specialization: 'Zumba & Latin Cardio',
    designation: 'Master Zumba Trainer',
    experience: '7+ Years',
    rating: '4.9 ★',
    photo: instZumba,
    biography: 'Certified master Zumba instructor bringing high-energy Latin cardio, Salsa, and Merengue beats to every workout class.',
    achievements: 'ZIN™ Licensed International Presenter, 2000+ Active Fitness Members',
    schedule: 'Mon, Tue, Thu • 7:00 AM - 8:30 AM',
    languages: 'English, Spanish',
    certificates: 'Zumba Network Master License (B1, B2, Pro Skills)',
    socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com' }
  },
  {
    _id: 'fb-7',
    name: 'Priya Natarajan',
    specialization: 'Kathak & Indo-Western Fusion',
    designation: 'Senior Kathak Exponent',
    experience: '11+ Years',
    rating: '4.9 ★',
    photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800',
    biography: 'Renowned for lightning-fast spins (chakkars), complex rhythm cycles (tala), and blending Kathak with modern beats.',
    achievements: 'Lucknow Gharana Senior Fellow, Fusion Fest Award 2024',
    schedule: 'Tue, Sat • 10:00 AM - 12:00 PM',
    languages: 'English, Hindi',
    certificates: 'National Classical Dance Academy Master Degree',
    socialLinks: { instagram: 'https://instagram.com' }
  },
  {
    _id: 'fb-8',
    name: 'David "Apex" Miller',
    specialization: 'Krump & Urban Dance',
    designation: 'High-Intensity Street Instructor',
    experience: '8+ Years',
    rating: '4.8 ★',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    biography: 'Expressive, high-energy Krump and urban street dancer with music video, concert tour, and battle tournament credits.',
    achievements: 'EBS Krump World Battle Quarter-Finalist',
    schedule: 'Thu, Sun • 4:00 PM - 6:00 PM',
    languages: 'English',
    certificates: 'Street Movement Certified Specialist',
    socialLinks: { instagram: 'https://instagram.com', twitter: 'https://twitter.com' }
  },
  {
    _id: 'fb-9',
    name: 'Sophia Lin',
    specialization: 'K-Pop & Jazz Funk',
    designation: 'Pop Choreography Specialist',
    experience: '6+ Years',
    rating: '4.9 ★',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    biography: 'Expert in sharp formation transitions, facial expressions, and mastering trending K-Pop idol routines and Jazz Funk style.',
    achievements: '1M Dance Studio Guest Instructor, Cover Dance Festival Winner',
    schedule: 'Mon, Fri • 3:00 PM - 5:00 PM',
    languages: 'English, Korean, Mandarin',
    certificates: 'International Pop Choreography Certification',
    socialLinks: { instagram: 'https://instagram.com' }
  },
  {
    _id: 'fb-10',
    name: 'Carlos Ramos',
    specialization: 'Salsa & Sensual Bachata',
    designation: 'Partnering & Social Dance Lead',
    experience: '10+ Years',
    rating: '4.9 ★',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    biography: 'International Latin dancer teaching Cuban Salsa, Sensual Bachata, partner leading/following techniques, and musicality.',
    achievements: 'World Latin Dance Cup Semi-Finalist, 1500+ Partnering Workshops Conducted',
    schedule: 'Wed, Sat • 7:00 PM - 9:00 PM',
    languages: 'English, Spanish',
    certificates: 'World Salsa Federation Master Educator',
    socialLinks: { instagram: 'https://instagram.com', facebook: 'https://facebook.com' }
  }
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    const els = document.querySelectorAll('.reveal, .stagger-children');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);
}

const Instructors = () => {
  useReveal();
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModal, setActiveModal] = useState(null);

  // Fetch instructors from Backend API
  const fetchInstructors = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const apiUrl = baseUrl.endsWith('/cms/instructors') ? baseUrl : `${baseUrl.replace(/\/$/, '')}/cms/instructors`;
      console.log('Fetching instructors from API:', apiUrl);

      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      console.log('API Response received:', data);

      let fetchedList = [];
      if (data && data.success && Array.isArray(data.data)) {
        fetchedList = data.data;
      } else if (Array.isArray(data)) {
        fetchedList = data;
      }

      if (fetchedList.length > 0) {
        setTrainers(fetchedList);
      } else {
        setTrainers(fallbackInstructors);
      }
    } catch (err) {
      console.error('Failed to load instructors from backend:', err);
      setTrainers(fallbackInstructors);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  // Category options
  const categoryFilters = [
    'All',
    'Western & Contemporary',
    'Classical',
    'Hip Hop & Break',
    'Zumba & Latin'
  ];

  // Filtering & Search Logic
  const filteredTrainers = trainers.filter(trainer => {
    const spec = (trainer.specialization || trainer.category || '').toLowerCase();
    const name = (trainer.name || '').toLowerCase();
    const desig = (trainer.designation || '').toLowerCase();
    const query = searchQuery.trim().toLowerCase();

    let matchesCat = true;
    if (selectedCategory === 'Western & Contemporary') {
      matchesCat = spec.includes('western') || spec.includes('contemporary');
    } else if (selectedCategory === 'Classical') {
      matchesCat = spec.includes('classical') || spec.includes('bharatanatyam') || spec.includes('kathak') || spec.includes('ballet');
    } else if (selectedCategory === 'Hip Hop & Break') {
      matchesCat = spec.includes('hip hop') || spec.includes('break') || spec.includes('street') || spec.includes('krump') || spec.includes('urban');
    } else if (selectedCategory === 'Zumba & Latin') {
      matchesCat = spec.includes('zumba') || spec.includes('latin') || spec.includes('salsa') || spec.includes('bachata') || spec.includes('cardio');
    }

    const matchesSearch = !query || name.includes(query) || spec.includes(query) || desig.includes(query);

    return matchesCat && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main>
        <section className="section" style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '80vh' }}>
          <div className="section-header reveal">
            <span className="section-tag">✦ Master Faculty ({trainers.length} Trainers Available)</span>
            <h1 className="section-title">Meet Our <span className="highlight">World-Class Instructors</span></h1>
            <p className="section-desc">
              Learn directly from industry masters, international champions, and passionate choreographers dedicated to elevating your dance journey.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="reveal" style={{ margin: '2rem 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '520px' }}>
              <input
                type="text"
                placeholder="🔍 Search trainer by name, dance style, or designation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.9rem 1.35rem',
                  borderRadius: '100px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}
              />
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
              {categoryFilters.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-ghost'}`}
                  style={{
                    borderRadius: '100px',
                    padding: '0.5rem 1.25rem',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="cards-grid" style={{ marginTop: '2rem' }}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    height: '460px',
                    animation: 'pulse 1.5s infinite ease-in-out',
                    padding: '1rem'
                  }}
                />
              ))}
            </div>
          )}

          {/* Instructor Cards Grid */}
          {!loading && filteredTrainers.length > 0 && (
            <div className="cards-grid" style={{ marginTop: '2rem' }}>
              {filteredTrainers.map((trainer) => (
                <div
                  className="card style-card"
                  key={trainer._id || trainer.name}
                  style={{
                    textAlign: 'left',
                    overflow: 'hidden',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    opacity: 1,
                    transform: 'none'
                  }}
                >
                  <div className="style-image" style={{ height: '320px', position: 'relative', width: '100%', overflow: 'hidden' }}>
                    <img
                      src={trainer.photo || trainer.image || instWestern}
                      alt={`${trainer.name} - ${trainer.specialization || trainer.category}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = instWestern; }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(10, 10, 10, 0.8)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '100px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: 'var(--accent)',
                      border: '1px solid rgba(163, 230, 53, 0.3)'
                    }}>
                      {trainer.experience || '8+ Years'}
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      background: 'rgba(10, 10, 10, 0.8)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '100px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      color: '#fff',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }}>
                      {trainer.specialization || trainer.category}
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <h3 style={{ margin: '0', color: '#fff', fontSize: '1.35rem', fontFamily: 'var(--font-heading)' }}>{trainer.name}</h3>
                        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#f59e0b' }}>{trainer.rating || '4.9 ★'}</span>
                      </div>
                      <p style={{ margin: '0 0 0.85rem 0', color: 'var(--accent)', fontWeight: '600', fontSize: '0.875rem' }}>
                        {trainer.designation || 'Specialist Instructor'}
                      </p>
                      <p style={{ margin: '0 0 1.25rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.55', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {trainer.biography || 'Professional dance coach with extensive national and international choreography experience.'}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>
                      <button
                        onClick={() => setActiveModal(trainer)}
                        className="btn btn-outline"
                        style={{ flex: 1, fontSize: '0.85rem', padding: '0.55rem' }}
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => navigate('/admission')}
                        className="btn btn-primary"
                        style={{ flex: 1, fontSize: '0.85rem', padding: '0.55rem', textAlign: 'center' }}
                      >
                        Join Class →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty / No Results State */}
          {!loading && filteredTrainers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🕺</div>
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>No instructors available</h3>
              <p>No dance trainers match your current search or category filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="btn btn-ghost"
                style={{ marginTop: '1.25rem' }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* Modal Dialog for Trainer Profile */}
        {activeModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setActiveModal(null)}
          >
            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-xl)',
                maxWidth: '650px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 'var(--shadow-md)',
                animation: 'fadeInUp 0.3s ease-out',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ height: '260px', position: 'relative' }}>
                <img
                  src={activeModal.photo || activeModal.image || instWestern}
                  alt={activeModal.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  onClick={() => setActiveModal(null)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <h2 style={{ margin: 0, color: '#fff', fontSize: '1.75rem', fontFamily: 'var(--font-heading)' }}>{activeModal.name}</h2>
                    <p style={{ margin: '0.25rem 0 0 0', color: 'var(--accent)', fontWeight: '600', fontSize: '0.95rem' }}>
                      {activeModal.designation || activeModal.specialization}
                    </p>
                  </div>
                  <span style={{ background: 'rgba(163, 230, 53, 0.15)', color: 'var(--accent)', padding: '0.4rem 0.85rem', borderRadius: '100px', fontWeight: '700', fontSize: '0.85rem' }}>
                    {activeModal.experience || '8+ Years'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', margin: '1.25rem 0' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Dance Styles</span>
                    <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{activeModal.specialization || 'Western & Contemporary'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Weekly Schedule</span>
                    <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{activeModal.schedule || 'Mon, Wed, Fri • 5:00 PM'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Languages Spoken</span>
                    <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{activeModal.languages || 'English'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Student Rating</span>
                    <strong style={{ color: '#f59e0b', fontSize: '0.9rem' }}>{activeModal.rating || '4.9 ★'}</strong>
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.4rem' }}>Biography</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.9rem', margin: 0 }}>
                    {activeModal.biography || 'Passionate dance coach with deep expertise in performance, rhythm, and choreography.'}
                  </p>
                </div>

                {activeModal.achievements && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.4rem' }}>Key Achievements</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>🏆 {activeModal.achievements}</p>
                  </div>
                )}

                {activeModal.certificates && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.4rem' }}>Certifications</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>📜 {activeModal.certificates}</p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-glass)' }}>
                  <button
                    className="btn btn-primary btn-large"
                    style={{ flex: 1, textAlign: 'center' }}
                    onClick={() => {
                      setActiveModal(null);
                      navigate('/admission');
                    }}
                  >
                    Enroll in Classes with {activeModal.name.split(' ')[0]} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Instructors;
