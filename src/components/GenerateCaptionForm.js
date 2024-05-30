import React, { useState, useContext } from 'react';
import './GenerateCaptionForm.css';
import { GlobalStateContext } from '../context/GlobalState';

const GenerateCaptionForm = ({ postType, setSelectedPostType }) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Friendly');
  const { state, generatePostCaptions, saveGeneratedContent, removeGeneratedCaption } = useContext(GlobalStateContext);

  const handleGenerateCaption = async () => {
    await generatePostCaptions(postType, topic, tone);
  };

  const handleSave = async (caption) => {
    const success = await saveGeneratedContent(topic, caption);
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

  return (
    <div className="generate-caption-form">
      <h2>{postType}</h2>
      <div className="form-group">
        <label>What topic do you want a caption for?</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your topic"
        />
      </div>
      <div className="form-group">
        <label>What should your caption sound like?</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="Friendly">Friendly</option>
          <option value="Professional">Professional</option>
          <option value="Humorous">Humorous</option>
          <option value="Inspirational">Inspirational</option>
        </select>
      </div>
      <button className="generate-button" onClick={handleGenerateCaption}>
        Generate caption
      </button>
      <button className="back-button" onClick={() => setSelectedPostType(null)}>
        Back
      </button>

      {state.generatedCaptions.length > 0 && (
        <div className="captions">
          <h3>Captions generated for you</h3>
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

export default GenerateCaptionForm;