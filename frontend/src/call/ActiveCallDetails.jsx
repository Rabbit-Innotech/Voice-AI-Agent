// import AssistantSpeechIndicator from "./AssistantSpeechIndicator";
// import VolumeLevel from "./VolumeLevel";

// const ActiveCallDetails = ({
//   assistantIsSpeaking,
//   volumeLevel,
//   endCallCallback,
// }) => {
//   return (
//     <div className="active-call-detail">
//       <div className="call-info">
//         <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
//         <VolumeLevel volume={volumeLevel} />
//       </div>
//       <div className="end-call-button">
//         <button onClick={endCallCallback}>End Call</button>
//       </div>
//     </div>
//   );
// };

// export default ActiveCallDetails

// This would go in your call/ActiveCallDetails.jsx file

import React from "react";
import AssistantSpeechIndicator from "./AssistantSpeechIndicator";
import VolumeLevel from "./VolumeLevel";

function ActiveCallDetails({ assistantIsSpeaking, volumeLevel, endCallCallback }) {
  return (
    <div className="active-call-detail">
      <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
      
      <VolumeLevel volume={volumeLevel} />
      
      <div className="end-call-button">
        <button onClick={endCallCallback} className="end-button">
          End Call
        </button>
      </div>
    </div>
  );
}

export default ActiveCallDetails;