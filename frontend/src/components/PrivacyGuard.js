import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const PrivacyGuard = ({ children, privacyOverride = false }) => {
  const [isLookingAway, setIsLookingAway] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize Face Detection with face-api.js
    const initFaceDetection = async () => {
      // Load models (assuming models are in public/models)
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

      // Start webcam
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    };

    initFaceDetection();

    // Start a 'Heartbeat' loop that checks the webcam
    const checkGaze = async () => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());
        
        // Logic: If no face is detected
        setIsLookingAway(detections.length === 0);
      }
    };

    const interval = setInterval(checkGaze, 500); // Check every 0.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ filter: isLookingAway && !privacyOverride ? 'blur(20px)' : 'none', transition: 'filter 0.3s' }}>
      {/* Hidden webcam feed for processing */}
      <video ref={videoRef} style={{ display: 'none' }} autoPlay muted />
      {children}
    </div>
  );
};