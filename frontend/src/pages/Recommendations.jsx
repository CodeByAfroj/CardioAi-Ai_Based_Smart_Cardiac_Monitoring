import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Recommendations() {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState(null);
  const [primaryFinding, setPrimaryFinding] = useState("Normal Rhythm");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cardiac_session");
      if (stored) {
        const parsed = JSON.parse(stored);
        setSessionData(parsed);

        const cnts = { N: 0, A: 0, V: 0, L: 0, R: 0 };
        (parsed.history || []).forEach((h) => {
          if (cnts[h] !== undefined) cnts[h]++;
        });

        if (cnts.V > 0)
          setPrimaryFinding("Ventricular Premature Beats (VPB)");
        else if (cnts.A > Math.max(cnts.L, cnts.R))
          setPrimaryFinding("Atrial Premature Beats (APB)");
        else if (cnts.L > 0) setPrimaryFinding("Left Bundle Branch Block (LBBB)");
        else if (cnts.R > 0) setPrimaryFinding("Right Bundle Branch Block (RBBB)");
        else setPrimaryFinding("Normal Sinus Rhythm");
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getRecommendations = () => {
    if (primaryFinding.includes("Ventricular")) {
      return [
        { title: "Immediate Action", desc: "Seek urgent medical attention. VPBs can be serious if frequent." },
        { title: "Medication Review", desc: "Consult your cardiologist to review antiarrhythmic medications like beta-blockers." },
        { title: "Electrolyte Balance", desc: "Ensure your potassium and magnesium levels are checked via blood tests." },
        { title: "Caffeine & Stress", desc: "Strictly avoid caffeine, nicotine, and high-stress situations immediately." }
      ];
    } else if (primaryFinding.includes("Atrial")) {
      return [
        { title: "Monitor Closely", desc: "APBs are common but frequent occurrences may trigger Atrial Fibrillation." },
        { title: "Lifestyle Adjustment", desc: "Reduce alcohol intake, avoid heavy meals before bedtime, and improve sleep hygiene." },
        { title: "Thyroid Check", desc: "Hyperthyroidism can cause APBs. Consider a thyroid function test." },
        { title: "Echocardiogram", desc: "Schedule a routine echocardiogram to rule out structural heart issues." }
      ];
    } else if (primaryFinding.includes("Bundle Branch")) {
      return [
        { title: "Cardiac Evaluation", desc: "Bundle branch blocks often indicate underlying heart disease. A comprehensive evaluation is needed." },
        { title: "Blood Pressure Management", desc: "Keep blood pressure strictly within normal limits using prescribed medications." },
        { title: "Regular Monitoring", desc: "Annual ECG monitoring to ensure the block does not progress." }
      ];
    }
    return [
      { title: "Maintain Healthy Habits", desc: "Your heart rhythm appears normal. Continue a heart-healthy diet and regular exercise." },
      { title: "Stay Hydrated", desc: "Drink plenty of water throughout the day to maintain optimal cardiovascular function." }
    ];
  };

  const recommendations = getRecommendations();

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <button className="btn btn-secondary" onClick={() => navigate("/dashboard")} style={{ marginBottom: '10px' }}>
            ← Back to Dashboard
          </button>
          <h1>World-Class AI Recommendations</h1>
          <p>Personalized clinical insights based on your real-time cardiac session</p>
        </div>
        <div className="topbar-right">
          <div className="risk-badge" style={{ padding: '8px 16px', background: sessionData?.risk === 'High' ? 'var(--red)' : 'var(--orange)', color: 'white', borderRadius: '20px', fontWeight: 'bold' }}>
            Detected: {primaryFinding}
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="rec-hero fade-up">
          <div className="rec-hero-icon">🤖🩺</div>
          <h2>AI Medical Assessment</h2>
          <p>
            Based on our advanced 1D CNN pipeline, we detected <strong>{primaryFinding}</strong> during your recent monitoring session. 
            Below are top-tier clinical recommendations to manage this specific cardiac condition effectively.
          </p>
        </div>

        <div className="rec-grid fade-up fade-up-d1">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="rec-card-premium">
              <div className="rec-card-number">0{idx + 1}</div>
              <h3>{rec.title}</h3>
              <p>{rec.desc}</p>
            </div>
          ))}
        </div>

        <div className="action-banner fade-up fade-up-d2">
          <div className="action-banner-content">
            <h3>Need to speak with a professional?</h3>
            <p>Our system integrates directly with top-tier cardiologists for immediate tele-consultation.</p>
          </div>
          <button className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '16px' }}>Book Tele-Consultation</button>
        </div>
      </div>
    </>
  );
}

export default Recommendations;
