import React, { useState } from 'react';
import Services from './Services';
import Profile from './Profile';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">Skipli AI</div>
        <button
          className={`tab-button ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          <i className="fa fa-th-large"></i> Services
        </button>
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <i className="fa fa-user"></i> Profile
        </button>
      </div>
      <div className="content">
        {activeTab === 'services' && <Services />}
        {activeTab === 'profile' && <Profile />}
      </div>
    </div>
  );
};

export default Dashboard;