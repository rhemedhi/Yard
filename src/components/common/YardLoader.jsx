const YardLoader = ({ size = 100, className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="animate-pulse"
      >
        {/* Left branch of Y */}
        <path
          d="M20 20 L50 50"
          stroke="green"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="42.43"
          strokeDashoffset="42.43"
          className="animate-[draw_2s_ease-in-out_infinite]"
        />
        
        {/* Right branch of Y */}
        <path
          d="M80 20 L50 50"
          stroke="green"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="42.43"
          strokeDashoffset="42.43"
          className="animate-[draw_2s_ease-in-out_infinite_0.5s]"
        />
        
        {/* Stem of Y */}
        <path
          d="M50 50 L50 95"
          stroke="green"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="35"
          strokeDashoffset="35"
          className="animate-[draw_2s_ease-in-out_infinite_1s]"
        />
        
        {/* Central dot for visual appeal */}
        {/* <circle
          cx="50"
          cy="50"
          r="3"
          fill="green"
          className="animate-[fadeIn_2s_ease-in-out_infinite_1.5s]"
          opacity="0"
        /> */}
      </svg>
    </div>
  );
};

export default YardLoader;