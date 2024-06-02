import React, { createContext, useReducer, useCallback } from 'react';
import axiosInstance from '../Utils/axiosConfig';

const initialState = {
  phoneNumber: '',
  isAuthenticated: false,
  userCaptions: [],
  generatedCaptions: [],
  generatedIdeas: [],
  generatedIdeasCaptions: [],
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
    case 'SET_GENERATED_IDEAS_CAPTIONS':
      return { ...state, generatedIdeasCaptions: action.payload };
    case 'RESET_GENERATED_CAPTIONS':
      return { ...state, generatedCaptions: [] };
    case 'RESET_GENERATED_IDEAS':
      return { ...state, generatedIdeas: [] };
    case 'RESET_GENERATED_IDEAS_CAPTIONS':
      return { ...state, generatedIdeasCaptions: [] };
    case 'REMOVE_GENERATED_CAPTION':
      return {
        ...state,
        generatedCaptions: state.generatedCaptions.filter((caption) => caption !== action.payload),
      };
    case 'REMOVE_GENERATED_IDEAS_CAPTION':
      return {
        ...state,
        generatedIdeasCaptions: state.generatedIdeasCaptions.filter((caption) => caption !== action.payload),
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

  const setGeneratedIdeasCaption = (captions) => {
    dispatch({ type: 'SET_GENERATED_IDEAS_CAPTIONS', payload: captions });
  };

  const resetGeneratedCaptions = () => {
    dispatch({ type: 'RESET_GENERATED_CAPTIONS' });
  };

  const resetGeneratedIdeas = () => {
    dispatch({ type: 'RESET_GENERATED_IDEAS' });
  };

  const resetGeneratedIdeasCaptions = () => {
    dispatch({ type: 'RESET_GENERATED_IDEAS_CAPTION' });
  };

  const removeGeneratedCaption = (caption) => {
    dispatch({ type: 'REMOVE_GENERATED_CAPTION', payload: caption });
  };

  const sendAccessCode = async (phoneNumber) => {
    try {
      const response = await axiosInstance.post('/send-access-code', { phone_number: phoneNumber });
      if (response.status === 200) {
        setPhoneNumber(phoneNumber);
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const verifyAccessCode = async (phoneNumber, accessCode) => {
    try {
      const response = await axiosInstance.post('/verify-access-code', { phone_number: phoneNumber, access_code: accessCode });
      if (response.status === 200) {
        setAuthenticated(true);
        localStorage.setItem('phoneNumber', phoneNumber);
        return true;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const generatePostCaptions = async (socialNetwork, subject, tone) => {
    try {
      const response = await axiosInstance.post('/GeneratePostCaptions', {
        socialNetwork,
        subject,
        tone,
      });
      if (response.status === 200) {
        setGeneratedCaptions(response.data.data.captions);
        return true;
      }
    } catch (error) {
      console.error('Error generating captions:', error);
      return false;
    }
  };

  const generatePostIdeas = async (topic) => {
    try {
      const response = await axiosInstance.post('/GeneratePostIdeas', {
        topic,
      });
      if (response.status === 200) {
        setGeneratedIdeas(response.data.data.ideas);
        return true;
      }
    } catch (error) {
      console.error('Error generating ideas:', error);
      return false;
    }
  };

  const createCaptionsFromIdeas = async (idea) => {
    try {
      const response = await axiosInstance.post('/CreateCaptionsFromIdeas', { idea });
      if (response.status === 200) {
        setGeneratedIdeasCaption(response.data.data.captions)
        return true;
      }
    } catch (error) {
      console.error('Error creating captions from idea:', error);
      throw error;
    }
  };

  const saveGeneratedContent = async (topic, data) => {
    try {
      const phone_number = localStorage.getItem('phoneNumber');
      const response = await axiosInstance.post('/SaveGeneratedContent', {
        topic,
        data,
        phone_number,
      });
      if (response.data.success) {
        dispatch({ type: 'REMOVE_GENERATED_CAPTION', payload: data });
        dispatch({ type: 'REMOVE_GENERATED_IDEAS_CAPTION', payload: data });
        return true;
      }
    } catch (error) {
      console.error('Error saving content:', error);
      return false;
    }
  };

  const getUserGeneratedContents = useCallback(async () => {
    try {
      const phone_number = localStorage.getItem('phoneNumber');
      const response = await axiosInstance.get(`/GetUserGeneratedContents/${phone_number}`);
      console.log(response.data.data);
      dispatch({ type: 'SET_SAVED_CONTENTS', payload: response.data.data });
    } catch (error) {
      console.error('Error fetching user generated contents:', error);
    }
  }, []);

  const unsaveContent = async (captionId) => {
    try {
      const phone_number = localStorage.getItem('phoneNumber');
      const response = await axiosInstance.post('/UnSaveContent', { phone_number, captionId });
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

  return (
    <GlobalStateContext.Provider
      value={{
        state,
        setPhoneNumber,
        setAuthenticated,
        setUserCaptions,
        setGeneratedCaptions,
        setGeneratedIdeas,
        setGeneratedIdeasCaption,
        resetGeneratedCaptions,
        resetGeneratedIdeas,
        resetGeneratedIdeasCaptions,
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
