import React, { useState, useContext } from 'react';
import './GetInspired.css';
import { GlobalStateContext } from '../context/GlobalState';
import CreateCaption from './CreateCaption';

const GetInspired = ({ setView }) => {
  const [topic, setTopic] = useState('');
  const [selectedIdea, setSelectedIdea] = useState(null);
  const { state, generatePostIdeas, resetGeneratedIdeas } = useContext(GlobalStateContext);

  const handleGenerateIdeas = async () => {
    await generatePostIdeas(topic);
  };

  const handleBack = () => {
    resetGeneratedIdeas();
    setTopic('');
    setView('main');
  };

  const handleIdeaClick = (idea) => {
    setSelectedIdea(idea);
  };

  return (
    <div className="get-inspired">
      {selectedIdea ? (
        <CreateCaption idea={selectedIdea} setSelectedIdea={setSelectedIdea} />
      ) : (
        <>
          {state.generatedIdeas.length === 0 ? (
            <>
              <h2>Get Inspired</h2>
              <p>Stick staring at a blank page? Tell us what topic you have in mind and Skipli AI will generate a list of post ideas and captions for you.</p>
              <div className="form-group">
                <label>What topic do you want ideas for?</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic"
                />
              </div>
              <div className="buttons">
                <button className="generate-button" onClick={handleGenerateIdeas}>
                  Generate ideas
                </button>
                <button className="back-button" onClick={handleBack}>
                  Back
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>Get Inspired</h2>
              <p>Choose an idea to build some posts</p>
              <div className="ideas-list">
                {state.generatedIdeas.map((idea, index) => (
                  <div key={index} className="idea-item" onClick={() => handleIdeaClick(idea)}>
                    <p>{idea}</p>
                  </div>
                ))}
              </div>
              <button className="back-button" onClick={handleBack}>
                Back
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GetInspired;