// const numBars = 10;

// const VolumeLevel = ({ volume }) => {
//   return (
//     <div className="volume-level">
//       <div className="volume-bars">
//         {Array.from({ length: numBars }, (_, i) => {
//           return (
//             <div
//               key={i}
//               className={`volume-bar ${i / numBars < volume ? "active" : ""}`}
//             ></div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default VolumeLevel


const numBars = 20; // Increased number of bars for better wave effect

const PhoneIcon = () => (
  <svg 
    className="phone-icon-svg"
    viewBox="0 0 24 24" 
    width="40" 
    height="40"
  >
    <path
      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
      fill="currentColor"
    />
  </svg>
);

const VolumeLevel = ({ volume }) => {
  const soundWaves = Array.from({ length: numBars }, (_, i) => {
    const isActive = i / numBars < volume;
    const waveHeight = 15 + Math.sin((i / numBars) * Math.PI) * 50; // Increased height
    const animationDelay = `${i * 0.05}s`; // Faster animation
    
    return { isActive, waveHeight, animationDelay };
  });

  return (
    <div className="volume-level">
      <div className="call-animation-container">
        <div className="phone-icon">
          <PhoneIcon />
        </div>

        <div className="sound-wave-container">
          {soundWaves.map((wave, i) => (
            <div
              key={i}
              className={`sound-wave ${wave.isActive ? "active" : ""}`}
              style={{
                height: `${wave.waveHeight}px`,
                animationDelay: wave.animationDelay,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolumeLevel;