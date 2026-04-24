import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Diet() {
  const navigate = useNavigate();
  const [primaryFinding, setPrimaryFinding] = useState("Normal Rhythm");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cardiac_session");
      if (stored) {
        const parsed = JSON.parse(stored);
        const cnts = { N: 0, A: 0, V: 0, L: 0, R: 0 };
        (parsed.history || []).forEach((h) => {
          if (cnts[h] !== undefined) cnts[h]++;
        });

        if (cnts.V > 0) setPrimaryFinding("Ventricular Premature Beats (VPB)");
        else if (cnts.A > Math.max(cnts.L, cnts.R)) setPrimaryFinding("Atrial Premature Beats (APB)");
        else if (cnts.L > 0) setPrimaryFinding("Left Bundle Branch Block (LBBB)");
        else if (cnts.R > 0) setPrimaryFinding("Right Bundle Branch Block (RBBB)");
        else setPrimaryFinding("Normal Sinus Rhythm");
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getDietData = () => {
    if (primaryFinding.includes("Ventricular")) {
      return {
        foodsToEat: [
          { name: "Potassium-Rich Foods", desc: "Bananas, sweet potatoes, and avocados help regulate heart electrical signals.", icon: "🍌" },
          { name: "Magnesium Sources", desc: "Spinach, pumpkin seeds, and almonds stabilize ventricular rhythms.", icon: "🥬" },
          { name: "Fatty Fish", desc: "Salmon and mackerel provide Omega-3s that reduce arrhythmias.", icon: "🐟" }
        ],
        foodsToAvoid: [
          { name: "Caffeine", desc: "Coffee and energy drinks are strong triggers for ventricular ectopic beats.", icon: "☕" },
          { name: "Alcohol", desc: "Can directly irritate the heart muscle and worsen arrhythmias.", icon: "🍷" },
          { name: "Excess Sugar", desc: "Causes rapid insulin spikes that can trigger ectopic beats.", icon: "🍩" }
        ],
        subtitle: "Electrolyte-Balancing Diet Plan (Ventricular Focus)"
      };
    } else if (primaryFinding.includes("Atrial")) {
      return {
        foodsToEat: [
          { name: "Lean Proteins", desc: "Chicken, turkey, and plant-based proteins keep energy levels stable.", icon: "🍗" },
          { name: "Whole Grains", desc: "Oats and quinoa prevent blood sugar drops that trigger atrial beats.", icon: "🌾" },
          { name: "Hydrating Foods", desc: "Cucumbers and watermelon maintain essential fluid balance.", icon: "🍉" }
        ],
        foodsToAvoid: [
          { name: "High-Sodium Meals", desc: "Salty foods increase blood pressure, heavily straining the atria.", icon: "🧂" },
          { name: "Heavy, Large Meals", desc: "Can stimulate the vagus nerve and trigger atrial premature beats.", icon: "🍔" },
          { name: "Ice Cold Drinks", desc: "Sudden cold can sometimes trigger atrial arrhythmias via the vagus nerve.", icon: "🧊" }
        ],
        subtitle: "Vagus Nerve & Hydration Focused Diet (Atrial Focus)"
      };
    } else if (primaryFinding.includes("Bundle Branch")) {
      return {
        foodsToEat: [
          { name: "Antioxidant-Rich Berries", desc: "Blueberries and strawberries reduce oxidative stress on the heart.", icon: "🍓" },
          { name: "Healthy Fats", desc: "Olive oil and walnuts improve overall cardiovascular health.", icon: "🫒" },
          { name: "Cruciferous Veggies", desc: "Broccoli and Brussels sprouts protect blood vessels.", icon: "🥦" }
        ],
        foodsToAvoid: [
          { name: "Trans Fats", desc: "Margarine and fried foods worsen underlying heart conditions.", icon: "🍟" },
          { name: "Processed Meats", desc: "Hot dogs and bacon contain preservatives that harm vessels.", icon: "🥓" },
          { name: "Refined Carbs", desc: "White bread and pastries contribute to inflammation.", icon: "🥖" }
        ],
        subtitle: "Cardiovascular Protection Diet (Bundle Branch Focus)"
      };
    }
    
    // Default / Normal
    return {
      foodsToEat: [
        { name: "Leafy Green Vegetables", desc: "Spinach, kale, and collard greens are rich in vitamins, minerals, and antioxidants.", icon: "🥬" },
        { name: "Whole Grains", desc: "Oats, brown rice, and quinoa are high in fiber, reducing 'bad' LDL cholesterol.", icon: "🌾" },
        { name: "Fatty Fish & Fish Oil", desc: "Salmon, mackerel, and sardines are packed with omega-3 fatty acids.", icon: "🐟" }
      ],
      foodsToAvoid: [
        { name: "Processed Meats", desc: "Hot dogs, sausages, and bacon are high in sodium and saturated fats.", icon: "🥓" },
        { name: "Sugar-Sweetened Beverages", desc: "Soda and energy drinks lead to weight gain and inflammation.", icon: "🥤" },
        { name: "Excessive Salt", desc: "High sodium intake increases blood pressure.", icon: "🧂" }
      ],
      subtitle: "General Heart-Healthy Mediterranean Plan"
    };
  };

  const { foodsToEat, foodsToAvoid, subtitle } = getDietData();

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <button className="btn btn-secondary" onClick={() => navigate("/dashboard")} style={{ marginBottom: '10px' }}>
            ← Back to Dashboard
          </button>
          <h1>Cardiac Diet Plan</h1>
          <p>{subtitle}</p>
        </div>
        <div className="topbar-right">
          <div className="risk-badge" style={{ padding: '8px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: '20px', fontSize: '0.8rem' }}>
            Tailored for: <strong style={{ color: 'var(--text-primary)' }}>{primaryFinding}</strong>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="diet-hero fade-up">
          <div className="diet-hero-text">
            <h2>Food is Medicine</h2>
            <p>Your diet has been specifically curated by our AI based on your most recent <strong>{primaryFinding}</strong> detection. Adhering to these specific nutritional guidelines can significantly reduce the frequency of abnormal rhythms and improve heart function.</p>
          </div>
        </div>

        <div className="diet-sections">
          <div className="diet-column fade-up fade-up-d1">
            <h3 className="diet-col-title text-green">Foods to Prioritize</h3>
            <div className="diet-list">
              {foodsToEat.map((food, i) => (
                <div key={i} className="diet-item positive">
                  <div className="diet-icon">{food.icon}</div>
                  <div className="diet-info">
                    <h4>{food.name}</h4>
                    <p>{food.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="diet-column fade-up fade-up-d2">
            <h3 className="diet-col-title text-red">Foods to Limit or Avoid</h3>
            <div className="diet-list">
              {foodsToAvoid.map((food, i) => (
                <div key={i} className="diet-item negative">
                  <div className="diet-icon">{food.icon}</div>
                  <div className="diet-info">
                    <h4>{food.name}</h4>
                    <p>{food.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Diet;
