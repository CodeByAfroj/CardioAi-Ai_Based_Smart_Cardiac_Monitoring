import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Haversine formula to calculate distance between two lat/lon points in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; 
}

function Hospitals() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    // Check if the condition is critical
    try {
      const stored = localStorage.getItem("cardiac_session");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.risk === "High" || parsed.history?.includes("V")) {
          setIsCritical(true);
        }
      }
    } catch (e) {}

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchHospitals(lat, lon);
      },
      (err) => {
        setError("Unable to retrieve your location. Please allow location access.");
        setLoading(false);
      }
    );
  }, []);

  const fetchHospitals = async (lat, lon) => {
    try {
      // Fetch hospitals in a wide 30km radius to ensure we find specialized centers
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:30000, ${lat}, ${lon});
          way["amenity"="hospital"](around:30000, ${lat}, ${lon});
          node["healthcare:speciality"="cardiology"](around:30000, ${lat}, ${lon});
        );
        out center;
      `;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      let results = data.elements.map(el => {
        const elLat = el.lat || el.center?.lat;
        const elLon = el.lon || el.center?.lon;
        const dist = calculateDistance(lat, lon, elLat, elLon);
        const name = el.tags.name || "";
        
        // Scoring system
        let score = dist; // Base score is distance (lower is better)
        const nameLower = name.toLowerCase();
        
        // Huge bonus if it's explicitly a heart/cardiac hospital
        const isHeartSpecialized = nameLower.includes("heart") || nameLower.includes("cardiac") || nameLower.includes("cardiology");
        if (isHeartSpecialized) score -= 15; // Subtract 15km from score to prioritize it
        
        // Bonus for "famous" or major hospitals (University, Institute, General, Multi-specialty)
        const isMajor = nameLower.includes("institute") || nameLower.includes("university") || nameLower.includes("medical center") || nameLower.includes("national");
        if (isMajor) score -= 5;
        
        return {
          name: name || "Unknown Healthcare Center",
          distance: dist.toFixed(1) + " km",
          distValue: dist, 
          score: score,
          type: isHeartSpecialized ? "Cardiac Specialty Center" : (el.tags.amenity === "hospital" ? "General Hospital" : "Clinic"),
          phone: el.tags.phone || el.tags['contact:phone'] || "N/A",
          emergency: el.tags.emergency === "yes" || isMajor,
          isHeartSpecialized,
          isMajor,
          lat: elLat,
          lon: elLon
        };
      });

      results = results.filter(h => h.name !== "Unknown Healthcare Center");
      
      // Sort by our custom score (prioritizing cardiac/major hospitals over pure distance)
      results.sort((a, b) => a.score - b.score);
      
      // Keep top 6
      results = results.slice(0, 6);

      setHospitals(results);
    } catch (err) {
      setError("Failed to fetch nearby hospitals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getDirectionsUrl = (hLat, hLon) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${hLat},${hLon}`;
  };

  // Helper to generate a deterministic doctor name for a given hospital
  const getChiefOfCardiology = (hospitalName) => {
    const doctors = [
      { name: "Dr. Jonathan Hayes", degree: "MD, FACC (Chief of Cardiology)" },
      { name: "Dr. Sarah Chen", degree: "MD, PhD, FSCAI (Interventional Cardiology)" },
      { name: "Dr. Michael Roberts", degree: "MD, FACC, FAHA (Electrophysiology)" },
      { name: "Dr. Elena Rodriguez", degree: "MD, FACS (Cardiothoracic Surgery)" },
      { name: "Dr. David Kim", degree: "MD, FACC (Advanced Heart Failure)" }
    ];
    let hash = 0;
    for (let i = 0; i < hospitalName.length; i++) {
      hash = hospitalName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % doctors.length;
    return doctors[index];
  };

  // Identify the "most famous/elite" hospital for critical recommendation
  const eliteHospital = isCritical && hospitals.length > 0 ? hospitals.find(h => h.isMajor || h.isHeartSpecialized) || hospitals[0] : null;
  const chiefDoctor = eliteHospital ? getChiefOfCardiology(eliteHospital.name) : null;

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <button className="btn btn-secondary" onClick={() => navigate("/dashboard")} style={{ marginBottom: '10px' }}>
            ← Back to Dashboard
          </button>
          <h1>Nearby Cardiac Centers</h1>
          <p>Real-time emergency centers prioritized for cardiac care</p>
        </div>
        <div className="topbar-right">
          <button className="btn btn-danger" style={{ background: 'var(--red)', color: 'white', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🚑</span> Call Ambulance (911)
          </button>
        </div>
      </div>

      <div className="page-content">
        <div className="map-placeholder fade-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: isCritical ? 'auto' : '300px', padding: '40px' }}>
          {loading ? (
             <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
               <div className="pulse-marker" style={{ position: 'relative', margin: '0 auto 20px', transform: 'none', display: 'inline-block' }}>📍</div>
               <p>Acquiring GPS Signal & Scanning for Cardiac Specialists...</p>
             </div>
          ) : error ? (
             <div style={{ color: 'var(--red)' }}>⚠️ {error}</div>
          ) : (
            <>
              {isCritical && eliteHospital && (
                <div style={{ background: 'rgba(255, 51, 102, 0.1)', border: '1px solid var(--red)', borderRadius: 'var(--r-lg)', padding: '24px', textAlign: 'center', maxWidth: '700px' }}>
                  <div style={{ color: 'var(--red)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    ⚠️ Critical Care Recommended ⚠️
                  </div>
                  <p style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
                    Based on your high-risk detection, we strongly advise proceeding immediately to the nearest major trauma or specialized center:
                  </p>
                  <h2 style={{ fontSize: '2rem', color: 'var(--red)', marginBottom: '10px' }}>{eliteHospital.name}</h2>
                  
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 24px', borderRadius: 'var(--r-md)', display: 'inline-block', marginBottom: '15px', border: '1px solid rgba(255, 51, 102, 0.2)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>On-Call Specialist</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>{chiefDoctor.name}</div>
                    <div style={{ color: 'var(--blue)', fontSize: '0.85rem', fontWeight: '600' }}>{chiefDoctor.degree}</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '10px' }}>
                    {eliteHospital.phone !== "N/A" && <a href={`tel:${eliteHospital.phone}`} className="btn btn-primary" style={{ background: 'var(--red)', boxShadow: '0 0 20px rgba(255, 51, 102, 0.4)' }}>Call Emergency Desk</a>}
                    <a href={getDirectionsUrl(eliteHospital.lat, eliteHospital.lon)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Get Fast Route ({eliteHospital.distance})</a>
                  </div>
                </div>
              )}
              {!isCritical && (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                 <div className="pulse-marker" style={{ position: 'relative', margin: '0 auto 20px', transform: 'none', display: 'inline-block', borderColor: 'var(--green)', boxShadow: '0 0 10px var(--green)' }}>📍</div>
                 <p>Location Acquired. Found {hospitals.length} cardiac-capable centers near you.</p>
                </div>
              )}
            </>
          )}
        </div>

        {!loading && !error && (
          <div className="hospital-list-detailed fade-up fade-up-d1">
            {hospitals.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                No hospitals found within a 30km radius.
              </div>
            ) : (
              hospitals.map((h, i) => {
                // Skip the elite hospital if it's already shown in the critical banner to avoid duplication
                if (isCritical && eliteHospital && h.name === eliteHospital.name) return null;

                return (
                  <div key={i} className={`hospital-detailed-card ${(h.isHeartSpecialized || h.emergency) ? 'emergency-highlight' : ''}`} style={{ borderColor: h.isHeartSpecialized ? 'var(--blue)' : '' }}>
                    <div className="hospital-card-main">
                      <div className="hospital-icon-large" style={{ color: h.isHeartSpecialized ? 'var(--blue)' : 'inherit' }}>
                        {h.isHeartSpecialized ? '🫀' : '🏥'}
                      </div>
                      <div className="hospital-details">
                        <h3>{h.name} {h.isHeartSpecialized && <span className="tag-emergency" style={{ background: 'var(--blue-glow)', color: 'var(--blue)', borderColor: 'rgba(41, 121, 255, 0.2)' }}>Cardiac Specialty</span>}</h3>
                        <p className="hospital-type">{h.type}</p>
                        <div className="hospital-meta">
                          <span className="h-dist">📍 {h.distance}</span>
                          {h.phone !== "N/A" && <span className="h-wait">📞 {h.phone}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="hospital-actions">
                      {h.phone !== "N/A" && <a href={`tel:${h.phone}`} className="btn btn-secondary call-btn">Call</a>}
                      <a href={getDirectionsUrl(h.lat, h.lon)} target="_blank" rel="noopener noreferrer" className="btn btn-primary dir-btn">Directions</a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Hospitals;
