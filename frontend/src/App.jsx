// import { useState, useEffect } from "react";
// import { vapi, startAssistant, stopAssistant } from "./ai";
// import ActiveCallDetails from "./call/ActiveCallDetails";

// function App() {
//   const [started, setStarted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
//   const [volumeLevel, setVolumeLevel] = useState(0);
//   const [callId, setCallId] = useState("");
//   const [callResult, setCallResult] = useState(null);
//   const [loadingResult, setLoadingResult] = useState(false);

//   const [nickname, setNickname] = useState("");
//   const [nicknameError, setNicknameError] = useState("");


//   useEffect(() => {
//     vapi
//       .on("call-start", () => {
//         setLoading(false);
//         setStarted(true);
//       })
//       .on("call-end", () => {
//         setStarted(false);
//         setLoading(false);
//       })
//       .on("speech-start", () => {
//         setAssistantIsSpeaking(true);
//       })
//       .on("speech-end", () => {
//         setAssistantIsSpeaking(false);
//       })
//       .on("volume-level", (level) => {
//         setVolumeLevel(level);
//       });

//     // Clean up event listeners when component unmounts
//     return () => {
//       vapi.removeAllListeners();
//     };
//   }, []);

//   const handleInputChange = (setter) => (event) => {
//     const value = event.target.value;
//     setter(value);
//     setNicknameError("");
//   };

//   const handleStart = async () => {
//     // Validate inputs before starting
//     if (!nickname.trim()) {
//       setNicknameError("Please enter a nickname to start");
//       return;
//     }

//     try {
//       setLoading(true);
//       const data = await startAssistant(nickname);
//       setCallId(data.id);
//     } catch (error) {
//       console.error("Error starting assistant:", error);
//       setLoading(false);
//       alert("Failed to start the call. Please try again.");
//     }
//   };

//   const handleStop = () => {
//     stopAssistant();
//     if (callId) {
//       getCallDetails();
//     } else {
//       console.error("No call ID available");
//       setLoading(false);
//     }
//   };

//   // Updated getCallDetails function with improved error handling
//   const getCallDetails = (interval = 3000) => {
//     if (!callId) {
//       console.error("Cannot get call details: No call ID");
//       setLoadingResult(false);
//       return;
//     }

//     setLoadingResult(true);
//     fetch(`/call-details?call_id=${callId}`)
//       .then((response) => {
//         // First check if the response is ok (status in the range 200-299)
//         if (!response.ok) {
//           throw new Error(`Server responded with status: ${response.status}`);
//         }
        
//         // Check if there's content to parse
//         const contentType = response.headers.get("content-type");
//         if (contentType && contentType.includes("application/json")) {
//           return response.json();
//         } else {
//           throw new Error("Response is not JSON");
//         }
//       })
//       .then((data) => {
//         if (data && data.analysis && data.summary) {
//           console.log(data);
//           setCallResult(data);
//           setLoadingResult(false);
//         } else {
//           // If data doesn't have required fields, retry
//           setTimeout(() => getCallDetails(interval), interval);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching call details:", error);
//         // If we want to show a more user-friendly error
//         alert("Could not load call details. Please try again later.");
//         // Set loading to false
//         setLoadingResult(false);
//       });
//   };

//   const showForm = !loading && !started && !loadingResult && !callResult;
//   const isNicknameEntered = nickname.trim() !== "";

//   return (
//     <div className="iphone-container">
//       <div className="iphone-frame">
//         <div className="iphone-notch">
//           <div className="iphone-speaker"></div>
//           <div className="iphone-camera"></div>
//         </div>
//         <div className="iphone-screen">
//           <div className="app-container">
//             {showForm && (
//               <div className="form-container">
//                 <h1 className="app-title">Safe Space for GBV Support 💜</h1>
//                 <p className="app-subtitle">You are not alone. Your privacy is our priority. Simply choose any nickname to begin your journey toward support.</p>
//                 <div className="input-group">
//                   <div className="input-wrapper">
//                     <input
//                       type="text"
//                       placeholder="Choose any nickname to start"
//                       value={nickname}
//                       className={`input-field ${nicknameError ? 'error-input' : ''}`}
//                       onChange={handleInputChange(setNickname)}
//                     />
//                     {nicknameError && <div className="error-message">{nicknameError}</div>}
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleStart}
//                   disabled={!isNicknameEntered || loading}
//                   className="button"
//                 >
//                   {loading ? "Starting..." : "Start call"}
//                 </button>
//               </div>
//             )}
//             {loadingResult && <p className="loading-text">Processing your conversation... please wait</p>}
//             {!loadingResult && callResult && (
//               <div className="call-result">
//                 <h2 className="result-title">Conversation Summary</h2>
//                 <div className="result-summary">
//                   <p>{callResult.summary}</p>
//                 </div>
//               </div>
//             )}
//             {(loading || loadingResult) && <div className="loading"></div>}
//             {started && (
//               <ActiveCallDetails
//                 assistantIsSpeaking={assistantIsSpeaking}
//                 volumeLevel={volumeLevel}
//                 endCallCallback={handleStop}
//               />
//             )}
//           </div>
//         </div>
//         <div className="iphone-home-button"></div>
//       </div>
//     </div>
//   );
// }

