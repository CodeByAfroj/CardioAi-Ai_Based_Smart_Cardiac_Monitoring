function RecommendationPanel({ risk }) {
  let tips = [];
  let dotClass = "low";
  let badgeLabel = "Low Risk";

  if (risk === "Low") {
    dotClass = "low";
    badgeLabel = "Low Risk";
    tips = [
      "Maintain a regular exercise routine",
      "Stay well-hydrated throughout the day",
      "Avoid excessive caffeine consumption"
    ];
  } else if (risk === "Medium") {
    dotClass = "medium";
    badgeLabel = "Medium Risk";
    tips = [
      "Prioritize stress reduction and rest",
      "Monitor heart rhythm more frequently",
      "Schedule a consultation with a cardiologist"
    ];
  } else if (risk === "High") {
    dotClass = "high";
    badgeLabel = "High Risk";
    tips = [
      "Abnormal rhythm pattern detected",
      "Seek emergency medical assistance",
      "Proceed to the nearest hospital immediately"
    ];
  }

  return (
    <div className="panel-card">
      <div className="panel-header">
        <h2 className="panel-title">Recommendations</h2>
        <span className={`panel-badge ${dotClass}`}>{badgeLabel}</span>
      </div>
      <div className="rec-list">
        {tips.map((tip, i) => (
          <div key={i} className="rec-item">
            <span className={`rec-dot ${dotClass}`}></span>
            <span className="rec-text">{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationPanel;