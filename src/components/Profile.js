import React, { useEffect, useContext, useCallback } from 'react';
import { GlobalStateContext } from '../context/GlobalState';
import './Profile.css';

const Profile = () => {
  const { state, getUserGeneratedContents, unsaveContent } = useContext(GlobalStateContext);

  // Wrap the getUserGeneratedContents function in useCallback
  const fetchUserGeneratedContents = useCallback(() => {
    getUserGeneratedContents();
  }, [getUserGeneratedContents]);

  useEffect(() => {
    fetchUserGeneratedContents();
  }, [fetchUserGeneratedContents]);

  const handleUnsave = async (captionId) => {
    const success = await unsaveContent(captionId);
    if (success) {
      alert('Content unsaved successfully!');
    } else {
      alert('Failed to unsave content.');
    }
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
                <button className="unsave-button" onClick={() => handleUnsave(caption.id)}>Unsave</button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Profile;
