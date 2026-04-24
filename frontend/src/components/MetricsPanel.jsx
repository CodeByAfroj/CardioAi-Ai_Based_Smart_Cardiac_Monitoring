function MetricsPanel({ icon, label, value, color, riskLevel }) {
  const getBarWidth = () => {
    if (!riskLevel) return "0%";
    if (riskLevel === "Low") return "25%";
    if (riskLevel === "Medium") return "55%";
    return "85%";
  };

  const getBarColor = () => {
    if (!riskLevel) return "";
    if (riskLevel === "Low") return "green";
    if (riskLevel === "Medium") return "orange";
    return "red";
  };

  return (
    <div className="metric-card">
      <div className={`metric-icon ${color}`}>{icon}</div>
      <div className="metric-body">
        <div className="metric-label">{label}</div>
        <div className="metric-value">{value}</div>
        {riskLevel && (
          <div className="metric-bar">
            <div className={`metric-bar-fill ${getBarColor()}`} style={{ width: getBarWidth() }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MetricsPanel;