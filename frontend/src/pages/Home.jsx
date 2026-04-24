import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* ══════════════════════════════════════════
          HERO — THE PROBLEM STATEMENT
      ══════════════════════════════════════════ */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <div className="lp-badge fade-up">
            <span className="lp-badge-dot"></span>
            Real-Time Cardiac Intelligence
          </div>

          <h1 className="lp-hero-title fade-up fade-up-d1">
            AI Powered <span className="lp-highlight"></span>
            Smart Cardiac Monitoring System
          </h1>

          <p className="lp-hero-subtitle fade-up fade-up-d2">
            Most are preventable. The challenge? Cardiac arrhythmias are silent, fast, and
            often missed until it's too late. Traditional monitoring is slow, expensive, and
            requires hospital infrastructure. We change that.
          </p>

          <div className="lp-hero-stats fade-up fade-up-d3">
            <div className="lp-stat">
              <span className="lp-stat-num lp-red">17.9M</span>
              <span className="lp-stat-label">Deaths/year from CVD globally</span>
            </div>
            <div className="lp-stat-divider"></div>
            <div className="lp-stat">
              <span className="lp-stat-num lp-orange">80%</span>
              <span className="lp-stat-label">Are preventable with early detection</span>
            </div>
            <div className="lp-stat-divider"></div>
            <div className="lp-stat">
              <span className="lp-stat-num lp-green">&lt;1s</span>
              <span className="lp-stat-label">Our AI detection latency</span>
            </div>
          </div>

          <div className="lp-hero-actions fade-up fade-up-d4">
            <Link to="/dashboard" className="btn btn-primary lp-cta-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              Launch Live Monitor
            </Link>
            <a href="#solution" className="btn btn-secondary">See How It Works ↓</a>
          </div>
        </div>

        {/* Animated ECG Background Visual */}
        <div className="lp-hero-visual fade-up fade-up-d3">
          <div className="lp-ecg-card">
            <div className="lp-ecg-header">
              <span className="lp-ecg-live"><span className="ecg-live-dot"></span>Live ECG Feed</span>
              <span className="lp-ecg-status lp-red-text">⚠ Arrhythmia Detected</span>
            </div>
            <svg className="lp-ecg-wave" viewBox="0 0 400 100" preserveAspectRatio="none">
              <path className="lp-ecg-path" d="M0,50 L30,50 L40,50 L45,30 L50,50 L55,50 L60,10 L65,90 L70,50 L80,50 L90,50 L95,35 L100,50 L110,50 L115,20 L120,80 L125,50 L140,50 L145,35 L150,50 L155,50 L160,5 L165,95 L170,50 L185,50 L190,35 L195,50 L200,50 L205,20 L210,80 L215,50 L230,50 L235,35 L240,50 L250,50 L255,10 L260,90 L265,50 L280,50 L285,35 L290,50 L300,50 L305,20 L310,80 L315,50 L330,50 L335,35 L340,50 L350,50 L355,5 L360,95 L365,50 L380,50 L390,50 L400,50" fill="none" stroke="var(--red)" strokeWidth="2.5" />
            </svg>
            <div className="lp-ecg-metrics">
              <div className="lp-ecg-metric"><span>BPM</span><strong className="lp-red-text">142</strong></div>
              <div className="lp-ecg-metric"><span>HRV</span><strong>28ms</strong></div>
              <div className="lp-ecg-metric"><span>RISK</span><strong className="lp-red-text">HIGH</strong></div>
              <div className="lp-ecg-metric"><span>TYPE</span><strong className="lp-orange-text">V-Fib</strong></div>
            </div>
          </div>
          <div className="lp-ai-response">
            <div className="lp-ai-icon">🤖</div>
            <div className="lp-ai-text">
              <strong>AI Alert</strong>
              <span>Ventricular arrhythmia pattern — 3 nearby cardiac centers notified. Diet & care plan activated.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          THE SOLUTION
      ══════════════════════════════════════════ */}
      <section className="lp-section" id="solution">
        <div className="lp-section-label">OUR SOLUTION</div>
        <h2 className="lp-section-title">AI-powered cardiac monitoring, anywhere, anytime.</h2>
        <p className="lp-section-sub">
          We combine affordable IoT hardware with production-grade deep learning to deliver
          hospital-quality cardiac diagnostics directly to patients — with zero cloud delay.
        </p>

        <div className="lp-solution-grid">
          <div className="lp-solution-card lp-sol-green">
            <div className="lp-sol-icon">📡</div>
            <h3>IoT Hardware Sensing</h3>
            <p>ESP32 microcontroller + AD8232 ECG sensor captures raw analog cardiac waveforms and streams them via Wi-Fi in real time.</p>
          </div>
          <div className="lp-solution-card lp-sol-blue">
            <div className="lp-sol-icon">⚡</div>
            <h3>FastAPI Processing</h3>
            <p>A lightweight Python backend receives 180-point ECG arrays every second, runs preprocessing, and routes them to the ML model instantly.</p>
          </div>
          <div className="lp-solution-card lp-sol-purple">
            <div className="lp-sol-icon">🧠</div>
            <h3>TensorFlow AI Engine</h3>
            <p>A deep learning model trained on the MIT-BIH Arrhythmia Dataset classifies each heartbeat into N, A, V, L, or R patterns in under 100ms.</p>
          </div>
          <div className="lp-solution-card lp-sol-orange">
            <div className="lp-sol-icon">💡</div>
            <h3>Prescriptive Intelligence</h3>
            <p>Based on the diagnosis, the system activates a personalized Action Hub — recommending nearby hospitals, diet plans, and therapeutic exercises.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          IoT ANALYTICS PIPELINE
      ══════════════════════════════════════════ */}
      <section className="lp-section lp-pipeline-section">
        <div className="lp-section-label">IoT DATA ANALYTICS</div>
        <h2 className="lp-section-title">Four layers of intelligence, working together.</h2>
        <p className="lp-section-sub">
          Our system applies all four types of IoT analytics — from raw signal display to life-saving decisions.
        </p>

        <div className="lp-analytics-grid">
          <div className="lp-analytics-card lp-a-green">
            <div className="lp-analytics-num">01</div>
            <div className="lp-analytics-icon">🖥️</div>
            <h3>Descriptive</h3>
            <em>What is happening?</em>
            <ul>
              <li>Displays real-time ECG waveforms</li>
              <li>Shows live heart activity</li>
              <li>Visualizes beat-by-beat patterns</li>
            </ul>
          </div>
          <div className="lp-analytics-card lp-a-blue">
            <div className="lp-analytics-num">02</div>
            <div className="lp-analytics-icon">🔍</div>
            <h3>Diagnostic</h3>
            <em>Why is it happening?</em>
            <ul>
              <li>Identifies irregular ECG patterns</li>
              <li>Detects arrhythmias & anomalies</li>
              <li>Explains cause of unusual signals</li>
            </ul>
          </div>
          <div className="lp-analytics-card lp-a-orange">
            <div className="lp-analytics-num">03</div>
            <div className="lp-analytics-icon">🧠</div>
            <h3>Predictive</h3>
            <em>What will happen?</em>
            <ul>
              <li>ML model classifies beat type</li>
              <li>Predicts risk: Low / Medium / High</li>
              <li>Issues early cardiac warnings</li>
            </ul>
          </div>
          <div className="lp-analytics-card lp-a-purple">
            <div className="lp-analytics-num">04</div>
            <div className="lp-analytics-icon">📋</div>
            <h3>Prescriptive</h3>
            <em>What should be done?</em>
            <ul>
              <li>Suggests actions based on risk</li>
              <li>Alerts nearest cardiac hospitals</li>
              <li>Activates diet & exercise plans</li>
            </ul>
          </div>
        </div>

        {/* Flow Summary Bar */}
        <div className="lp-flow-summary">
          <span className="lp-flow-item">Sensor Data</span>
          <span className="lp-flow-arrow">→</span>
          <span className="lp-flow-item lp-fc-green">Descriptive</span>
          <span className="lp-flow-arrow">→</span>
          <span className="lp-flow-item lp-fc-blue">Diagnostic</span>
          <span className="lp-flow-arrow">→</span>
          <span className="lp-flow-item lp-fc-orange">Predictive</span>
          <span className="lp-flow-arrow">→</span>
          <span className="lp-flow-item lp-fc-purple">Prescriptive</span>
          <span className="lp-flow-arrow">→</span>
          <span className="lp-flow-item">Action</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TECH STACK VISUAL
      ══════════════════════════════════════════ */}
      <section className="lp-section">
        <div className="lp-section-label">TECHNOLOGY STACK</div>
        <h2 className="lp-section-title">Hardware meets AI in one seamless pipeline.</h2>

        <div className="lp-tech-pipeline">
          <div className="lp-tech-node lp-tn-green">
            <div className="lp-tn-icon">📡</div>
            <strong>ESP32 + AD8232</strong>
            <span>IoT Sensor</span>
          </div>
          <div className="lp-tech-arrow"><svg viewBox="0 0 40 16" fill="none"><path d="M0 8 H32 M28 3 L36 8 L28 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
          <div className="lp-tech-node lp-tn-blue">
            <div className="lp-tn-icon">⚛</div>
            <strong>React Dashboard</strong>
            <span>UI + Visualization</span>
          </div>
          <div className="lp-tech-arrow"><svg viewBox="0 0 40 16" fill="none"><path d="M0 8 H32 M28 3 L36 8 L28 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
          <div className="lp-tech-node lp-tn-cyan">
            <div className="lp-tn-icon">⚡</div>
            <strong>FastAPI</strong>
            <span>/predict Gateway</span>
          </div>
          <div className="lp-tech-arrow"><svg viewBox="0 0 40 16" fill="none"><path d="M0 8 H32 M28 3 L36 8 L28 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
          <div className="lp-tech-node lp-tn-purple">
            <div className="lp-tn-icon">🧠</div>
            <strong>TensorFlow</strong>
            <span>MIT-BIH Trained</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="lp-cta-section">
        <div className="lp-cta-card">
          <h2>Start monitoring. Save a life.</h2>
          <p>The dashboard is live. Your AI cardiac engine is ready to analyze every heartbeat in real time.</p>
          <Link to="/dashboard" className="btn btn-primary lp-cta-btn">
            Initialize Dashboard →
          </Link>
        </div>
      </section>

      <footer className="footer">
        <p className="footer-text">© 2026 Cardio AI · ESP32 + TensorFlow + FastAPI + React · Built to save lives</p>
      </footer>

    </div>
  );
}

export default Home;
