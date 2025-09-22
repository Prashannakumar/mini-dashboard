import React, {createContext, useState, useEffect} from "react";

// Create a context
export const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    // Save and load theme from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if(saved){
            setTheme(saved);
        }
    }, []);

    // Save to localStorage whenever theme changes
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Toggle function
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }

    // Provide theme + toggle to all children
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {/* <div
            style={{
                background: theme === "light" ? "#fff" : "#222",
                color: theme === "light" ? "#000" : "#fff",
                minHeight: "100vh"
            }}> */}
            <div className={theme === "light" ? "light-theme" : "dark-theme"}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;