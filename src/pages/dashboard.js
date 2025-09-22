import React from "react";
import { Link } from "react-router-dom";

import ThemeSwitcher from "../components/ThemeSwitcher";

export function Dashboard() {
  const cards = [
    { title: "Counter", path: "/counter" },
    { title: "Todo List", path: "/todos" },
    { title: "Clock", path: "/clock" },
    { title: "Box Measure", path: "/measure" },
    { title: "Deferred Search", path: "/search" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Hooks Dashboard</h1>
      <ThemeSwitcher />

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {cards.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            style={{
              textDecoration: "none",
              color: "inherit",
              width: "200px",
            }}
          >
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                transition: "0.3s",
              }}
            >
              <h3>{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
