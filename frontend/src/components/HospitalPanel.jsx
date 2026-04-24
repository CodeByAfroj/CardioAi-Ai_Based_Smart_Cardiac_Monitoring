function HospitalPanel() {
  const hospitals = [
    { name: "City Heart Hospital", type: "Cardiac Center", distance: "1.2 km" },
    { name: "Apollo Cardiac Clinic", type: "Multi-Specialty", distance: "2.4 km" },
    { name: "Emergency Cardiac Center", type: "Emergency Care", distance: "3.1 km" },
  ];

  return (
    <div className="panel-card">
      <div className="panel-header">
        <h2 className="panel-title">Nearby Hospitals</h2>
      </div>
      <div className="hospital-list">
        {hospitals.map((h, i) => (
          <div key={i} className="hospital-item">
            <div className="hospital-info">
              <div className="hospital-icon-wrap">🏥</div>
              <div>
                <div className="hospital-name">{h.name}</div>
                <div className="hospital-type">{h.type}</div>
              </div>
            </div>
            <span className="hospital-dist">{h.distance}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HospitalPanel;