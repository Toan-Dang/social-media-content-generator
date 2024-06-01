import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const initialState = {
  phoneNumber: '',
  isAuthenticated: false,
  userCaptions: [],
  generatedCaptions: [],
  generatedIdeas: [],
  savedContents: [],
  selectedIdea: '',
};

const GlobalStateContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_USER_CAPTIONS':
      return { ...state, userCaptions: action.payload };
    case 'SET_GENERATED_CAPTIONS':
      return { ...state, generatedCaptions: action.payload };
    case 'SET_GENERATED_IDEAS':
      return { ...state, generatedIdeas: action.payload };
    case 'RESET_GENERATED_IDEAS':
      return { ...state, generatedIdeas: [] };
    case 'REMOVE_GENERATED_CAPTION':
      return {
        ...state,
        generatedCaptions: state.generatedCaptions.filter((caption) => caption !== action.payload),
      };
    case 'SET_SAVED_CONTENTS':
      return { ...state, savedContents: action.payload };
    case 'REMOVE_SAVED_CONTENT':
      return {
        ...state,
        savedContents: state.savedContents.map((content) => ({
          ...content,
          captions: content.captions.filter((caption) => caption.id !== action.payload),
        })),
      };
    case 'SET_SELECTED_IDEA':
      return { ...state, selectedIdea: action.payload };
    default:
      return state;
  }
};

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPhoneNumber = (phoneNumber) => {
    dispatch({ type: 'SET_PHONE_NUMBER', payload: phoneNumber });
  };

  const setAuthenticated = (isAuthenticated) => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: isAuthenticated });
  };

  const setUserCaptions = (captions) => {
    dispatch({ type: 'SET_USER_CAPTIONS', payload: captions });
  };

  const setGeneratedCaptions = (captions) => {
    dispatch({ type: 'SET_GENERATED_CAPTIONS', payload: captions });
  };

  const setGeneratedIdeas = (ideas) => {
    dispatch({ type: 'SET_GENERATED_IDEAS', payload: ideas });
  };

  const resetGeneratedIdeas = () => {
    dispatch({ type: 'RESET_GENERATED_IDEAS' });
  };

  const removeGeneratedCaption = (caption) => {
    dispatch({ type: 'REMOVE_GENERATED_CAPTION', payload: caption });
  };

  const sendAccessCode = async (phoneNumber) => {
    try {
      // const response = await axios.post('/api/send-access-code', { phoneNumber });
      // if (response.status === 200) {
      //   setPhoneNumber(phoneNumber);
      //   return true;
      // }
      setPhoneNumber(phoneNumber);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const verifyAccessCode = async (phoneNumber, accessCode) => {
    try {
      // const response = await axios.post('/api/verify-access-code', { phoneNumber, accessCode });
      // if (response.status === 200) {
      //   setAuthenticated(true);
      //   localStorage.setItem('phoneNumber', phoneNumber);
      //   return true;
      // }
      setAuthenticated(true);
      localStorage.setItem('phoneNumber', phoneNumber);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const generatePostCaptions = async (socialNetwork, subject, tone) => {
    try {
      const response = await axios.post('/api/GeneratePostCaptions', {
        socialNetwork,
        subject,
        tone,
      });
      if (response.status === 200) {
        setGeneratedCaptions(response.data.captions);
        return true;
      }
    } catch (error) {
      console.error('Error generating captions:', error);
      return false;
    }
  };

  const generatePostIdeas = async (topic) => {
    try {
      const response = await axios.post('/api/GeneratePostIdeas', {
        topic,
      });
      if (response.status === 200) {
        setGeneratedIdeas(response.data.ideas);
        return true;
      }
    } catch (error) {
      console.error('Error generating ideas:', error);
      return false;
    }
  };

  const saveGeneratedContent = async (topic, data) => {
    try {
      const response = await axios.post('/api/SaveGeneratedContent', {
        topic,
        data,
        phone_number: state.phoneNumber,
      });
      return response.data.success;
    } catch (error) {
      console.error('Error saving content:', error);
      return false;
    }
  };

  const getUserGeneratedContents = async (phoneNumber) => {
    try {
      const response = await axios.get('/api/GetUserGeneratedContents', {
        params: { phone_number: phoneNumber },
      });
      dispatch({ type: 'SET_SAVED_CONTENTS', payload: response.data });
    } catch (error) {
      console.error('Error fetching user generated contents:', error);
    }
  };

  const unsaveContent = async (captionId) => {
    try {
      const response = await axios.post('/api/UnSaveContent', { phone_number: state.phoneNumber, captionId });
      if (response.data.success) {
        dispatch({ type: 'REMOVE_SAVED_CONTENT', payload: captionId });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error unsaving content:', error);
      return false;
    }
  };

  const createCaptionsFromIdeas = async (idea) => {
    try {
      const response = await axios.post('/api/CreateCaptionsFromIdeas', { idea });
      if (response.status === 200) {
        return response.data.captions;
      }
    } catch (error) {
      console.error('Error creating captions from idea:', error);
      throw error;
    }
  };

  return (
    <GlobalStateContext.Provider
      value={{
        state,
        setPhoneNumber,
        setAuthenticated,
        setUserCaptions,
        setGeneratedCaptions,
        setGeneratedIdeas,
        resetGeneratedIdeas,
        removeGeneratedCaption,
        sendAccessCode,
        verifyAccessCode,
        generatePostCaptions,
        generatePostIdeas,
        saveGeneratedContent,
        getUserGeneratedContents,
        unsaveContent,
        createCaptionsFromIdeas,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
