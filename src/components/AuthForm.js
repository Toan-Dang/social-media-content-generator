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
    if (!/^\d{1,15}$/.test(state.phoneNumber)) {
      alert('Please enter a valid phone number');
      return;
    }
    const success = await sendAccessCode(state.phoneNumber);
    if (success) {
      setStep(2);
    } else {
      alert('Failed to send access code');
    }
  };

  const handleAccessCodeSubmit = async () => {
    if (!/^\d{6}$/.test(accessCode)) {
      alert('Please enter a valid access code');
      return;
    }
    const success = await verifyAccessCode(state.phoneNumber, accessCode);
    if (success) {
      alert('Access code validated successfully');
      navigate('/dashboard');
    } else {
      alert('Invalid access code');
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,15}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleAccessCodeChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setAccessCode(value);
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
            onChange={handlePhoneNumberChange}
            placeholder="Phone Number"
            required
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
            onChange={handleAccessCodeChange}
            placeholder="Enter your code here"
            required
          />
          <button onClick={handleAccessCodeSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