// export default App;



/*#####################################################################################*/

// import { useState, useEffect } from "react";
// import { vapi, startAssistant, stopAssistant } from "./ai";
// import ActiveCallDetails from "./call/ActiveCallDetails";

// function App() {
//   const [started, setStarted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
//   const [volumeLevel, setVolumeLevel] = useState(0);
//   const [callId, setCallId] = useState("");
//   const [callResult, setCallResult] = useState(null);
//   const [loadingResult, setLoadingResult] = useState(false);
//   const [error, setError] = useState(null);
//   const [submissionStatus, setSubmissionStatus] = useState(null); // "success", "error", or null
//   const [submitting, setSubmitting] = useState(false);
//   const [showDeclineMessage, setShowDeclineMessage] = useState(false);


//   const [nickname, setNickname] = useState("");
//   const [nicknameError, setNicknameError] = useState("");

//   useEffect(() => {
//     vapi
//       .on("call-start", () => {
//         setLoading(false);
//         setStarted(true);
//         setError(null);  // Clear any previous errors
//       })
//       .on("call-end", () => {
//         setStarted(false);
//         setLoading(false);
//       })
//       .on("speech-start", () => {
//         setAssistantIsSpeaking(true);
//       })
//       .on("speech-end", () => {
//         setAssistantIsSpeaking(false);
//       })
//       .on("volume-level", (level) => {
//         setVolumeLevel(level);
//       });

//     // Clean up event listeners when component unmounts
//     return () => {
//       vapi.removeAllListeners();
//     };
//   }, []);

//   const handleInputChange = (setter) => (event) => {
//     const value = event.target.value;
//     setter(value);
//     setNicknameError("");
//   };

//   const handleStart = async () => {
//     // Validate inputs before starting
//     if (!nickname.trim()) {
//       setNicknameError("Please enter a nickname to start");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);  // Clear any previous errors
//       const data = await startAssistant(nickname);
      
//       if (!data || !data.id) {
//         throw new Error("Invalid response from AI service");
//       }
      
//       setCallId(data.id);
//     } catch (error) {
//       console.error("Error starting assistant:", error);
//       setLoading(false);
//       setError("Failed to start the call. The AI service might be unavailable.");
//     }
//   };

//   const handleStop = () => {
//     stopAssistant();
//     if (callId) {
//       getCallDetails();
//     } else {
//       console.error("No call ID available");
//       setLoading(false);
//       setError("Call ID was not properly set. Please try again.");
//     }
//   };

//   // Get call details with retry logic and better error handling
//   const getCallDetails = async (retryCount = 0, maxRetries = 3, delay = 3000) => {
//     if (!callId) {
//       setError("No call ID available. Cannot retrieve conversation details.");
//       setLoadingResult(false);
//       return;
//     }

//     if (retryCount > maxRetries) {
//       setError("Failed to get conversation details after multiple attempts. The service might be busy.");
//       setLoadingResult(false);
//       return;
//     }

//     setLoadingResult(true);
//     setError(null);  // Clear any previous errors

//     try {
//       const response = await fetch(`/call-details?call_id=${callId}`);
      
//       if (!response.ok) {
//         throw new Error(`Server responded with status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       // Check if the response has the expected structure
//       if (data && data.analysis && data.summary) {
//         setCallResult(data);
//         setLoadingResult(false);
//       } else {
//         // If processing incomplete, retry after delay
//         console.log(`Attempt ${retryCount + 1}: Call details not ready yet, retrying...`);
//         setTimeout(() => getCallDetails(retryCount + 1, maxRetries, delay), delay);
//       }
//     } catch (error) {
//       console.error("Error fetching call details:", error);
      
//       // Retry on network errors, but provide feedback
//       if (error.message.includes("Failed to fetch") && retryCount < maxRetries) {
//         setError(`Connection issue. Retrying (${retryCount + 1}/${maxRetries})...`);
//         setTimeout(() => getCallDetails(retryCount + 1, maxRetries, delay), delay);
//       } else {
//         setError("Could not load conversation details. The server might be unavailable.");
//         setLoadingResult(false);
//       }
//     }
//   };

//   // Handle submission to database
//   const handleSubmit = async () => {
//     if (!callResult || !callId) {
//       setError("No data available to submit");
//       return;
//     }

//     setSubmitting(true);
//     setError(null);  // Clear any previous errors
    
//     try {
//       const response = await fetch('/submit-conversation', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           call_id: callId,
//           nickname: nickname,
//           summary: callResult.summary,
//           analysis: callResult.analysis,
//           timestamp: new Date().toISOString()
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.error || 'Failed to submit conversation data');
//       }

//       setSubmissionStatus('success');
//     } catch (error) {
//       console.error('Error submitting conversation:', error);
//       setError(error.message || 'Failed to save conversation data');
//       setSubmissionStatus('error');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Handle decline and reload the app
//   const handleDecline = () => {
//     // Reset all states to initial values
//     setCallResult(null);
//     setCallId("");
//     setNickname("");
//     setSubmissionStatus(null);
//     setError(null);
//   };

//   // Handle retrying the current action
//   const handleRetry = () => {
//     if (!started && !loadingResult) {
//       // If we're at the beginning, just clear errors
//       setError(null);
//     } else if (loadingResult) {
//       // If we were loading results, try again
//       getCallDetails();
//     } else if (callResult && submissionStatus === 'error') {
//       // If submission failed, try submitting again
//       handleSubmit();
//     }
//   };

//   const showForm = !loading && !started && !loadingResult && !callResult;
//   const isNicknameEntered = nickname.trim() !== "";
//   const showSubmissionOptions = !loadingResult && callResult && !submissionStatus;

//   return (
//     <div className="iphone-container">
//       <div className="iphone-frame">
//         <div className="iphone-notch">
//           <div className="iphone-speaker"></div>
//           <div className="iphone-camera"></div>
//         </div>
//         <div className="iphone-screen">
//           <div className="app-container">
//             {error && (
//               <div className="error-container">
//                 <p className="error-message">{error}</p>
//                 <button onClick={handleRetry} className="button retry-button">
//                   Try Again
//                 </button>
//                 <button onClick={handleDecline} className="button cancel-button">
//                   Start Over
//                 </button>
//               </div>
//             )}
            
//             {showForm && !error && (
//               <div className="form-container">
//                 <h1 className="app-title">Safe Space for GBV Support 💜</h1>
//                 <p className="app-subtitle">Welcome to your platform for support and information on gender-based violence. Your privacy and safety come first, choose any nickname to begin.</p>
//                 <div className="input-group">
//                   <div className="input-wrapper">
//                     <input
//                       type="text"
//                       placeholder="Choose any nickname to start"
//                       value={nickname}
//                       className={`input-field ${nicknameError ? 'error-input' : ''}`}
//                       onChange={handleInputChange(setNickname)}
//                     />
//                     {nicknameError && <div className="error-message">{nicknameError}</div>}
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleStart}
//                   disabled={!isNicknameEntered || loading}
//                   className="button"
//                 >
//                   {loading ? "Starting..." : "Start call"}
//                 </button>
//               </div>
//             )}
            
//             {loadingResult && !error && (
//               <div className="loading-container">
//                 <p className="loading-text">Processing your conversation... please wait</p>
//                 <div className="loading"></div>
//               </div>
//             )}
            
//             {!loadingResult && callResult && !error && (
//               <div className="call-result">
//                 <h2 className="result-title">Conversation Summary</h2>
//                 <div className="result-summary">
//                   <p>{callResult.summary}</p>
//                 </div>
                
