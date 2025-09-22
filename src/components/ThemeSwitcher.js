import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

function ThemeSwitcher() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        // <div style={{margin: "20px 0"}}>
        //     <p>Curret Theme: {theme}</p>
        //     <button onClick={toggleTheme}>Toggle Theme</button>
        // </div>

        <button
            onClick={toggleTheme}
            style={{
                margin: "10px",
                padding: "10px 15px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                background: theme === "light" ? "#222" : "#eee",
                color: theme === "light" ? "#fff" : "#000",
            }}
        >
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
    );
}

export default ThemeSwitcher;