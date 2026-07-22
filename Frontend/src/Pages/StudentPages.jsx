import React from 'react';
import Footer from '../Components/Footer';

const StudentPages = () => {
  const [userName, setUserName] = React.useState('Student');

  React.useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.fullName) setUserName(user.fullName);
        else if (user.name) setUserName(user.name);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <>
      <main>
        <section className="section">
          <div className="section-header">
            <span className="section-tag">✦ Portal</span>
            <h1 className="section-title">{userName} <span className="highlight">Dashboard</span></h1>
            <p className="section-desc">
              Welcome to your Danzi Dance Club student portal. View your upcoming classes and track your progress.
            </p>
          </div>

        <div className="cards-grid">
          <div className="card">
            <div className="card-icon">📅</div>
            <h3>My Classes</h3>
            <p>No upcoming classes scheduled yet. Contact us to enroll.</p>
          </div>
          <div className="card">
            <div className="card-icon">📈</div>
            <h3>My Progress</h3>
            <p>Attendance: 100%. Keep up the great work!</p>
          </div>
          <div className="card">
            <div className="card-icon">🎯</div>
            <h3>Instructors</h3>
            <p>Sarah (Western Dance) · Anand (Bharatanatyam)</p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
  );
};

export default StudentPages;
