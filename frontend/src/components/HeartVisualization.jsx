import { useEffect, useRef } from "react";

function HeartVisualization({ bpm, hrv, heartbeat, risk }) {
  const glowRef = useRef(null);


  const riskColor = risk === "Low" ? "#00e676" : risk === "Medium" ? "#ffab40" : "#ff5252";

  return (
    <div className="heart-viz-card">
      <div className="heart-viz-title">Cardiac Mapping</div>

      <div className="heart-viz-container">
        {/* Vitals around the heart */}
        <div className="heart-vital heart-vital-tl">
          <div className="heart-vital-label">Blood Pressure</div>
          <div className="heart-vital-value">
            <span style={{ color: "#448aff" }}>118/76</span>
          </div>
        </div>

        <div className="heart-vital heart-vital-tr">
          <div className="heart-vital-label">Heartbeat</div>
          <div className="heart-vital-value">
            <span style={{ color: "#18ffff" }}>{heartbeat}</span>
          </div>
        </div>

        <div className="heart-vital heart-vital-bl">
          <div className="heart-vital-label">HRV Index</div>
          <div className="heart-vital-value">
            <span style={{ color: "#b388ff" }}>{hrv}</span>
            <span className="heart-vital-unit">ms</span>
          </div>
        </div>

        <div className="heart-vital heart-vital-br">
          <div className="heart-vital-label">Heart Rate</div>
          <div className="heart-vital-value">
            <span style={{ color: "#00e676" }}>{bpm}</span>
            <span className="heart-vital-unit">bpm</span>
          </div>
        </div>

        {/* Central Heart SVG */}
        <div className="heart-center" ref={glowRef}>
          <div style={{ position: 'relative', width: '260px', height: '260px', zIndex: 0 }}>
            {/* 3D Heart Image with Screen Blend Mode */}
            <img
              src="/heart3d.png"
              alt="3D Anatomic Heart"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                mixBlendMode: 'screen',
                filter: `drop-shadow(0 0 10px ${riskColor})`,
                transition: "all 0.3s ease"
              }}
            />

            {/* OVERLAYS FOR ANATOMICAL HIGHLIGHTING */}
            <svg 
              className={`anatomy-overlay ${heartbeat === 'A' ? 'active' : ''}`} 
              viewBox="0 0 260 260"
            >
              <defs>
                <radialGradient id="gradA" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff5252" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ff5252" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Atria (Upper Chambers) - Left and Right Atrium positions */}
              <circle cx="110" cy="70" r="30" fill="url(#gradA)" style={{ mixBlendMode: 'screen', filter: 'blur(10px)' }} />
              <circle cx="160" cy="80" r="25" fill="url(#gradA)" style={{ mixBlendMode: 'screen', filter: 'blur(10px)' }} />
            </svg>

            <svg 
              className={`anatomy-overlay ${heartbeat === 'V' ? 'active' : ''}`} 
              viewBox="0 0 260 260"
            >
              <defs>
                <radialGradient id="gradV" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffab40" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffab40" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Ventricles (Lower Chambers) */}
              <ellipse cx="130" cy="160" rx="60" ry="50" fill="url(#gradV)" style={{ mixBlendMode: 'screen', filter: 'blur(15px)' }} />
            </svg>

            <svg 
              className={`anatomy-overlay ${heartbeat === 'L' ? 'active' : ''}`} 
              viewBox="0 0 260 260"
            >
              <defs>
                <radialGradient id="gradL" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#b388ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#b388ff" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Left Bundle Branch (Right side of image) */}
              <path d="M 140 100 Q 180 150 160 220" stroke="url(#gradL)" strokeWidth="30" fill="none" strokeLinecap="round" style={{ mixBlendMode: 'screen', filter: 'blur(8px)' }} />
            </svg>

            <svg 
              className={`anatomy-overlay ${heartbeat === 'R' ? 'active' : ''}`} 
              viewBox="0 0 260 260"
            >
              <defs>
                <radialGradient id="gradR" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#18ffff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#18ffff" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Right Bundle Branch (Left side of image) */}
              <path d="M 120 110 Q 80 150 100 210" stroke="url(#gradR)" strokeWidth="30" fill="none" strokeLinecap="round" style={{ mixBlendMode: 'screen', filter: 'blur(8px)' }} />
            </svg>

          </div>
        </div>

        {/* Connection lines */}
        <svg className="heart-connections" viewBox="0 0 400 350" preserveAspectRatio="none">
          <line x1="80" y1="60" x2="150" y2="120" stroke="#448aff" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />
          <line x1="320" y1="60" x2="250" y2="120" stroke="#18ffff" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />
          <line x1="80" y1="290" x2="150" y2="230" stroke="#b388ff" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />
          <line x1="320" y1="290" x2="250" y2="230" stroke="#00e676" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />
          {/* Dots at connection endpoints */}
          <circle cx="150" cy="120" r="2" fill="#448aff" opacity="0.5" />
          <circle cx="250" cy="120" r="2" fill="#18ffff" opacity="0.5" />
          <circle cx="150" cy="230" r="2" fill="#b388ff" opacity="0.5" />
          <circle cx="250" cy="230" r="2" fill="#00e676" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

export default HeartVisualization;
