import { Routes, Route, NavLink } 
from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Weather from "./pages/Weather";
import "./App.css";
import Game from "./pages/Game";

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <NavLink to="/" className="nav-link" end>
          홈
        </NavLink>
        <NavLink to="/game" className="nav-link">
          게임
        </NavLink>
        <NavLink to="/weather" className="nav-link">
          날씨
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;