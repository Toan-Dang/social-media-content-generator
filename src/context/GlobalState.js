import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const initialState = {
  phoneNumber: '',
  isAuthenticated: false,
  userCaptions: [],
  generatedCaptions: [],
  generatedIdeas: [],
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
      return { ...state, userCaptions: action.payload };
    case 'REMOVE_SAVED_CONTENT':
      return {
        ...state,
        userCaptions: state.userCaptions.map((content) => ({
          ...content,
          captions: content.captions.filter((caption) => caption.id !== action.payload),
        })),
      };
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
    // try {
    //   const response = await axios.post('/api/send-access-code', { phoneNumber });
    //   if (response.status === 200) {
    //     setPhoneNumber(phoneNumber);
    //     return true;
    //   }
    // } catch (error) {
    //   console.error(error);
    //   return false;
    // }
    setPhoneNumber(phoneNumber);
    return true;
  };

  const verifyAccessCode = async (phoneNumber, accessCode) => {
    // try {
    //   const response = await axios.post('/api/verify-access-code', { phoneNumber, accessCode });
    //   if (response.status === 200) {
    //     setAuthenticated(true);
    //     localStorage.setItem('phoneNumber', phoneNumber);
    //     return true;
    //   }
    // } catch (error) {
    //   console.error(error);
    //   return false;
    // }
    setAuthenticated(true);
    localStorage.setItem('phoneNumber', phoneNumber);
    return true;
  };

  const generatePostCaptions = async (socialNetwork, subject, tone) => {
    try {
      // const response = await axios.post('/api/GeneratePostCaptions', {
      //   socialNetwork,
      //   subject,
      //   tone,
      // });
      // if (response.status === 200) {
      //   setGeneratedCaptions(response.data.captions);
      //   return true;
      // }
      setGeneratedCaptions([
        "Introducing Skipli AI - the smarter, faster way to craft compelling content. Experience all the magic of AI-driven writing assistant and get great results with fewer headaches. #AI #ContentMarketing #Content",
        "Say goodbye to writer's block! #SkipliAI is now available to make creating attention-grabbing content easier than ever. Get ready to take your social media game to the next level with #AI #SocialMedia",
        "Unlock the power of AI with Skipli AI. Create captivating content that resonates with your audience and drives engagement. #ContentCreation #AI #Marketing",
        "Transform your social media strategy with Skipli AI. Generate unique and engaging captions that stand out. #AI #SocialMediaMarketing #Innovation",
        "Boost your content game with Skipli AI. Effortlessly create high-quality captions that connect with your audience. #AI #ContentStrategy #SocialMedia"
      ]);
      return true;
    } catch (error) {
      console.error('Error generating captions:', error);
      return false;
    }
  };

  const generatePostIdeas = async (topic) => {
    try {
      // const response = await axios.post('/api/GeneratePostIdeas', {
      //   topic,
      // });
      // if (response.status === 200) {
      //   setGeneratedIdeas(response.data.ideas);
      //   return true;
      // }
      setGeneratedIdeas([
        "Introducing Skipli AI - the smarter, faster way to craft compelling content. Experience all the magic of AI-driven writing assistant and get great results with fewer headaches. #AI #ContentMarketing #Content",
        "Say goodbye to writer's block! #SkipliAI is now available to make creating attention-grabbing content easier than ever. Get ready to take your social media game to the next level with #AI #SocialMedia",
        "Unlock the power of AI with Skipli AI. Create captivating content that resonates with your audience and drives engagement. #ContentCreation #AI #Marketing",
        "Transform your social media strategy with Skipli AI. Generate unique and engaging captions that stand out. #AI #SocialMediaMarketing #Innovation",
        "Boost your content game with Skipli AI. Effortlessly create high-quality captions that connect with your audience. #AI #ContentStrategy #SocialMedia"
      ]);
      return true;
    } catch (error) {
      console.error('Error generating ideas:', error);
      return false;
    }
  };
  const saveGeneratedContent = async (topic, data) => {
    try {
      // const response = await axios.post('/api/SaveGeneratedContent', {
      //   topic,
      //   data,
      // });
      // return response.data.success;
      return true;
    } catch (error) {
      console.error('Error saving content:', error);
      return false;
    }
  };

  const getUserGeneratedContents = async (phoneNumber) => {
    try {
      // const response = await axios.get('/api/GetUserGeneratedContents', {
      //   params: { phone_number: phoneNumber },
      // });
      // dispatch({ type: 'SET_SAVED_CONTENTS', payload: response.data });
      dispatch({ type: 'SET_SAVED_CONTENTS', payload: [
        {
          "topic": "Skipli is launching SkipliAI",
          "captions": [
            {
              "id": "1",
              "text": "Introducing Skipli AI - the smarter, faster way to craft compelling content. Experience all the magic of AI-driven writing assistant and get great results with fewer headaches. #AI #ContentMarketing #Content"
            },
            {
              "id": "2",
              "text": "Say goodbye to writer's block! #SkipliAI is now available to make creating attention-grabbing content easier than ever. Get ready to take your social media game to the next level with #AI #SocialMedia #Writing"
            }
          ]
        },
        {
          "topic": "Idea generated by AI 2",
          "captions": [
            {
              "id": "3",
              "text": "Unlock the power of AI with Skipli AI. Create captivating content that resonates with your audience and drives engagement. #ContentCreation #AI #Marketing"
            },
            {
              "id": "4",
              "text": "Transform your social media strategy with Skipli AI. Generate unique and engaging captions that stand out. #AI #SocialMediaMarketing #Innovation"
            }
          ]
        }
      ]
    });
    } catch (error) {
      console.error('Error fetching user generated contents:', error);
    }
  };

  const unsaveContent = async (captionId) => {
    try {
      // const response = await axios.post('/api/UnSaveContent', { captionId });
      // if (response.data.success) {
      //   dispatch({ type: 'REMOVE_SAVED_CONTENT', payload: captionId });
      //   return true;
      // }
      // return false;
      dispatch({ type: 'REMOVE_SAVED_CONTENT', payload: captionId });
      return true;
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
        resetGeneratedIdeas,
        removeGeneratedCaption,
        sendAccessCode,
        verifyAccessCode,
        generatePostCaptions,
        generatePostIdeas,
        saveGeneratedContent,
        getUserGeneratedContents,
        unsaveContent,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };