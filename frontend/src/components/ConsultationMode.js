import React, { useState, useEffect, useRef } from 'react';
import { fetchWithAuth } from '../api';
import './ConsultationMode.css';

const ConsultationMode = ({ onTogglePrivacyOverride }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({
    vitals: false,
    medications: false,
    carePlan: false,
  });
  const [isConsultationActive, setIsConsultationActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const timerRef = useRef(null);

  // --- 1. The Fingerprint Trigger (WebAuthn Mock) ---
  const handleBiometricAuth = async () => {
    try {
      // In a real app, this calls navigator.credentials.get(...)
      // For now, we simulate the Windows Hello popup delay
      console.log("Triggering Windows Hello / WebAuthn...");
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      startConsultation();
    } catch (error) {
      console.error("Biometric auth failed", error);
    }
  };

  // --- 2. The 5-Minute Timer Logic ---
  const startConsultation = () => {
    setIsOpen(false);
    setIsConsultationActive(true);
    setTimeLeft(300); // Reset to 5 minutes
    onTogglePrivacyOverride(true); // Tells PrivacyGuard to STOP blurring

    // Log the consultation start event
    fetchWithAuth('/api/audit', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
      action: 'CONSULTATION_STARTED',
      entityName: 'Consultation',
      entityId: null,
      details: 'Patient consultation initiated with selected data: ' + JSON.stringify(selectedData)
    })}).catch(err => console.error('Failed to log consultation start', err));

    // Clear any existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Set auto-lock for 5 minutes (300,000 ms)
    timerRef.current = setTimeout(() => {
      endConsultation();
    }, 300000); 
  };

  const endConsultation = () => {
    setIsConsultationActive(false);
    onTogglePrivacyOverride(false); // Turns the blur back ON
    setSelectedData({ vitals: false, medications: false, carePlan: false });

    // Log the consultation end event
    fetchWithAuth('/api/audit', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
      action: 'CONSULTATION_ENDED',
      entityName: 'Consultation',
      entityId: null,
      details: 'Patient consultation ended'
    })}).catch(err => console.error('Failed to log consultation end', err));
  };

  // Cleanup timer if component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Countdown timer effect
  useEffect(() => {
    let countdown;
    if (isConsultationActive && timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endConsultation();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [isConsultationActive, timeLeft]);

  return (
    <div className="consultation-wrapper">
      {/* The trigger button on the nurse's dashboard */}
      {!isConsultationActive && (
        <button onClick={() => setIsOpen(true)}>
          🤝 Start Patient Consultation
        </button>
      )}

      {/* Active Mode Indicator / Manual Lock */}
      {isConsultationActive && (
        <div className={`active-consultation-banner ${timeLeft <= 30 ? 'warning' : ''}`} style={{ backgroundColor: '#FFD700', color: 'black', padding: '10px', border: '2px solid #FFA500', fontWeight: 'bold', textAlign: 'center' }}>
          <span>Consultation Mode Active (Auto-locks in {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')})</span>
          <button onClick={endConsultation}>🔒 Lock Now</button>
        </div>
      )}

      {/* The Selection Modal */}
      {isOpen && (
        <div className="modal">
          <h3>Select Data to Share</h3>
          <label>
            <input type="checkbox" onChange={(e) => setSelectedData({...selectedData, vitals: e.target.checked})} />
            Vitals History
          </label>
          <label>
            <input type="checkbox" onChange={(e) => setSelectedData({...selectedData, medications: e.target.checked})} />
            Medication List
          </label>
          
          <button onClick={handleBiometricAuth}>
            Verify Fingerprint to Show Data
          </button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ConsultationMode;