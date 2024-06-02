import React, { useState, useContext } from 'react';
import './GenerateCaptionForm.css';
import { GlobalStateContext } from '../context/GlobalState';

const GenerateCaptionForm = ({ postType, setSelectedPostType }) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Friendly');
  const { state, generatePostCaptions, saveGeneratedContent, removeGeneratedCaption, resetGeneratedCaptions } = useContext(GlobalStateContext);
  const [loading, setLoading] = useState(false);
  const [savingStatus, setSavingStatus] = useState({});

  const handleGenerateCaption = async () => {
    setLoading(true);
    await generatePostCaptions(postType, topic, tone);
    setLoading(false);
  };

  const handleBackOption = () => {
    resetGeneratedCaptions();
    setSelectedPostType(null);
  }

  const handleSave = async (caption) => {
    setSavingStatus((prevState) => ({ ...prevState, [caption]: true }));
    const success = await saveGeneratedContent(topic, caption);
    if (success) {
      removeGeneratedCaption(caption);
      alert('Caption saved successfully!');
    } else {
      alert('Failed to save caption.');
    }
    setSavingStatus((prevState) => ({ ...prevState, [caption]: false }));
  };

  const handleShare = (caption) => {
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
      <div className="buttons">
        <button className="generate-button" onClick={handleGenerateCaption} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Captions'}
        </button>
        <button className="back-button" onClick={handleBackOption}>
          Back
        </button>
      </div>

      {state.generatedCaptions.length > 0 && (
        <div className="captions">
          <h3>Captions generated for you</h3>
          {state.generatedCaptions.map((caption, index) => (
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

export default GenerateCaptionForm;