import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalStateContext } from '../context/GlobalState';
import './Profile.css';

const Profile = () => {
  const { state, setUserCaptions } = useContext(GlobalStateContext);

  useEffect(() => {
    const fetchCaptions = async () => {
      try {
        const response = await axios.get('/api/get-captions', {
          params: { phoneNumber: state.phoneNumber },
        });
        setUserCaptions(response.data.captions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCaptions();
  }, [setUserCaptions, state.phoneNumber]);

  const handleUnsave = async (captionId) => {
    try {
      await axios.delete(`/api/unsave-caption/${captionId}`);
      setUserCaptions(state.userCaptions.filter((caption) => caption.id !== captionId));
    } catch (error) {
      console.error(error);
    }
  };

  const shareCaption = (caption) => {
    // Share caption to Facebook or email
  };

  return (
    <div className="profile">
      <h2>Your Captions</h2>
      <div className="captions">
        {state.userCaptions.map((caption) => (
          <div key={caption.id} className="caption">
            <p>{caption.text}</p>
            <button onClick={() => handleUnsave(caption.id)}>Unsave</button>
            <button onClick={() => shareCaption(caption)}>Share</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;