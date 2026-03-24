import React, { useState, useEffect } from "react";
import "../Header.css";

function Header() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="hero-container">
      {/* Texte de fond flou */}
      <h1 className="blurred-text">CLEAR VISION</h1>

      {/* SVG qui définit la forme des lunettes */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="glasses-mask">
            {/* Forme des verres (à ajuster selon ton image) */}
            <circle cx={mousePos.x} cy={mousePos.y} r="150" />
          </clipPath>
        </defs>
      </svg>

      {/* Texte net (masqué par le SVG) */}
      <div className="lens-container">
        <h1 className="sharp-text">VIVISIONT</h1>
      </div>
    </div>
  );
}

export default Header;