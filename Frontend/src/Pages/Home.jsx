import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';

// Fallback images from local assets & curated high-res dance photography
import instWestern from '../Assets/inst_western.png';
import instBharatanatyam from '../Assets/inst_bharatanatyam.png';
import instClassical from '../Assets/inst_classical.png';
import instHiphop from '../Assets/inst_hiphop.png';

// Intersection Observer for scroll animations
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const els = document.querySelectorAll('.reveal, .stagger-children');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);
}

const Home = () => {
  useReveal();

  // State management
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [countdown, setCountdown] = useState({ days: 12, hours: 8, mins: 45, secs: 30 });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Featured Instructors Preview Data
  const featuredInstructors = [
    {
      name: 'Sarah Jenkins',
      specialization: 'Western & Contemporary',
      experience: '8+ Years',
      rating: '4.9 ★',
      photo: instWestern,
      designation: 'Senior Lead Choreographer'
    },
    {
      name: 'Anand Sharma',
      specialization: 'Bharatanatyam Classical',
      experience: '14+ Years',
      rating: '5.0 ★',
      photo: instBharatanatyam,
      designation: 'Master Classical Guru'
    },
    {
      name: 'Elena Rostova',
      specialization: 'Classical Ballet & Opera',
      experience: '12+ Years',
      rating: '4.9 ★',
      photo: instClassical,
      designation: 'Principal Ballet Instructor'
    },
    {
      name: 'Marcus "DJ" Cole',
      specialization: 'Hip Hop & Street Styles',
      experience: '9+ Years',
      rating: '4.8 ★',
      photo: instHiphop,
      designation: 'Urban Style Director'
    }
  ];

  // Dance Styles Catalog
  const danceStyles = [
    {
      name: 'Hip Hop & Urban Street',
      category: 'Street Styles',
      img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=800',
      desc: 'High-octane urban moves, popping, locking, and battle choreography.'
    },
    {
      name: 'Bharatanatyam Classical',
      category: 'Indian Classical',
      img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800',
      desc: 'Ancient South Indian dance featuring nritta rhythm and abhinaya drama.'
    },
    {
      name: 'Western Contemporary',
      category: 'Modern Expression',
      img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
      desc: 'Fluid floor work, emotional storytelling, and modern artistic freedom.'
    },
    {
      name: 'Kathak & Indo-Fusion',
      category: 'Classical Fusion',
      img: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&q=80&w=800',
      desc: 'Rapid spins (chakkars), complex tala rhythm cycles, and fusion beats.'
    },
    {
      name: 'Zumba & Latin Cardio',
      category: 'Fitness',
      img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
      desc: 'High-energy Latin cardio workout combining Salsa, Merengue, and Reggaeton.'
    },
    {
      name: 'Classical Ballet',
      category: 'Technique & Grace',
      img: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&q=80&w=800',
      desc: 'Foundational poise, posture alignment, flexibility, and pointe work.'
    },
    {
      name: 'Salsa & Sensual Bachata',
      category: 'Social Partnering',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      desc: 'Cuban Salsa and Bachata social partnering, musicality, and leading skills.'
    },
    {
      name: 'Break Dance & Acrobatics',
      category: 'B-Boying',
      img: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&q=80&w=800',
      desc: 'Top-rocking, power moves, freezes, and safe acrobatic tumbling.'
    }
  ];

  // Upcoming Events Timeline Data
  const upcomingEvents = [
    {
      title: 'Summer Dance Intensive Bootcamp 2026',
      date: 'JUNE 15 - 30, 2026',
      location: 'Main Studio & Grand Auditorium',
      desc: 'A 2-week immersive masterclass program led by international guest choreographers.',
      tag: 'BOOTCAMP'
    },
    {
      title: 'Danzi Annual Grand Showcase & Awards',
      date: 'AUGUST 10, 2026',
      location: 'City Performing Arts Center',
      desc: 'Our flagship annual stage showcase featuring 500+ dancers and live orchestra.',
      tag: 'GRAND STAGE'
    },
    {
      title: 'International Salsa & Bachata Congress',
      date: 'SEPTEMBER 05, 2026',
      location: 'Danzi Arena',
      desc: 'Weekend festival with social dance nights, partnering workshops, and Latin DJs.',
      tag: 'FESTIVAL'
    },
    {
      title: 'National Street Dance Battle Championship',
      date: 'OCTOBER 20, 2026',
      location: 'Indoor Sports Complex',
      desc: 'Cash prize 1v1 and crew battles in Hip Hop, Popping, and Breakdance.',
      tag: 'COMPETITION'
    }
  ];

  // Masonry Gallery Images
  const galleryItems = [
    { src: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1000', title: 'Contemporary Stage Solo', category: 'Stage Performance' },
    { src: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=1000', title: 'Urban Hip Hop Crew Battle', category: 'Street Battles' },
    { src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=1000', title: 'Classical Bharatanatyam Recital', category: 'Classical' },
    { src: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&q=80&w=1000', title: 'Ballet Academy Ensemble', category: 'Ballet' },
    { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000', title: 'High-Energy Zumba Concert', category: 'Fitness' },
    { src: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&q=80&w=1000', title: 'B-Boy Power Move Showcase', category: 'Breakdance' }
  ];

  // Testimonials Carousel Data
  const testimonials = [
    {
      name: 'Rohan Deshmukh',
      role: 'Advanced Hip Hop Student',
      rating: '5.0 ★★★★★',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      text: 'Joining Danzi was the best decision of my creative career. The trainers don’t just teach routines; they build your musicality, stage presence, and confidence.'
    },
    {
      name: 'Ananya Roy',
      role: 'Bharatanatyam Practitioner',
      rating: '5.0 ★★★★★',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200',
      text: 'The classical discipline and attention to posture alignment here are unmatched. Master Anand Sharma’s guidance transformed my footwork and expression!'
    },
    {
      name: 'David K. Vance',
      role: 'Contemporary & Jazz Student',
      rating: '5.0 ★★★★★',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      text: 'The facility is world-class with sprung floors and awesome sound systems. The community vibe makes every single class feel like a celebration.'
    }
  ];

  return (
    <>
      <main style={{ overflowX: 'hidden' }}>

        {/* 1. SPLIT HERO SECTION (TWO COLUMNS, FULL WIDTH, NO BLANK SPACES) */}
        <section 
          style={{
            position: 'relative',
            paddingTop: '130px',
            paddingBottom: '80px',
            background: 'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(163, 230, 53, 0.12) 0%, rgba(10, 10, 10, 1) 70%)',
            overflow: 'hidden'
          }}
        >
          {/* Ambient Spotlight & Motion Glows */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '350px',
            height: '350px',
            background: 'rgba(163, 230, 53, 0.08)',
            filter: 'blur(100px)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '5%',
            width: '400px',
            height: '400px',
            background: 'rgba(34, 211, 238, 0.06)',
            filter: 'blur(120px)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />

          <div className="section" style={{ padding: '0 clamp(1.5rem, 5vw, 4rem)', maxWidth: '1320px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center'
            }}>
              
              {/* LEFT COLUMN: Typography & CTAs */}
              <div>
                <div 
                  className="hero-badge" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.6rem',
                    background: 'rgba(163, 230, 53, 0.1)',
                    border: '1px solid rgba(163, 230, 53, 0.3)',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '100px',
                    color: 'var(--accent)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  <span className="dot" /> ✦ ADMISSIONS OPEN FOR 2026 BATCHES
                </div>

                <h1 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: '-1.5px',
                  color: '#fff',
                  marginBottom: '1.25rem'
                }}>
                  Dance Beyond Limits.<br />
                  <span className="highlight">Every Step</span> Creates a Legacy.
                </h1>

                <p style={{
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.65',
                  marginBottom: '2.25rem',
                  maxWidth: '560px'
                }}>
                  Welcome to Danzi Dance Club — the ultimate studio for aspiring dancers. Master classical traditions, urban street rhythms, and contemporary choreography under world-class faculty.
                </p>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '3rem' }}>
                  <Link to="/admission" className="btn btn-primary btn-large" style={{ fontSize: '1rem', padding: '0.9rem 2.25rem' }}>
                    Start Dancing Now →
                  </Link>
                  <a href="#video-showcase" className="btn btn-outline btn-large" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
                    Watch Studio Demo ▶
                  </a>
                </div>

                {/* Hero Stats Cards Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1.25rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border-glass)'
                }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid var(--border-glass)' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)' }}>2,500+</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>⭐ Active Dancers Enrolled</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid var(--border-glass)' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#22d3ee' }}>18+ Years</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>🏆 Excellence & Legacy</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid var(--border-glass)' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b' }}>40+ Styles</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>🎭 From Classical to Urban</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid var(--border-glass)' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#a855f7' }}>150+ Events</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>🌎 Workshops & Showcases</div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Overlapping Premium Dancers Showcase */}
              <div style={{ position: 'relative', height: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Main Large Card */}
                <div style={{
                  position: 'absolute',
                  width: '78%',
                  height: '420px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transform: 'rotate(-2deg)'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1000" 
                    alt="Contemporary Dancer Showcase" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                  }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Program</span>
                    <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '0.2rem 0 0 0' }}>Contemporary & Expressionism</h3>
                  </div>
                </div>

                {/* Overlapping Glass Floating Card 1 */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '0',
                  width: '210px',
                  height: '240px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(163, 230, 53, 0.4)',
                  transform: 'rotate(6deg)',
                  zIndex: 2
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=600" 
                    alt="Urban Hip Hop" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Floating Glass Badge Card 2 */}
                <div style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '-10px',
                  background: 'rgba(17, 17, 17, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '1rem 1.25rem',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  zIndex: 3
                }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a', fontSize: '1.3rem', fontWeight: 800 }}>
                    🔥
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>#1 Rated Dance Academy</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Voted Best Studio 2025 & 2026</div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>


        {/* 2. FEATURE STRIP (4 PREMIUM CARDS BELOW HERO) */}
        <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)', padding: '3rem 0' }}>
          <div className="section" style={{ padding: '0 clamp(1.5rem, 4vw, 4rem)', maxWidth: '1280px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              
              <div className="card" style={{ background: 'var(--bg-card)', padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(163,230,53,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                  🎓
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Certified Trainers</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>International accreditation & master degrees.</p>
                </div>
              </div>

              <div className="card" style={{ background: 'var(--bg-card)', padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(34,211,238,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                  ⏰
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Flexible Timings</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Morning, evening & weekend batch choices.</p>
                </div>
              </div>

              <div className="card" style={{ background: 'var(--bg-card)', padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                  ✨
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Performance Events</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Annual stage showcases & TV music videos.</p>
                </div>
              </div>

              <div className="card" style={{ background: 'var(--bg-card)', padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168,85,247,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                  🏆
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.25rem' }}>National Battles</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Championship preparation & battle squads.</p>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* 3. WHY CHOOSE DANZI (SPLIT SECTION) */}
        <section className="section reveal" style={{ padding: '5rem clamp(1.5rem, 4vw, 4rem)', maxWidth: '1280px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            {/* Left Image Studio Showcase */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-glass)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&q=80&w=1000" 
                  alt="Danzi Dance Studio Interior" 
                  style={{ width: '100%', height: '440px', objectFit: 'cover' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-glass)',
                padding: '1.25rem 1.5rem',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-md)'
              }}>
                <span style={{ fontSize: '2rem' }}>💃</span>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', marginTop: '0.2rem' }}>State-of-the-Art</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Sprung Wooden Flooring & Acoustics</div>
              </div>
            </div>

            {/* Right Features Content */}
            <div>
              <span className="section-tag">✦ WHY CHOOSE DANZI</span>
              <h2 className="section-title">Designed to Elevate Every Dancer</h2>
              <p className="section-desc" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
                We combine traditional artistic discipline with modern performance choreography, ensuring students build confidence, physical strength, and expressive mastery.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(163,230,53,0.15)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>✓</div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '1.1rem', margin: '0 0 0.2rem 0' }}>Expert Master Trainers</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Learn directly from award-winning gurus and industry leaders.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(163,230,53,0.15)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>✓</div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '1.1rem', margin: '0 0 0.2rem 0' }}>Modern Studio Environment</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Air-conditioned acoustic studios with full-length mirrors and sprung floors.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(163,230,53,0.15)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>✓</div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '1.1rem', margin: '0 0 0.2rem 0' }}>1-on-1 Personal Coaching</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Customized progress feedback tailored for beginners up to professionals.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(163,230,53,0.15)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>✓</div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '1.1rem', margin: '0 0 0.2rem 0' }}>Affordable & Transparent Pricing</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Flexible monthly, quarterly, and annual packages with zero hidden fees.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* 4. POPULAR DANCE STYLES (RESPONSIVE CARDS GRID) */}
        <section className="section reveal" style={{ padding: '4rem clamp(1.5rem, 4vw, 4rem)', maxWidth: '1320px' }}>
          <div className="section-header">
            <span className="section-tag">✦ POPULAR DANCE STYLES</span>
            <h2 className="section-title">Explore Our Dance Programs</h2>
            <p className="section-desc">
              Whether you crave high-energy street battles or classical grace, our diverse curriculum caters to all skill levels.
            </p>
          </div>

          <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', marginTop: '2.5rem' }}>
            {danceStyles.map((style, idx) => (
              <div 
                key={idx} 
                className="card style-card" 
                style={{ 
                  padding: 0, 
                  overflow: 'hidden', 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-glass)', 
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={style.img} 
                    alt={style.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  />
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(10,10,10,0.8)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--accent)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.3rem 0.75rem',
                    borderRadius: '100px',
                    border: '1px solid rgba(163,230,53,0.3)'
                  }}>
                    {style.category}
                  </span>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', margin: '0 0 0.5rem 0' }}>{style.name}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5', margin: '0 0 1.25rem 0' }}>
                      {style.desc}
                    </p>
                  </div>
                  <Link to="/admission" className="btn btn-outline" style={{ width: '100%', fontSize: '0.85rem', textAlign: 'center' }}>
                    Enroll & Explore →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* 5. OUR INSTRUCTORS PREVIEW */}
        <section className="section reveal" style={{ padding: '4rem clamp(1.5rem, 4vw, 4rem)', maxWidth: '1320px', background: 'var(--bg-secondary)', borderRadius: '32px', border: '1px solid var(--border-glass)', margin: '2rem auto' }}>
          <div className="section-header">
            <span className="section-tag">✦ MASTER FACULTY PREVIEW</span>
            <h2 className="section-title">Learn From Industry Legends</h2>
            <p className="section-desc">
              Our instructors bring decades of international performance and champion choreography to every class.
            </p>
          </div>

          <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
            {featuredInstructors.map((inst, idx) => (
              <div key={idx} className="card" style={{ padding: 0, overflow: 'hidden', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid var(--border-glass)' }}>
                <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                  <img src={inst.photo} alt={inst.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(10,10,10,0.8)', padding: '0.3rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)' }}>
                    {inst.experience}
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>{inst.name}</h3>
                    <span style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: 700 }}>{inst.rating}</span>
                  </div>
                  <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>{inst.designation}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/instructors" className="btn btn-primary btn-large">
              Meet All 10 Instructors →
            </Link>
          </div>
        </section>


        {/* 6. UPCOMING EVENTS & TIMELINE (WITH COUNTDOWN TIMER) */}
        <section className="section reveal" style={{ padding: '5rem clamp(1.5rem, 4vw, 4rem)', maxWidth: '1280px' }}>
          <div className="section-header">
            <span className="section-tag">✦ UPCOMING EVENTS & WORKSHOPS</span>
            <h2 className="section-title">Mark Your Dance Calendar</h2>
            <p className="section-desc">Join our upcoming stage showcases, intensive bootcamps, and national dance battles.</p>
          </div>

          {/* Countdown Timer Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(163,230,53,0.12) 0%, rgba(34,211,238,0.08) 100%)',
            border: '1px solid rgba(163,230,53,0.3)',
            borderRadius: '24px',
            padding: '2rem',
            marginBottom: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}>
            <div>
              <span style={{ background: 'var(--accent)', color: '#0a0a0a', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem' }}>NEXT MAJOR EVENT</span>
              <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: '0.5rem 0 0.25rem 0' }}>Summer Dance Intensive Bootcamp 2026</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Registration closes soon. Reserve your spot today.</p>
            </div>

            {/* Countdown Box */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ background: 'rgba(10,10,10,0.8)', padding: '0.75rem 1rem', borderRadius: '12px', textAlign: 'center', minWidth: '65px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>{countdown.days}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>DAYS</div>
              </div>
              <div style={{ background: 'rgba(10,10,10,0.8)', padding: '0.75rem 1rem', borderRadius: '12px', textAlign: 'center', minWidth: '65px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{countdown.hours}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>HOURS</div>
              </div>
              <div style={{ background: 'rgba(10,10,10,0.8)', padding: '0.75rem 1rem', borderRadius: '12px', textAlign: 'center', minWidth: '65px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{countdown.mins}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>MINS</div>
              </div>
              <div style={{ background: 'rgba(10,10,10,0.8)', padding: '0.75rem 1rem', borderRadius: '12px', textAlign: 'center', minWidth: '65px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>{countdown.secs}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>SECS</div>
              </div>
            </div>
          </div>

          {/* Events Timeline Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {upcomingEvents.map((evt, idx) => (
              <div key={idx} className="event-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(163,230,53,0.1)', border: '1px solid rgba(163,230,53,0.2)', padding: '0.85rem 1.25rem', borderRadius: '16px', textAlign: 'center', minWidth: '130px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)' }}>{evt.tag}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>{evt.date.split(',')[0]}</div>
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', margin: '0 0 0.25rem 0' }}>{evt.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0 0 0.25rem 0' }}>📍 {evt.location}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>{evt.desc}</p>
                  </div>
                </div>
                <Link to="/admission" className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
                  Register Event →
                </Link>
              </div>
            ))}
          </div>
        </section>


        {/* 7. GALLERY WITH LIGHTBOX MODAL */}
        <section className="section reveal" style={{ padding: '4rem clamp(1.5rem, 4vw, 4rem)', maxWidth: '1320px' }}>
          <div className="section-header">
            <span className="section-tag">✦ STUDIO & STAGE GALLERY</span>
            <h1 className="section-title">Moments Captured In Motion</h1>
            <p className="section-desc">Experience the energy, passion, and artistic brilliance of our dancers in action.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginTop: '2.5rem' }}>
            {galleryItems.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedGalleryImg(item)}
                style={{
                  position: 'relative',
                  height: '280px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid var(--border-glass)'
                }}
              >
                <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.25rem',
                  opacity: 0.9
                }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700 }}>{item.category}</span>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', margin: '0.2rem 0 0 0' }}>{item.title} 🔍</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedGalleryImg && (
            <div 
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(12px)',
                zIndex: 3000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}
              onClick={() => setSelectedGalleryImg(null)}
            >
              <div style={{ maxWidth: '800px', width: '100%', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                <img src={selectedGalleryImg.src} alt={selectedGalleryImg.title} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '16px' }} />
                <div style={{ textAlign: 'center', marginTop: '1rem', color: '#fff' }}>
                  <h3 style={{ margin: 0 }}>{selectedGalleryImg.title}</h3>
                  <p style={{ color: 'var(--accent)', margin: '0.25rem 0 0 0' }}>{selectedGalleryImg.category}</p>
                </div>
                <button 
                  onClick={() => setSelectedGalleryImg(null)}
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '0',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '2rem',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </section>


        {/* 8. TESTIMONIALS CAROUSEL */}
        <section className="section reveal" style={{ padding: '4rem clamp(1.5rem, 4vw, 4rem)', maxWidth: '1100px' }}>
          <div className="section-header">
            <span className="section-tag">✦ STUDENT REVIEWS & STORIES</span>
            <h2 className="section-title">What Our Dancers Say</h2>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            borderRadius: '28px',
            padding: '3rem 2.5rem',
            position: 'relative',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1rem' }}>“</div>
            <p style={{ fontSize: '1.25rem', color: '#fff', lineHeight: '1.7', maxWidth: '750px', margin: '0 auto 1.75rem' }}>
              {testimonials[activeTestimonial].text}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <img src={testimonials[activeTestimonial].avatar} alt={testimonials[activeTestimonial].name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }} />
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ color: '#fff', margin: 0, fontSize: '1.1rem' }}>{testimonials[activeTestimonial].name}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>{testimonials[activeTestimonial].role}</div>
              </div>
            </div>

            {/* Carousel Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
              {testimonials.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: activeTestimonial === i ? '28px' : '10px',
                    height: '10px',
                    borderRadius: '100px',
                    background: activeTestimonial === i ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </section>


        {/* 9. PROMOTIONAL VIDEO SHOWCASE */}
        <section id="video-showcase" className="section reveal" style={{ padding: '4rem clamp(1.5rem, 4vw, 4rem)', maxWidth: '1280px' }}>
          <div className="section-header">
            <span className="section-tag">✦ STUDIO CINEMATIC PROMO</span>
            <h2 className="section-title">Feel The Energy Of Danzi</h2>
          </div>

          <div style={{
            position: 'relative',
            width: '100%',
            height: '480px',
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            border: '1px solid var(--border-glass)'
          }}>
            {!isVideoPlaying ? (
              <>
                <img 
                  src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1200" 
                  alt="Danzi Dance Video Cover" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.45)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem'
                }}>
                  <button 
                    onClick={() => setIsVideoPlaying(true)}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      border: 'none',
                      color: '#0a0a0a',
                      fontSize: '2rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 30px rgba(163, 230, 53, 0.6)',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    ▶
                  </button>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '1px' }}>WATCH STUDIO HIGHLIGHT TRAILER</span>
                </div>
              </>
            ) : (
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Danzi Dance Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            )}
          </div>
        </section>


        {/* 10. CALL TO ACTION BANNER */}
        <section className="section reveal" style={{ padding: '4rem clamp(1.5rem, 4vw, 4rem)', maxWidth: '1280px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(163, 230, 53, 0.15) 0%, rgba(34, 211, 238, 0.1) 100%)',
            border: '1px solid rgba(163, 230, 53, 0.4)',
            borderRadius: '32px',
            padding: '4rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>
              Ready to Begin Your <span className="highlight">Dance Journey?</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
              Join Danzi Dance Club today. Book your trial session, choose your preferred batch, and learn from international master choreographers.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <Link to="/admission" className="btn btn-primary btn-large" style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
                Enroll Now & Claim Free Trial →
              </Link>
              <Link to="/instructors" className="btn btn-outline btn-large" style={{ fontSize: '1.05rem', padding: '1rem 2.25rem' }}>
                Browse Faculty
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Home;
