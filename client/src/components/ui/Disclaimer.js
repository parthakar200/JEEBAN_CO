import React, { useState } from 'react';

const Disclaimer = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);

  const handleProceed = () => {
    if (accepted) {
      localStorage.setItem('disclaimerAccepted', 'true');
      onAccept();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <h2 style={styles.title}>Disclaimer</h2>
        <p style={styles.text}>
          The Bar Council of India does not permit advertisement or solicitation
          by advocates in any form or manner. By accessing this website,
          www.jeebanco.in, you acknowledge and confirm that you are seeking
          information relating to Jeeban & Co of your own accord and that there
          has been no form of solicitation, advertisement or inducement by
          Jeeban & Co or its members.
        </p>
        <p style={styles.text}>
          The content of this website is for informational purposes only and
          should not be interpreted as soliciting or advertisement. No
          material/information provided on this website should be construed as
          legal advice. Jeeban & Co shall not be liable for consequences of any
          action taken by relying on the material/information provided on this
          website. The contents of this website are the intellectual property
          of Jeeban & Co.
        </p>
        <label style={styles.checkLabel}>
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          I accept the above.
        </label>
        <br />
        <button
          onClick={handleProceed}
          disabled={!accepted}
          style={accepted ? styles.btnActive : styles.btnDisabled}
        >
          PROCEED TO WEBSITE
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    background: 'rgba(0,0,0,0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 9999,
  },
  box: {
    background: '#fff', padding: '40px', maxWidth: '700px',
    width: '90%', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  title: { color: '#1a56db', marginBottom: '20px' },
  text: { color: '#333', lineHeight: '1.7', marginBottom: '16px' },
  checkLabel: {
    display: 'flex', alignItems: 'center',
    cursor: 'pointer', marginBottom: '20px'
  },
  btnActive: {
    background: 'transparent', border: '2px solid #1a56db', color: '#1a56db',
    padding: '10px 24px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px',
  },
  btnDisabled: {
    background: 'transparent', border: '2px solid #aaa', color: '#aaa',
    padding: '10px 24px', cursor: 'not-allowed', fontWeight: 'bold', letterSpacing: '1px',
  },
};

export default Disclaimer;