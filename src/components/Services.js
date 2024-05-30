import React, { useState } from 'react';
import './Services.css';
import StartFromScratch from './StartFromScratch';
import GetInspired from './GetInspired';

const Services = () => {
  const [view, setView] = useState('main');

  return (
    <div className="services">
      {view === 'main' ? (
        <>
          <h2>Generate post ideas and captions in seconds</h2>
          <div className="service-buttons">
            <button className="service-button" onClick={() => setView('scratch')}>
              Start from scratch
            </button>
            <p>Generate new captions to engage, delight, or sell</p>
            <button className="service-button" onClick={() => setView('inspired')}>
              Get inspired
            </button>
            <p>Generate post ideas and captions for a topic</p>
          </div>
        </>
      ) : view === 'scratch' ? (
        <StartFromScratch setView={setView} />
      ) : (
        <GetInspired setView={setView} />
      )}
    </div>
  );
};

export default Services;