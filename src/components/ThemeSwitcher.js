import React, {useContext} from "react";
import { ThemeContext } from "./ThemeProvider";

function ThemeSwitcher() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div style={{margin: "20px 0"}}>
            <p>Curret Theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
}

export default ThemeSwitcher;