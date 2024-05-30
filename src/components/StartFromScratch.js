import React, { useState } from 'react';
import GenerateCaptionForm from './GenerateCaptionForm';
import './StartFromScratch.css';

const StartFromScratch = ({ setView }) => {
  const [selectedPostType, setSelectedPostType] = useState(null);

  return (
    <div className="start-from-scratch">
      {selectedPostType ? (
        <GenerateCaptionForm postType={selectedPostType} setSelectedPostType={setSelectedPostType} />
      ) : (
        <>
          <h2>Generate unique captions from scratch</h2>
          <p>Choose the type of post you want a caption for, and let Skipli AI write it for you.</p>
          <p>What kind of post do you want a caption for?</p>
          <div className="post-types">
            <button className="post-type-button" onClick={() => setSelectedPostType('Facebook post')}>
              <i className="fab fa-facebook-f"></i> Facebook post
              <p>Generate caption for a post</p>
            </button>
            <button className="post-type-button" onClick={() => setSelectedPostType('Instagram post')}>
              <i className="fab fa-instagram"></i> Instagram post
              <p>Generate caption for a post</p>
            </button>
            <button className="post-type-button" onClick={() => setSelectedPostType('Twitter post')}>
              <i className="fab fa-twitter"></i> Twitter post
              <p>Generate caption for a post</p>
            </button>
          </div>
          <button className="back-button" onClick={() => setView('main')}>
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default StartFromScratch;