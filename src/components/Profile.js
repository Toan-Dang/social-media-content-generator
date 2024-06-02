import React, { useEffect, useContext, useState } from 'react';
import { GlobalStateContext } from '../context/GlobalState';
import './Profile.css';

const Profile = () => {
  const { state, getUserGeneratedContents, unsaveContent } = useContext(GlobalStateContext);
  const [savingStatus, setSavingStatus] = useState({});
  useEffect(() => {
    getUserGeneratedContents();
  }, [getUserGeneratedContents]);

  const handleUnsave = async (captionId) => {
    setSavingStatus((prevState) => ({ ...prevState, [captionId]: true }));
    const success = await unsaveContent(captionId);
    if (success) {
      alert('Content unsaved successfully!');
    } else {
      alert('Failed to unsave content.');
    }
    setSavingStatus((prevState) => ({ ...prevState, [captionId]: false }));
  };

  return (
    <div className="profile">
      <h2>Saved Content</h2>
      {state.savedContents.map((content, index) => (
        <div key={index} className="saved-content">
          <h3>{content.topic}</h3>
          {content.captions.map((caption, idx) => (
            <div key={idx} className="caption">
              <p>{caption.text}</p>
              <div className="buttons">
                <button className="share-button">Share</button>
                {/* <button className="unsave-button" onClick={() => handleUnsave(caption.id)}>Unsave</button> */}
                <button
                  className="unsave-button"
                  onClick={() => handleUnsave(caption.id)}
                  disabled={savingStatus[caption.id]}
                >
                  {savingStatus[caption.id] ? 'UnSaving...' : 'Unsave'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Profile;
