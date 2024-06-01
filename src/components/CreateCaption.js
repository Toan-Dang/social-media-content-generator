import React, { useState, useContext } from 'react';
import './CreateCaption.css';
import { GlobalStateContext } from '../context/GlobalState';

const CreateCaption = ({ idea, setSelectedIdea }) => {
  const [captions, setCaptions] = useState([]);
    const { state, createCaptionsFromIdeas , saveGeneratedContent, removeGeneratedCaption } = useContext(GlobalStateContext);

  const handleCreateCaption = async () => {
    try {
      const generatedCaptions = await createCaptionsFromIdeas(state.selectedIdea);
      setCaptions(generatedCaptions);
    } catch (error) {
      console.error('Error creating captions from idea:', error);
    }
  };

  const handleSave = async (caption) => {
    const success = await saveGeneratedContent(idea, caption);
    if (success) {
      removeGeneratedCaption(caption);
      alert('Caption saved successfully!');
    } else {
      alert('Failed to save caption.');
    }
  };

  const handleShare = (caption) => {
    // Logic to share the caption to Facebook or via email
    alert('Sharing feature not implemented yet.');
  };

  const handleBack = () => {
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
        <button className="generate-button" onClick={handleCreateCaption}>
          Create caption
        </button>
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
      </div>

      {state.generatedCaptions.length > 0 && (
        <div className="captions">
          <h3>Captions created for you</h3>
          {state.generatedCaptions.map((caption, index) => (
            <div key={index} className="caption">
              <p>{caption}</p>
              <div className="buttons">
                <button className="share-button" onClick={() => handleShare(caption)}>Share</button>
                <button className="save-button" onClick={() => handleSave(caption)}>Save</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateCaption;