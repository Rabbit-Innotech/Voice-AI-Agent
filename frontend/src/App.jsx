
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

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");

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
//     setter(event.target.value);
//   };

//   const handleStart = async () => {
//     try {
//       setLoading(true);
//       const data = await startAssistant(firstName, lastName, email, phoneNumber);
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
//   const allFieldsFilled = firstName && lastName && email && phoneNumber;

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
//                 <h1 className="app-title">Application Call</h1>
//                 <div className="input-group">
//                   <input
//                     type="text"
//                     placeholder="First Name"
//                     value={firstName}
//                     className="input-field"
//                     onChange={handleInputChange(setFirstName)}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Last Name"
//                     value={lastName}
//                     className="input-field"
//                     onChange={handleInputChange(setLastName)}
//                   />
//                   <input
//                     type="email"
//                     placeholder="Email address"
//                     value={email}
//                     className="input-field"
//                     onChange={handleInputChange(setEmail)}
//                   />
//                   <input
//                     type="tel"
//                     placeholder="Phone number"
//                     value={phoneNumber}
//                     className="input-field"
//                     onChange={handleInputChange(setPhoneNumber)}
//                   />
//                 </div>
//                 <button
//                   onClick={handleStart}
//                   disabled={!allFieldsFilled || loading}
//                   className="button"
//                 >
//                   {loading ? "Starting..." : "Start Application Call"}
//                 </button>
//               </div>
//             )}
//             {loadingResult && <p className="loading-text">Loading call details... please wait</p>}
//             {!loadingResult && callResult && (
//               <div className="call-result">
//                 <h2 className="result-title">Call Summary</h2>
//                 <div className="result-qualification">
//                   <span className="qualification-label">Qualification Status:</span>
//                   <span className={`qualification-value ${callResult.analysis?.structuredData?.is_qualified ? 'qualified' : 'not-qualified'}`}>
//                     {callResult.analysis?.structuredData?.is_qualified ? 'Qualified' : 'Not Qualified'}
//                   </span>
//                 </div>
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    vapi
      .on("call-start", () => {
        setLoading(false);
        setStarted(true);
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^07\d{8}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (setter, validator) => (event) => {
    const value = event.target.value;
    setter(value);
    
    // Clear previous errors when user types
    if (validator === validateEmail) {
      setEmailError("");
    } else if (validator === validatePhone) {
      setPhoneError("");
    }
  };

  const handleStart = async () => {
    // Validate inputs before starting
    let isValid = true;
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }
    
    if (!validatePhone(phoneNumber)) {
      setPhoneError("Phone number must be 10 digits starting with 07");
      isValid = false;
    }
    
    if (!isValid) return;

    try {
      setLoading(true);
      const data = await startAssistant(firstName, lastName, email, phoneNumber);
      setCallId(data.id);
    } catch (error) {
      console.error("Error starting assistant:", error);
      setLoading(false);
      alert("Failed to start the call. Please try again.");
    }
  };

  const handleStop = () => {
    stopAssistant();
    if (callId) {
      getCallDetails();
    } else {
      console.error("No call ID available");
      setLoading(false);
    }
  };

  // Updated getCallDetails function with improved error handling
  const getCallDetails = (interval = 3000) => {
    if (!callId) {
      console.error("Cannot get call details: No call ID");
      setLoadingResult(false);
      return;
    }

    setLoadingResult(true);
    fetch(`/call-details?call_id=${callId}`)
      .then((response) => {
        // First check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        // Check if there's content to parse
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          throw new Error("Response is not JSON");
        }
      })
      .then((data) => {
        if (data && data.analysis && data.summary) {
          console.log(data);
          setCallResult(data);
          setLoadingResult(false);
        } else {
          // If data doesn't have required fields, retry
          setTimeout(() => getCallDetails(interval), interval);
        }
      })
      .catch((error) => {
        console.error("Error fetching call details:", error);
        // If we want to show a more user-friendly error
        alert("Could not load call details. Please try again later.");
        // Set loading to false
        setLoadingResult(false);
      });
  };

  const showForm = !loading && !started && !loadingResult && !callResult;
  const allFieldsFilled = firstName && lastName && email && phoneNumber;

  return (
    <div className="iphone-container">
      <div className="iphone-frame">
        <div className="iphone-notch">
          <div className="iphone-speaker"></div>
          <div className="iphone-camera"></div>
        </div>
        <div className="iphone-screen">
          <div className="app-container">
            {showForm && (
              <div className="form-container">
                <h1 className="app-title">Online Public Service Call</h1>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    className="input-field"
                    onChange={handleInputChange(setFirstName)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    className="input-field"
                    onChange={handleInputChange(setLastName)}
                  />
                  <div className="input-wrapper">
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      className={`input-field ${emailError ? 'error-input' : ''}`}
                      onChange={handleInputChange(setEmail, validateEmail)}
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                  </div>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      placeholder="Phone number (10 digits starting with 07)"
                      value={phoneNumber}
                      className={`input-field ${phoneError ? 'error-input' : ''}`}
                      onChange={handleInputChange(setPhoneNumber, validatePhone)}
                    />
                    {phoneError && <div className="error-message">{phoneError}</div>}
                  </div>
                </div>
                <button
                  onClick={handleStart}
                  disabled={!allFieldsFilled || loading}
                  className="button"
                >
                  {loading ? "Starting..." : "Start Call"}
                </button>
              </div>
            )}
            {loadingResult && <p className="loading-text">Loading call details... please wait</p>}
            {!loadingResult && callResult && (
              <div className="call-result">
                <h2 className="result-title">Call Summary</h2>
                <div className="result-qualification">
                  <span className="qualification-label">Qualification Status:</span>
                  <span className={`qualification-value ${callResult.analysis?.structuredData?.is_qualified ? 'qualified' : 'not-qualified'}`}>
                    {callResult.analysis?.structuredData?.is_qualified ? 'Qualified' : 'Not Qualified'}
                  </span>
                </div>
                <div className="result-summary">
                  <p>{callResult.summary}</p>
                </div>
              </div>
            )}
            {(loading || loadingResult) && <div className="loading"></div>}
            {started && (
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