//                 {/* {showSubmissionOptions && (
//                   <div className="submission-options">
//                     <p className="submission-prompt">With your permission, may we save a summary of this conversation in our database? This helps policymakers understand what’s happening in our communities and make better decisions for a safer future.</p>
//                     <div className="button-group">
//                       <button 
//                         onClick={handleSubmit} 
//                         disabled={submitting}
//                         className="button submit-button"
//                       >
//                         {submitting ? "Submitting..." : "Save Summary"}
//                       </button>
//                       <button 
//                         onClick={handleDecline}
//                         className="button decline-button"
//                       >
//                         No, Thanks
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {submissionStatus === 'success' && (
//                   <div className="submission-status success">
//                     <p>✅ Your conversation summary has been successfully saved.</p>
//                     <button onClick={handleDecline} className="button">Start New Conversation</button>
//                   </div>
//                 )}

//                 {submissionStatus === 'error' && !error && (
//                   <div className="submission-status error">
//                     <p>❌ There was an error saving your conversation. Please try again.</p>
//                     <div className="button-group">
//                       <button onClick={handleSubmit} className="button">Try Again</button>
//                       <button onClick={handleDecline} className="button">Cancel</button>
//                     </div>
//                   </div>
//                 )} */}
//                 {showSubmissionOptions && (
//                   <div className="submission-options">
//                     <p className="submission-prompt">
//                       With your permission, may we save a summary of this conversation in our database? 
//                       This helps policymakers understand what's happening in our communities and make better decisions for a safer future.
//                     </p>
//                     <div className="button-group">
//                       <button 
//                         onClick={handleSubmit} 
//                         disabled={submitting}
//                         className="button submit-button"
//                       >
//                         {submitting ? "Submitting..." : "Save Summary"}
//                       </button>
//                       <button 
//                         onClick={() => {
//                           handleDecline(); // Call the decline handler
//                           setShowSubmissionOptions(false); // Hide the options
//                           setShowDeclineMessage(true); // Show the thank you message
//                         }}
//                         className="button decline-button"
//                       >
//                         No, Thanks
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Thank you message shown after declining */}
//                 {showDeclineMessage && (
//                   <div className="submission-status info">
//                     <p>💜 No worries! We're grateful you're here. Feel free to continue using the platform whenever you need support.</p>
//                     <button 
//                       onClick={() => {
//                         setShowDeclineMessage(false);
//                         window.location.reload(); // Reload the platform when close button is clicked
//                       }} 
//                       className="button"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 )}

//                 {/* Success message */}
//                 {submissionStatus === 'success' && (
//                   <div className="submission-status success">
//                     <p>✅ Your conversation summary has been successfully saved.</p>
//                     <button 
//                       onClick={() => {
//                         handleDecline();
//                         window.location.reload(); // Also reload on new conversation
//                       }} 
//                       className="button"
//                     >
//                       Start New Conversation
//                     </button>
//                   </div>
//                 )}

//                 {/* Error message */}
//                 {submissionStatus === 'error' && !error && (
//                   <div className="submission-status error">
//                     <p>❌ There was an error saving your conversation. Please try again.</p>
//                     <div className="button-group">
//                       <button 
//                         onClick={handleSubmit} 
//                         className="button"
//                       >
//                         Try Again
//                       </button>
//                       <button 
//                         onClick={handleDecline} 
//                         className="button"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 )}



//               </div>
//             )}
            
//             {loading && !error && <div className="loading"></div>}
            
//             {started && !error && (
//               <ActiveCallDetails
//                 assistantIsSpeaking={assistantIsSpeaking}
//                 volumeLevel={volumeLevel}
//                 endCallCallback={handleStop}
//               />
//             )}
//           </div>
//         </div>
//         <div className="iphone-home-button"></div>
//       </div>
//     </div>
//   );
// }

// export default App;





/*/////////////////////////////////////////////////////////////////////*/


import { useState, useEffect } from "react";
import { vapi, startAssistant, stopAssistant } from "./ai";
import ActiveCallDetails from "./call/ActiveCallDetails";

function App() {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callId, setCallId] = useState("");
  const [callResult, setCallResult] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false);
  const [error, setError] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null); // "success", "error", or null
  const [submitting, setSubmitting] = useState(false);
  // New state for controlling summary visibility
  const [showSummary, setShowSummary] = useState(false);

  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  // Google Sheets script URL
  const googleScriptURL = 'https://script.google.com/macros/s/AKfycby_7ZCV_Xnzblr6RnBcjrKIxtAj3NoIIfqPpO1W1l1R9a2VabBArVFs37gxMIy0cld2JQ/exec';

  useEffect(() => {
    vapi
      .on("call-start", () => {
        setLoading(false);
        setStarted(true);
        setError(null);  // Clear any previous errors
      })
      .on("call-end", () => {
        setStarted(false);
        setLoading(false);
      })
      .on("speech-start", () => {
        setAssistantIsSpeaking(true);
      })
      .on("speech-end", () => {
        setAssistantIsSpeaking(false);
      })
      .on("volume-level", (level) => {
        setVolumeLevel(level);
      });

    // Clean up event listeners when component unmounts
    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  const handleInputChange = (setter) => (event) => {
    const value = event.target.value;
    setter(value);
    setNicknameError("");
  };

  const handleStart = async () => {
    // Validate inputs before starting
    if (!nickname.trim()) {
      setNicknameError("Please enter a nickname to start");
      return;
    }

    try {
      setLoading(true);
      setError(null);  // Clear any previous errors
      const data = await startAssistant(nickname);
      
      if (!data || !data.id) {
        throw new Error("Invalid response from AI service");
      }
      
      setCallId(data.id);
    } catch (error) {
      console.error("Error starting assistant:", error);
      setLoading(false);
      setError("Failed to start the call. The AI service might be unavailable.");
    }
  };

  const handleStop = () => {
    stopAssistant();
    if (callId) {
      getCallDetails();
    } else {
      console.error("No call ID available");
      setLoading(false);
      setError("Call ID was not properly set. Please try again.");
    }
  };

  // Get call details with retry logic and better error handling
  const getCallDetails = async (retryCount = 0, maxRetries = 3, delay = 3000) => {
    if (!callId) {
      setError("No call ID available. Cannot retrieve conversation details.");
      setLoadingResult(false);
      return;
    }

    if (retryCount > maxRetries) {
      setError("Failed to get conversation details after multiple attempts. The service might be busy.");
      setLoadingResult(false);
      return;
    }

    setLoadingResult(true);
    setError(null);  // Clear any previous errors

    try {
      const response = await fetch(`/call-details?call_id=${callId}`);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check if the response has the expected structure
      if (data && data.analysis && data.summary) {
        setCallResult(data);
        setLoadingResult(false);
        // Reset summary visibility when getting new results
        setShowSummary(false);
      } else {
        // If processing incomplete, retry after delay
        console.log(`Attempt ${retryCount + 1}: Call details not ready yet, retrying...`);
        setTimeout(() => getCallDetails(retryCount + 1, maxRetries, delay), delay);
      }
    } catch (error) {
      console.error("Error fetching call details:", error);
      
      // Retry on network errors, but provide feedback
      if (error.message.includes("Failed to fetch") && retryCount < maxRetries) {
        setError(`Connection issue. Retrying (${retryCount + 1}/${maxRetries})...`);
        setTimeout(() => getCallDetails(retryCount + 1, maxRetries, delay), delay);
      } else {
        setError("Could not load conversation details. The server might be unavailable.");
        setLoadingResult(false);
      }
    }
  };

  // Toggle summary visibility
  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  // Handle submission to Google Sheets
  const handleSubmit = async () => {
    if (!callResult || !callId) {
      setError("No data available to submit");
      return;
    }

    setSubmitting(true);
    setError(null);  // Clear any previous errors
    
    try {
      // Create FormData object to mimic a form submission
      const formData = new FormData();
      formData.append('timestamp', new Date().toISOString());
      formData.append('nickname', nickname);
      formData.append('callId', callId);
      formData.append('summary', callResult.summary);
      
      // Use fetch to submit to Google Sheets script
      const response = await fetch(googleScriptURL, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to submit conversation data to Google Sheets');
      }

      setSubmissionStatus('success');
    } catch (error) {
      console.error('Error submitting conversation:', error);
      setError(error.message || 'Failed to save conversation data');
      setSubmissionStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle decline and reload the app
  const handleDecline = () => {
    // Set a temporary decline message before resetting
    setSubmissionStatus('declined');
    
    // Reset all states after a delay to allow user to read the message
    setTimeout(() => {
      setCallResult(null);
      setCallId("");
      setNickname("");
      setSubmissionStatus(null);
      setError(null);
      setShowSummary(false);
    }, 3000); // 3 seconds delay before returning to start screen
  };

  // Handle retrying the current action
  const handleRetry = () => {
    if (!started && !loadingResult) {
      // If we're at the beginning, just clear errors
      setError(null);
    } else if (loadingResult) {
      // If we were loading results, try again
      getCallDetails();
    } else if (callResult && submissionStatus === 'error') {
      // If submission failed, try submitting again
      handleSubmit();
    }
  };

  const showForm = !loading && !started && !loadingResult && !callResult;
  const isNicknameEntered = nickname.trim() !== "";
  const showSubmissionOptions = !loadingResult && callResult && !submissionStatus;

  return (
    <div className="iphone-container">
      <div className="iphone-frame">
        <div className="iphone-notch">
          <div className="iphone-speaker"></div>
          <div className="iphone-camera"></div>
        </div>
        <div className="iphone-screen">
          <div className="app-container">
            {error && (
              <div className="error-container">
                <p className="error-message">{error}</p>
                <button onClick={handleRetry} className="button retry-button">
                  Try Again
                </button>
                <button onClick={handleDecline} className="button cancel-button">
                  Start Over
                </button>
              </div>
            )}
            
            {showForm && !error && (
              <div className="form-container">
                <h1 className="app-title">Safe Space for GBV Support 💜</h1>
                <p className="app-subtitle">Welcome to your platform for support and information on gender-based violence. Start by picking a nickname you are comfortable with to keep your privacy.</p>
                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Choose any nickname to start"
                      value={nickname}
                      className={`input-field ${nicknameError ? 'error-input' : ''}`}
                      onChange={handleInputChange(setNickname)}
                    />
                    {nicknameError && <div className="error-message">{nicknameError}</div>}
                  </div>
                </div>
                <button
                  onClick={handleStart}
                  disabled={!isNicknameEntered || loading}
                  className="button"
                >
                  {loading ? "Starting..." : "Start call"}
                </button>
              </div>
            )}
            
            {loadingResult && !error && (
              <div className="loading-container">
                <p className="loading-text">Processing your conversation... please wait</p>
                <div className="loading"></div>
              </div>
            )}
            
            {!loadingResult && callResult && !error && (
              <div className="call-result">
                <h2 className="result-title">Your Conversation Has Ended</h2>
                
                {/* Summary toggle button */}
                {!showSummary && (
                  <div className="summary-toggle-container">
                    <p className="summary-prompt">Would you like to view your conversation summary?</p>
                    <button 
                      onClick={toggleSummary} 
                      className="button view-summary-button"
                    >
                      View Summary
                    </button>
                  </div>
                )}
                
                {/* Scrollable summary card */}
                {showSummary && (
                  <div className="summary-card">
                    <div className="summary-header">
                      <h3>Conversation Summary</h3>
                      <button 
                        onClick={toggleSummary} 
                        className="close-summary-button"
                        aria-label="Close summary"
                      >
                        ×
                      </button>
                    </div>
                    <div className="summary-content">
                      <p>{callResult.summary}</p>
                    </div>
                  </div>
                )}
                
                {showSubmissionOptions && (
                  <div className="submission-options">
                    <p className="submission-prompt">With your permission, may we save this conversation summary in our database to help us better understand and address the issue of trend persistence in our communities?</p>
                    <div className="button-group">
                      <button 
                        onClick={handleSubmit} 
                        disabled={submitting}
                        className="button submit-button"
                      >
                        {submitting ? "Submitting..." : "Save Summary"}
                      </button>
                      <button 
                        onClick={handleDecline}
                        className="button decline-button"
                      >
                        No, Thanks
                      </button>
                    </div>
                  </div>
                )}

                {submissionStatus === 'success' && (
                  <div className="submission-status success">
                    <p>✅ Your conversation summary has been successfully saved.</p>
                    <button onClick={handleDecline} className="button">Start New Conversation</button>
                  </div>
                )}

                {submissionStatus === 'error' && !error && (
                  <div className="submission-status error">
                    <p>❌ There was an error saving your conversation. Please try again.</p>
                    <div className="button-group">
                      <button onClick={handleSubmit} className="button">Try Again</button>
                      <button onClick={handleDecline} className="button">Cancel</button>
                    </div>
                  </div>
                )}
                
                {submissionStatus === 'declined' && (
                  <div className="submission-status declined">
                    <p>Thank you for being here 💜. Feel free to return anytime you need support.</p>
                  </div>
                )}
              </div>
            )}
            
            {loading && !error && <div className="loading"></div>}
            
            {started && !error && (
              <ActiveCallDetails
                assistantIsSpeaking={assistantIsSpeaking}
                volumeLevel={volumeLevel}
                endCallCallback={handleStop}
              />
            )}
          </div>
        </div>
        <div className="iphone-home-button"></div>
      </div>
    </div>
  );
}

export default App;