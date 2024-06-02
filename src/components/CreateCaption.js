import React, { useContext, useState } from 'react';
import './CreateCaption.css';
import { GlobalStateContext } from '../context/GlobalState';

const CreateCaption = ({ idea, setSelectedIdea }) => {
  const { state, createCaptionsFromIdeas, saveGeneratedContent, removeGeneratedCaption, resetGeneratedIdeasCaptions } = useContext(GlobalStateContext);
  const [loading, setLoading] = useState(false);
  const [savingStatus, setSavingStatus] = useState({});

  const handleCreateCaption = async () => {
    setLoading(true);
    try {
      await createCaptionsFromIdeas(idea);
      setLoading(false);
    } catch (error) {
      console.error('Error creating captions from idea:', error);
      setLoading(false);
    }
  };

  const handleSave = async (caption) => {
    setSavingStatus((prevState) => ({ ...prevState, [caption]: true }));
    const success = await saveGeneratedContent(idea, caption);
    if (success) {
      removeGeneratedCaption(caption);
      alert('Caption saved successfully!');
    } else {
      alert('Failed to save caption.');
    }
    setSavingStatus((prevState) => ({ ...prevState, [caption]: false }));
  };

  const handleShare = (caption) => {
    // Logic to share the caption to Facebook or via email
    alert('Sharing feature not implemented yet.');
  };

  const handleBack = () => {
    resetGeneratedIdeasCaptions();
    setSelectedIdea(null);
  };

  return (
    <div className="create-caption">
      <h2>Your Idea</h2>
      <input
        type="text"
        value={idea}
        readOnly
      />
      <div className="buttons">
        <button className="generate-button" onClick={handleCreateCaption} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Captions'}
        </button>
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
      </div>

      {state.generatedIdeasCaptions.length > 0 && (
        <div className="captions">
          <h3>Captions created for you</h3>
          {state.generatedIdeasCaptions.map((caption, index) => (
            <div key={index} className="caption">
              <p>{caption}</p>
              <div className="buttons">
                <button className="share-button" onClick={() => handleShare(caption)}>Share</button>
                <button
                  className="save-button"
                  onClick={() => handleSave(caption)}
                  disabled={savingStatus[caption]}
                >
                  {savingStatus[caption] ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateCaption;
