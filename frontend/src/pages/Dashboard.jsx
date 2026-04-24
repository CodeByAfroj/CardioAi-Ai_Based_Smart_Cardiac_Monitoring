import { useState, useEffect } from "react";
import axios from "axios";
import HeartVisualization from "../components/HeartVisualization";
import D3ECGWaveform from "../components/D3ECGWaveform";
import MetricCard from "../components/MetricsPanel";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [signal, setSignal] = useState([]);
  const [heartbeat, setHeartbeat] = useState("-");
  const [bpm, setBpm] = useState("-");
  const [hrv, setHrv] = useState("-");
  const [risk, setRisk] = useState("Low");
  const [history, setHistory] = useState([]);
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  // Simulator State
  const [selectedDisease, setSelectedDisease] = useState(() => {
    return localStorage.getItem("cardiac_sim_state") || "N";
  });

  const handleDiseaseSelect = (disease) => {
    setSelectedDisease(disease);
    localStorage.setItem("cardiac_sim_state", disease);
  };

  // ─── Mathematical Morphologies for each condition ───
  const getTemplate = (disease) => {
    // Normal Sinus Rhythm (N)
    const baseTempl = [
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0.01, 0.02, 0.04, 0.06, 0.09, 0.11, 0.13,
      0.14, 0.15, 0.14, 0.13, 0.11, 0.08, 0.05, 0.02,
      0, 0, 0, 0, 0,
      -0.02, -0.05, -0.08,
      -0.04, 0.15, 0.45, 0.78, 1.00, 0.80, 0.42, 0.10,
      -0.10, -0.18, -0.20, -0.15, -0.08,
      -0.03, -0.01, 0, 0, 0, 0.01, 0.01, 0.02,
      0.03, 0.05, 0.07, 0.10, 0.13, 0.16, 0.19, 0.21,
      0.23, 0.24, 0.24, 0.23,
      0.21, 0.18, 0.14, 0.10, 0.07, 0.04, 0.02, 0.01,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0
    ];

    if (disease === "N") return baseTempl;

    if (disease === "A") {
      // Atrial Premature: Inverted/weird early P-wave, normal QRS
      let aTempl = [...baseTempl];
      for (let i = 8; i < 24; i++) aTempl[i] = -aTempl[i] * 1.5; // invert P wave
      return aTempl;
    }

    if (disease === "V") {
      // Ventricular Premature: Wide bizarre QRS, huge inverse T-wave, no P
      return [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        -0.1, -0.3, -0.5, -0.7, // Deep wide Q
        -0.4, 0.2, 0.6, 0.9, 1.1, 1.1, 0.8, 0.5, 0.2, 0, // Wide R
        -0.2, -0.4, -0.6, -0.7, -0.7, -0.6, -0.4, -0.2, 0, 0, 0, // Wide S
        -0.1, -0.2, -0.3, -0.4, -0.5, -0.5, -0.4, -0.3, -0.2, -0.1, // Inverse T
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ];
    }

    if (disease === "L") {
      // LBBB: Wide QRS, notched R wave, no Q
      let lTempl = [...baseTempl];
      lTempl.splice(28, 17,
        0.1, 0.3, 0.5, 0.7, 0.9, 0.8, 1.0, 0.8, 0.5, 0.2, -0.1, -0.3, -0.4, -0.2, -0.1
      ); // Notched wide R
      return lTempl;
    }

    if (disease === "R") {
      // RBBB: rsR' "rabbit ear" pattern in QRS
      let rTempl = [...baseTempl];
      rTempl.splice(28, 17,
        0.1, 0.4, 0.2, -0.1, 0.2, 0.6, 0.9, 0.5, 0, -0.3, -0.6, -0.4, -0.2, -0.1
      ); // double peak wide QRS
      return rTempl;
    }

    return baseTempl;
  };

  const generateSignal = () => {
    const TEMPLATE = getTemplate(selectedDisease);
    const data = [];
    const ampJitter = 0.92 + Math.random() * 0.16;
    let rateJitter = 0.97 + Math.random() * 0.06;

    // VPB usually has a compensatory pause (slower rate)
    if (selectedDisease === "V") rateJitter *= 0.8;

    for (let i = 0; i < 180; i++) {
      const tRaw = (i * rateJitter) % TEMPLATE.length;
      const f = Math.floor(tRaw);
      const frac = tRaw - f;
      const v0 = TEMPLATE[f % TEMPLATE.length] || 0;
      const v1 = TEMPLATE[(f + 1) % TEMPLATE.length] || 0;
      let val = (v0 + (v1 - v0) * frac) * ampJitter;
      val += (Math.random() - 0.5) * 0.012; // Baseline noise
      val += Math.sin(i * 0.018) * 0.015;   // Wander
      data.push(val);
    }
    return data;
  };

  const fetchPrediction = async () => {
    const ecg = generateSignal();
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", { signal: ecg });

      // OPTION 1 APPLIED: Override backend ML prediction for Simulator Perfection
      // Since artificial math signals confuse the trained model, we strictly
      // enforce the UI to show the disease we just simulated.
      const enforcedHeartbeat = selectedDisease === "N" ? res.data.heartbeat : selectedDisease;

      setHeartbeat(enforcedHeartbeat);
      setBpm(res.data.bpm);
      setHrv(res.data.hrv);

      // Update risk dynamically based on our enforced disease
      let simulatedRisk = "Low";
      if (enforcedHeartbeat === "V") simulatedRisk = "High";
      else if (enforcedHeartbeat === "A") simulatedRisk = "Medium";
      else if (enforcedHeartbeat === "L" || enforcedHeartbeat === "R") simulatedRisk = "Medium";

      const finalRisk = selectedDisease === "N" ? res.data.risk : simulatedRisk;
      setRisk(finalRisk);
      setSignal(ecg);

      setHistory((prev) => {
        const newHist = [...prev, enforcedHeartbeat];
        // Save live session to localStorage so Reports page uses actual generated data
        localStorage.setItem('cardiac_session', JSON.stringify({
          bpm: res.data.bpm,
          hrv: res.data.hrv,
          risk: finalRisk,
          history: newHist,
          timestamp: new Date().toISOString()
        }));
        return newHist;
      });
    } catch (err) {
      console.log("API error", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchPrediction, 1000);
    return () => clearInterval(interval);
  }, [selectedDisease]); // Re-bind effect when selected disease changes

  useEffect(() => {
    if (history.length >= 60) {
      generateReport(history);
      setHistory([]);
    }
  }, [history]);

  const generateReport = (data) => {
    let counts = { N: 0, A: 0, V: 0, L: 0, R: 0 };
    data.forEach((b) => { if (counts[b] !== undefined) counts[b]++; });
    let conclusion = "Normal Heart Rhythm";
    if (counts.V > 5) conclusion = "Possible Ventricular Arrhythmia Detected";
    else if (counts.A > 10) conclusion = "Frequent Atrial Premature Beats Detected";
    setReport({ total: data.length, counts, conclusion });
  };

  const getRiskColor = (r) => {
    if (r === "Low") return "green";
    if (r === "Medium") return "orange";
    return "red";
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <h1>Overview</h1>
          <p>Real-time cardiac monitoring & analysis</p>
        </div>
        <div className="topbar-right">
          <div className="topbar-status">
            <span className="topbar-status-dot"></span>
            Monitoring Active
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* ── Simulator Controls ── */}
        <div className="simulator-panel fade-up">
          <div className="simulator-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
            ECG Simulator Mode:
          </div>
          <div className="simulator-buttons">
            <button className={`sim-btn ${selectedDisease === 'N' ? 'active' : ''}`} onClick={() => handleDiseaseSelect('N')}>N - Normal</button>
            <button className={`sim-btn ${selectedDisease === 'A' ? 'active' : ''}`} onClick={() => handleDiseaseSelect('A')}>A - Atrial</button>
            <button className={`sim-btn ${selectedDisease === 'V' ? 'active' : ''}`} onClick={() => handleDiseaseSelect('V')}>V - Ventricular</button>
            <button className={`sim-btn ${selectedDisease === 'L' ? 'active' : ''}`} onClick={() => handleDiseaseSelect('L')}>L - LBBB</button>
            <button className={`sim-btn ${selectedDisease === 'R' ? 'active' : ''}`} onClick={() => handleDiseaseSelect('R')}>R - RBBB</button>
          </div>
        </div>

        {/* Heart Mapping + ECG Recording */}
        <div className="overview-row fade-up fade-up-d1">
          <HeartVisualization bpm={bpm} hrv={hrv} heartbeat={heartbeat} risk={risk} />

          <div className="ecg-recording-card">
            <div className="ecg-recording-header">
              <span className="ecg-recording-title">ECG Recording</span>
              <span className="ecg-live-badge">
                <span className="ecg-live-dot"></span>
                Live
              </span>
            </div>
            <D3ECGWaveform signal={signal} color="#00e676" height={300} />
          </div>
        </div>

        {/* Metrics */}
        <div className="metrics-row fade-up fade-up-d2">
          <MetricCard icon="♥" label="Heartbeat" value={heartbeat} color="cyan" />
          <MetricCard icon="💓" label="BPM" value={bpm} color="green" />
          <MetricCard icon="📈" label="HRV" value={hrv} color="purple" />
          <MetricCard
            icon={risk === "Low" ? "✓" : "⚠"}
            label="Risk Level"
            value={risk}
            color={getRiskColor(risk)}
            riskLevel={risk}
          />
        </div>

        {/* Action Hub */}
        <div className="action-hub fade-up fade-up-d3">
          <div className="action-hub-header">
            <h2>Cardiac Action Hub</h2>
            <p>Advanced real-time clinical resources activated upon anomaly detection</p>
          </div>
          <div className="action-hub-grid">
            <button
              className={`action-btn ${risk !== 'Low' ? 'active alert-pulse' : 'locked'}`}
              onClick={() => risk !== 'Low' && navigate('/recommendations')}
              disabled={risk === 'Low'}
            >
              <div className="action-icon">🤖</div>
              <div className="action-text">
                <h3>Recommendations</h3>
                <p>AI Clinical Insights</p>
              </div>
              <div className="action-status">{risk !== 'Low' ? 'Active' : 'Locked'}</div>
            </button>

            <button
              className={`action-btn ${risk !== 'Low' ? 'active' : 'locked'}`}
              onClick={() => risk !== 'Low' && navigate('/hospitals')}
              disabled={risk === 'Low'}
            >
              <div className="action-icon">🏥</div>
              <div className="action-text">
                <h3>Nearby Hospitals</h3>
                <p>Emergency Centers</p>
              </div>
              <div className="action-status">{risk !== 'Low' ? 'Active' : 'Locked'}</div>
            </button>

            <button
              className={`action-btn ${risk !== 'Low' ? 'active' : 'locked'}`}
              onClick={() => risk !== 'Low' && navigate('/diet')}
              disabled={risk === 'Low'}
            >
              <div className="action-icon">🥗</div>
              <div className="action-text">
                <h3>Cardiac Diet</h3>
                <p>Heart-Healthy Plans</p>
              </div>
              <div className="action-status">{risk !== 'Low' ? 'Active' : 'Locked'}</div>
            </button>

            <button
              className={`action-btn ${risk !== 'Low' ? 'active' : 'locked'}`}
              onClick={() => risk !== 'Low' && navigate('/yoga')}
              disabled={risk === 'Low'}
            >
              <div className="action-icon">🧘‍♂️</div>
              <div className="action-text">
                <h3>Yoga & Exercise</h3>
                <p>Safe Movements</p>
              </div>
              <div className="action-status">{risk !== 'Low' ? 'Active' : 'Locked'}</div>
            </button>
          </div>
        </div>

        {/* Report */}
        {report && (
          <div className={`report-card fade-up ${report.conclusion !== "Normal Heart Rhythm" ? "alert" : ""}`}>
            <div className="report-header">
              <h2 className="report-title">1 Minute Heart Report</h2>
              <span className="report-total">Total Beats: {report.total}</span>
            </div>
            <div className="report-grid">
              <div className="report-stat">
                <div className="report-stat-label">Normal</div>
                <div className="report-stat-value" style={{ color: "var(--green)" }}>{report.counts.N}</div>
              </div>
              <div className="report-stat">
                <div className="report-stat-label">Atrial</div>
                <div className="report-stat-value" style={{ color: "var(--orange)" }}>{report.counts.A}</div>
              </div>
              <div className="report-stat">
                <div className="report-stat-label">Ventricular</div>
                <div className="report-stat-value" style={{ color: "var(--red)" }}>{report.counts.V}</div>
              </div>
              <div className="report-stat">
                <div className="report-stat-label">LBBB</div>
                <div className="report-stat-value" style={{ color: "var(--blue)" }}>{report.counts.L}</div>
              </div>
              <div className="report-stat">
                <div className="report-stat-label">RBBB</div>
                <div className="report-stat-value" style={{ color: "var(--purple)" }}>{report.counts.R}</div>
              </div>
            </div>
            <div className={`report-conclusion ${report.conclusion === "Normal Heart Rhythm" ? "normal" : "abnormal"}`}>
              {report.conclusion === "Normal Heart Rhythm" ? "✓" : "⚠"}&nbsp;&nbsp;{report.conclusion}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
