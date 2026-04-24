import { useNavigate } from "react-router-dom";

function Yoga() {
  const navigate = useNavigate();

  const poses = [
    { name: "Anulom Vilom (Alternate Nostril Breathing)", desc: "Reduces stress, lowers blood pressure, and improves overall cardiovascular function.", img: "🧘‍♂️", type: "Pranayama" },
    { name: "Shavasana (Corpse Pose)", desc: "Deep relaxation pose that significantly reduces heart rate and lowers blood pressure.", img: "🛌", type: "Restorative" },
    { name: "Tadasana (Mountain Pose)", desc: "Improves posture and breathing, creating space in the chest for better lung capacity.", img: "🧍", type: "Standing" },
    { name: "Bhujangasana (Cobra Pose)", desc: "Expands the chest and reduces stress, though it should be done gently.", img: "🐍", type: "Mild Stretch" },
    { name: "Sukhasana (Easy Pose)", desc: "A calming seated pose perfect for meditation and lowering heart rate.", img: "🧘‍♀️", type: "Seated" }
  ];

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <button className="btn btn-secondary" onClick={() => navigate("/dashboard")} style={{ marginBottom: '10px' }}>
            ← Back to Dashboard
          </button>
          <h1>Cardiac Yoga & Exercise</h1>
          <p>Gentle movements to strengthen the heart and reduce stress</p>
        </div>
      </div>

      <div className="page-content">
        <div className="yoga-hero fade-up">
          <div className="yoga-hero-icon">🧘‍♂️</div>
          <h2>Healing through Movement</h2>
          <p>
            Yoga is an excellent way to reduce physical and mental stress, lower blood pressure, and improve heart health. 
            <strong> Always consult your physician before starting any new exercise regimen.</strong>
          </p>
        </div>

        <div className="yoga-grid fade-up fade-up-d1">
          {poses.map((pose, idx) => (
            <div key={idx} className="yoga-card">
              <div className="yoga-icon">{pose.img}</div>
              <div className="yoga-details">
                <span className="yoga-type">{pose.type}</span>
                <h3>{pose.name}</h3>
                <p>{pose.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="yoga-warning fade-up fade-up-d2">
          <h3>⚠️ Precautions for Cardiac Patients</h3>
          <ul>
            <li>Avoid holding your breath (Valsalva maneuver) during poses.</li>
            <li>Skip poses where the head is significantly lower than the heart (like headstands).</li>
            <li>Stop immediately if you feel dizzy, experience chest pain, or shortness of breath.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Yoga;
