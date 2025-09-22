import React, {createContext, useState, useEffect} from "react";

// Create a context
export const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    // Save and liad theme from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if(saved){
            setTheme(saved);
        }
    }, []);

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
            <div
            style={{
                background: theme === "light" ? "#fff" : "#222",
                color: theme === "light" ? "#000" : "#fff",
                minHeight: "100vh"
            }}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;