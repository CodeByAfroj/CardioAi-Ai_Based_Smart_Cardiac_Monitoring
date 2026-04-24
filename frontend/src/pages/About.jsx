import PipelineVisualization from "../components/PipelineVisualization";

function About() {
  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <h1>About Cardiac AI</h1>
          <p>Learn how our intelligent diagnostic engine works</p>
        </div>
      </div>

      <div className="page-content">
        <div className="about-grid">
          
          {/* Main Hero Section */}
          <div className="about-hero-card fade-up">
            <div className="about-hero-content">
              <h2>Precision Intelligence</h2>
              <p>A specialized instrument for real-time cardiac analysis, designed to augment clinical diagnosis and empower preventive healthcare via continuous monitoring.</p>
            </div>
          </div>

          <PipelineVisualization />

          <div className="about-body-grid">
            {/* The Problem */}
            <div className="about-card fade-up fade-up-d1">
              <div className="card-icon" style={{ color: 'var(--red)' }}>⚠</div>
              <h3>The Challenge</h3>
              <p>Cardiovascular diseases remain the leading cause of death globally. Early detection of arrhythmias is critical, yet traditional Holter monitoring requires specialized equipment and significant time for interpretation.</p>
            </div>

            {/* How It Works */}
            <div className="about-card fade-up fade-up-d2">
              <div className="card-icon" style={{ color: 'var(--green)' }}>⚙</div>
              <h3>How It Works</h3>
              <p>Our platform processes real-time 180-point ECG arrays through a TensorFlow deep learning pipeline. Each beat is classified into clinical categories instantaneously mapping directly to a 3D anatomical visualization.</p>
            </div>

            {/* Risk Assessment */}
            <div className="about-card fade-up fade-up-d3">
              <div className="card-icon" style={{ color: 'var(--orange)' }}>📈</div>
              <h3>Risk Assessment</h3>
              <p>By evaluating the frequency and density of ectopic beats over a rolling 60-beat window, the system computes an active risk score — effectively acting as an automated digital cardiologist reviewing rhythm strips.</p>
            </div>
          </div>

          {/* Arrhythmia Dictionary */}
          <div className="about-card wide-card fade-up fade-up-d4">
            <h3>Diagnostic Classifications</h3>
            <div className="disease-grid">
              <div className="disease-item">
                <span className="d-badge" style={{ background: 'var(--green)', color: '#000' }}>N</span>
                <div>
                  <strong>Normal Sinus Rhythm</strong>
                  <span>Healthy standard baseline beats.</span>
                </div>
              </div>
              <div className="disease-item">
                <span className="d-badge" style={{ background: 'var(--orange)', color: '#fff' }}>A</span>
                <div>
                  <strong>Atrial Premature</strong>
                  <span>Ectopic impulses originating from upper chambers.</span>
                </div>
              </div>
              <div className="disease-item">
                <span className="d-badge" style={{ background: 'var(--red)', color: '#fff' }}>V</span>
                <div>
                  <strong>Ventricular Premature</strong>
                  <span>Dangerous ectopic beats from lower chambers.</span>
                </div>
              </div>
              <div className="disease-item">
                <span className="d-badge" style={{ background: 'var(--blue)', color: '#fff' }}>L</span>
                <div>
                  <strong>Left Bundle Branch Block</strong>
                  <span>Conduction delay in the left ventricle path.</span>
                </div>
              </div>
              <div className="disease-item">
                <span className="d-badge" style={{ background: 'var(--purple)', color: '#fff' }}>R</span>
                <div>
                  <strong>Right Bundle Branch Block</strong>
                  <span>Conduction delay in the right ventricle path.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="about-card wide-card fade-up fade-up-d4">
            <h3>Technology Stack</h3>
            <div className="tech-grid">
              <div className="tech-item blur-box">
                <div className="tech-name">D3.js</div>
                <div className="tech-desc">Real-time Visualization</div>
              </div>
              <div className="tech-item blur-box">
                <div className="tech-name">TensorFlow</div>
                <div className="tech-desc">Deep Learning Model</div>
              </div>
              <div className="tech-item blur-box">
                <div className="tech-name">FastAPI</div>
                <div className="tech-desc">Python Signal Processing</div>
              </div>
              <div className="tech-item blur-box">
                <div className="tech-name">React</div>
                <div className="tech-desc">Frontend Framework</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default About;
