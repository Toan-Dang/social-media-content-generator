import React, { useState, useContext } from 'react';
import { GlobalStateContext } from '../context/GlobalState';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = () => {
  const [accessCode, setAccessCode] = useState('');
  const [step, setStep] = useState(1);
  const { state, sendAccessCode, verifyAccessCode, setPhoneNumber } = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const handlePhoneNumberSubmit = async () => {
    const success = await sendAccessCode(state.phoneNumber);
    if (success) {
      setStep(2);
    } else {
      alert('Failed to send access code');
    }
  };

  const handleAccessCodeSubmit = async () => {
    const success = await verifyAccessCode(state.phoneNumber, accessCode);
    if (success) {
      alert('Access code validated successfully');
      navigate('/dashboard');
    } else {
      alert('Invalid access code');
    }
  };

  return (
    <div className="auth-form-container">
      {step === 1 ? (
        <div className="auth-form">
          <h2>Welcome to Skipli AI</h2>
          <p>Enter a mobile phone number that you have access to.</p>
          <input
            type="text"
            value={state.phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
          <button onClick={handlePhoneNumberSubmit}>Send Verification Code</button>
        </div>
      ) : (
        <div className="auth-form">
          <h2>Welcome to Skipli AI</h2>
          <p>SkipliAI has sent an OTP code to: {state.phoneNumber}</p>
          <input
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter your code here"
          />
          <button onClick={handleAccessCodeSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default AuthForm;