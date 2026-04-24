import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Recommendations from "./pages/Recommendations";
import Hospitals from "./pages/Hospitals";
import Diet from "./pages/Diet";
import Yoga from "./pages/Yoga";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="app-layout">
      {!isHomePage && <Sidebar />}
      <main className={`main-area ${isHomePage ? 'home-main' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/yoga" element={<Yoga />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;