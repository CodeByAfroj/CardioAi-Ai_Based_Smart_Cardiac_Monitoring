function PipelineVisualization() {
  return (
    <div className="pipeline-wrapper fade-up">
      <div className="pipeline-header">
        <h3>End-to-End IoT & AI Diagnostic Pipeline</h3>
        <p>Combining AD8232 real-time telemetry with deep learning hardware inference</p>
      </div>

      <div className="pipeline-canvas">
        {/* Isometric Platform (Now 1000x800) */}
        <div className="isometric-plane">

          <svg className="data-paths" viewBox="0 0 1000 800" preserveAspectRatio="none">
            {/* Precision 90-Degree Outbound Path (IoT -> React -> API -> ML) */}
            <path d="M 165 645 L 365 645 L 365 445 L 615 445 L 615 245 L 865 245 L 865 145" fill="none" stroke="rgba(0, 230, 118, 0.2)" strokeWidth="4" />
            <path className="data-packet-out" d="M 165 645 L 365 645 L 365 445 L 615 445 L 615 245 L 865 245 L 865 145" fill="none" stroke="var(--green)" strokeWidth="4" />

            {/* Precision 90-Degree Inbound Path (ML -> API -> Frontend ONLY) */}
            <path d="M 865 145 L 820 145 L 820 280 L 570 280 L 570 480 L 365 480 L 365 460" fill="none" stroke="rgba(255, 171, 64, 0.2)" strokeWidth="3" />
            <path className="data-packet-in" d="M 865 145 L 820 145 L 820 280 L 570 280 L 570 480 L 365 480 L 365 460" fill="none" stroke="var(--orange)" strokeWidth="3" />
            
            {/* ML Core Processing Path */}
            <path d="M 910 170 L 910 240 L 865 240" fill="none" stroke="rgba(179, 136, 255, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
          </svg>

          {/* NODE 0: ESP32 + AD8232 IoT Sensor */}
          <div className="iso-node node-iot" style={{ top: '600px', left: '50px' }}>
            <div className="node-icon" style={{ borderColor: 'var(--green)' }}>📡</div>
            <div className="node-details">
              <strong>ESP32 Microcontroller</strong>
              <span>AD8232 ECG Analog Sensor</span>
              <div className="node-activity green-pulse">Streaming Analog Vitals</div>
            </div>
          </div>

          {/* NODE 1: React UI Dashboard */}
          <div className="iso-node node-frontend" style={{ top: '400px', left: '250px' }}>
            <div className="node-icon" style={{ borderColor: 'var(--blue)' }}>⚛</div>
            <div className="node-details">
              <strong>React Dashboard</strong>
              <span>IoT Telemetry UI</span>
              <div className="node-activity blue-pulse">Aggregating Signal</div>
            </div>
          </div>

          {/* NODE 2: FastAPI Gateway */}
          <div className="iso-node node-backend" style={{ top: '200px', left: '500px' }}>
            <div className="node-icon" style={{ borderColor: 'var(--cyan)' }}>⚡</div>
            <div className="node-details">
              <strong>FastAPI Gateway</strong>
              <span>/predict Engine</span>
              <div className="node-activity cyan-pulse">Processing Array</div>
            </div>
          </div>

          {/* NODE 3: TensorFlow Core Engine */}
          <div className="iso-node node-ml core-node" style={{ top: '100px', left: '750px' }}>
            <div className="core-brain">
              <div className="core-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
              </div>
              <div className="node-icon" style={{ borderColor: 'var(--purple)', background: 'rgba(179,136,255,0.1)' }}>🧠</div>
            </div>
            <div className="node-details ml-details">
              <strong>TensorFlow Model</strong>
              <div className="badge-mit">MIT-BIH Arrhythmia Base</div>
              <div className="node-activity purple-pulse" style={{ marginTop: '6px' }}>Classification Active</div>
            </div>
          </div>

          {/* Floating Data Labels */}
          <div className="floating-data" style={{ top: '650px', left: '200px' }}>
            <code>Array [180]</code>
          </div>
          <div className="floating-data" style={{ top: '450px', left: '400px' }}>
            <code>JSON &#123; signal &#125;</code>
          </div>
          <div className="floating-data orange-label" style={{ top: '290px', left: '600px' }}>
            <code>&#123; risk: 'Medium' &#125;</code>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PipelineVisualization;
